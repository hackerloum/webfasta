import { supabase } from "@/integrations/supabase/client";

export interface PaymentRequest {
  buyer_email: string;
  buyer_name: string;
  buyer_phone: string;
  amount: number;
  plan_id: string;
  user_id?: string;
}

export interface PaymentResponse {
  status: "success" | "error";
  message: string;
  transaction_id?: string;
  order_id?: string;
  details?: any;
}

/**
 * Initiates a payment through ZenoPay API
 */
export async function initiatePayment(
  paymentData: PaymentRequest
): Promise<PaymentResponse> {
  try {
    // Generate unique order ID (UUID)
    const orderId = crypto.randomUUID();

    // Use Supabase functions.invoke which handles auth and CORS automatically
    const { data, error } = await supabase.functions.invoke("zenopay-payment", {
      body: {
        order_id: orderId,
        buyer_email: paymentData.buyer_email,
        buyer_name: paymentData.buyer_name,
        buyer_phone: paymentData.buyer_phone,
        amount: paymentData.amount,
        plan_id: paymentData.plan_id,
        user_id: paymentData.user_id,
      },
    });

    if (error) {
      console.error("Payment function error:", error);
      return {
        status: "error",
        message: error.message || "Payment initiation failed",
      };
    }

    if (data?.status === "error") {
      return {
        status: "error",
        message: data.message || "Payment initiation failed",
        details: data.details,
      };
    }

    return {
      status: "success",
      message: data?.message || "Payment initiated successfully",
      transaction_id: data?.transaction_id,
      order_id: data?.order_id || orderId,
    };
  } catch (error) {
    console.error("Payment error:", error);
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Validates Tanzanian phone number format
 */
export function validateTanzanianPhone(phone: string): boolean {
  const phoneRegex = /^07\d{8}$/;
  return phoneRegex.test(phone);
}

/**
 * Formats phone number to Tanzanian format
 */
export function formatTanzanianPhone(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, "");
  
  // If starts with 255, remove it
  if (digits.startsWith("255")) {
    return "0" + digits.slice(3);
  }
  
  // If starts with 0, return as is
  if (digits.startsWith("0")) {
    return digits;
  }
  
  // Otherwise, add 0 prefix
  return "0" + digits;
}

