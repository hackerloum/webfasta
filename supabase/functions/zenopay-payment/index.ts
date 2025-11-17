import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "86400",
};

interface PaymentRequest {
  order_id: string;
  buyer_email: string;
  buyer_name: string;
  buyer_phone: string;
  amount: number;
  plan_id?: string;
  user_id?: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { 
      status: 204,
      headers: corsHeaders 
    });
  }

  try {
    // Parse request body
    let paymentData: PaymentRequest;
    try {
      paymentData = await req.json();
    } catch (parseError) {
      return new Response(
        JSON.stringify({ 
          status: "error",
          message: "Invalid JSON in request body" 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Validate required fields
    if (!paymentData.order_id || !paymentData.buyer_email || !paymentData.buyer_name || 
        !paymentData.buyer_phone || !paymentData.amount) {
      return new Response(
        JSON.stringify({ 
          status: "error",
          message: "Missing required fields: order_id, buyer_email, buyer_name, buyer_phone, and amount are required" 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Validate phone number format (Tanzanian mobile: 07XXXXXXXX)
    const phoneRegex = /^07\d{8}$/;
    if (!phoneRegex.test(paymentData.buyer_phone)) {
      return new Response(
        JSON.stringify({ 
          status: "error",
          message: "Invalid phone number format. Please use Tanzanian mobile format: 07XXXXXXXX" 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Validate amount (must be positive)
    if (paymentData.amount <= 0) {
      return new Response(
        JSON.stringify({ 
          status: "error",
          message: "Amount must be greater than 0" 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Get ZenoPay API key from environment
    const ZENOPAY_API_KEY = Deno.env.get("ZENOPAY_API_KEY") || 
      "000GTt5huRVorBPtnjmQ2bqo-UTVCElL9HCZgdit8IiFyJs95p-ZecCspeeqY4QdDymNby1BkmubByIVL9WTew";

    if (!ZENOPAY_API_KEY) {
      return new Response(
        JSON.stringify({ 
          status: "error",
          message: "ZenoPay API key is not configured" 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Prepare ZenoPay API request
    const zenopayPayload = {
      order_id: paymentData.order_id,
      buyer_email: paymentData.buyer_email,
      buyer_name: paymentData.buyer_name,
      buyer_phone: paymentData.buyer_phone,
      amount: paymentData.amount,
    };

    console.log("Calling ZenoPay API with payload:", zenopayPayload);

    // Call ZenoPay API
    const zenopayResponse = await fetch("https://zenoapi.com/api/payments/mobile_money_tanzania", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ZENOPAY_API_KEY,
      },
      body: JSON.stringify(zenopayPayload),
    });

    const zenopayData = await zenopayResponse.json();

    if (!zenopayResponse.ok || zenopayData.status === "error") {
      console.error("ZenoPay API error:", zenopayData);
      return new Response(
        JSON.stringify({ 
          status: "error",
          message: zenopayData.message || "Payment initiation failed",
          details: zenopayData 
        }),
        { 
          status: zenopayResponse.status || 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Create Supabase client for database operations
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    
    let supabaseClient = null;
    if (supabaseUrl && supabaseServiceKey) {
      supabaseClient = createClient(supabaseUrl, supabaseServiceKey);
    }

    // Store payment record in database
    if (supabaseClient) {
      try {
        const paymentRecord = {
          user_id: paymentData.user_id || null,
          order_id: paymentData.order_id,
          transaction_id: zenopayData.transaction_id || null,
          plan_id: paymentData.plan_id || null,
          amount: paymentData.amount,
          currency: "TZS",
          buyer_email: paymentData.buyer_email,
          buyer_name: paymentData.buyer_name,
          buyer_phone: paymentData.buyer_phone,
          status: zenopayData.status === "success" ? "pending" : "failed",
          zenopay_response: zenopayData,
          error_message: zenopayData.status === "error" ? zenopayData.message : null,
        };

        const { error: paymentError } = await supabaseClient
          .from("payments")
          .insert(paymentRecord);

        if (paymentError) {
          console.error("Error storing payment record:", paymentError);
        }
      } catch (dbError) {
        console.error("Error storing payment in database:", dbError);
        // Don't fail the payment response, just log the error
      }
    }

    // If payment was successful and user_id/plan_id provided, update user profile
    if (zenopayData.status === "success" && paymentData.user_id && paymentData.plan_id && supabaseClient) {
      try {
        // Update user profile with new subscription plan
        const { error: updateError } = await supabaseClient
          .from("user_profiles")
          .update({ subscription_plan: paymentData.plan_id })
          .eq("id", paymentData.user_id);

        if (updateError) {
          console.error("Error updating user profile:", updateError);
          // Don't fail the payment response, just log the error
        }
      } catch (profileError) {
        console.error("Error updating user profile:", profileError);
        // Don't fail the payment response, just log the error
      }
    }

    // Return success response
    return new Response(
      JSON.stringify({
        status: "success",
        message: zenopayData.message || "Payment initiated successfully",
        transaction_id: zenopayData.transaction_id,
        order_id: paymentData.order_id,
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Error in zenopay-payment function:", error);
    return new Response(
      JSON.stringify({ 
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error occurred" 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

