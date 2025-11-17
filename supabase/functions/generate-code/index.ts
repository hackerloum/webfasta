// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// CORS headers - simplified and robust configuration
const getCorsHeaders = (origin: string | null) => {
  const allowOrigin = origin || "*";
  
  return {
    "Access-Control-Allow-Origin": allowOrigin,
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
  };
};

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    console.log("OPTIONS preflight request received");
    return new Response(null, { 
      status: 200,
      headers: corsHeaders 
    });
  }

  console.log(`${req.method} request received`);

  try {
    // Parse request body
    let requestBody: any;
    try {
      // Supabase functions.invoke() sends JSON directly
      requestBody = await req.json();
      console.log("Request body parsed successfully");
      console.log("Request body keys:", Object.keys(requestBody || {}));
      console.log("Request body type:", typeof requestBody);
    } catch (parseError) {
      console.error("Error parsing request body:", parseError);
      
      return new Response(
        JSON.stringify({ 
          error: "Invalid JSON in request body",
          details: parseError instanceof Error ? parseError.message : "Unknown error"
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Log the full request body structure for debugging
    console.log("Full request body:", JSON.stringify(requestBody, null, 2));

    // Extract request data with safe defaults
    // Handle both direct body and nested body (in case Supabase wraps it)
    const prompt = requestBody?.prompt || requestBody?.body?.prompt;
    const conversationHistory = Array.isArray(requestBody?.conversationHistory) 
      ? requestBody.conversationHistory 
      : Array.isArray(requestBody?.body?.conversationHistory)
      ? requestBody.body.conversationHistory
      : [];
    const userContext = requestBody?.userContext || requestBody?.body?.userContext || null;
    const rawModel = requestBody?.model || requestBody?.body?.model || "claude";
    // Normalize model value (handle case sensitivity and ensure valid values)
    const model = (typeof rawModel === "string" && rawModel.toLowerCase() === "gemini") ? "gemini" : "claude";
    
    // Log model selection for debugging
    console.log("=== MODEL SELECTION ===");
    console.log("Raw model value:", rawModel);
    console.log("Selected model:", model);
    console.log("Request body model:", requestBody?.model);
    console.log("Request body keys:", Object.keys(requestBody || {}));
    
    // Safe logging - ensure prompt is a string before calling methods
    console.log("Prompt value:", prompt);
    console.log("Prompt type:", typeof prompt);
    console.log("Prompt is string:", typeof prompt === "string");
    if (typeof prompt === "string") {
      console.log("Prompt length:", prompt.length);
      console.log("Prompt preview:", prompt.substring(0, 100));
    }
    console.log("Conversation history length:", conversationHistory?.length || 0);
    
    // Validate prompt - ensure it's a non-empty string
    if (!prompt) {
      console.error("Prompt is missing or falsy:", prompt);
      return new Response(
        JSON.stringify({ 
          error: "Missing required field: prompt",
          received: {
            prompt: prompt,
            promptType: typeof prompt,
            requestBodyKeys: Object.keys(requestBody || {})
          }
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
    
    if (typeof prompt !== "string") {
      console.error("Prompt is not a string:", prompt, "Type:", typeof prompt);
      return new Response(
        JSON.stringify({ 
          error: "Invalid prompt type: must be a string",
          received: {
            prompt: prompt,
            promptType: typeof prompt
          }
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
    
    if (prompt.trim().length === 0) {
      console.error("Prompt is empty after trim");
      return new Response(
        JSON.stringify({ 
          error: "Prompt cannot be empty",
          received: {
            promptLength: prompt.length,
            promptAfterTrim: prompt.trim().length
          }
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
    
    // Get API keys from environment variables (must be set in Supabase Edge Functions settings)
    const CLAUDE_API_KEY = Deno.env.get("CLAUDE_API_KEY");
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");

    // Validate API keys based on selected model
    if (model === "claude" && !CLAUDE_API_KEY) {
      console.error("CLAUDE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "CLAUDE_API_KEY is not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (model === "gemini" && !GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "GEMINI_API_KEY is not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log(`=== USING ${model.toUpperCase()} API FOR CODE GENERATION ===`);
    console.log(`Model value: "${model}" (type: ${typeof model})`);

    // Build system prompt
    const systemPrompt = `You are an expert web developer AI that generates complete, production-ready HTML, CSS, and JavaScript code.

When the user asks you to create a website:
1. Generate COMPLETE, WORKING code - not pseudocode or examples
2. Always include <!DOCTYPE html>, proper HTML structure with <head> and <body>
3. Embed CSS inside <style> tags in the HTML
4. Embed JavaScript inside <script> tags in the HTML
5. Make the design beautiful, modern, and fully functional
6. Use semantic HTML5 elements
7. Make it responsive with mobile-first approach
8. Add smooth animations and transitions
9. Include all necessary meta tags

Return your response in this EXACT JSON format:
{
  "response": "Brief explanation of what you created",
  "code": {
    "html": "complete HTML code with embedded CSS and JS",
    "css": "",
    "js": ""
  }
}

IMPORTANT: 
- The html field should contain a COMPLETE, WORKING website that can be rendered directly in a browser.`;

    // Convert conversation history to Claude format - with safety checks
    const validHistory = Array.isArray(conversationHistory) 
      ? conversationHistory.filter((msg: any) => msg && msg.role && msg.content)
      : [];
    
    const claudeMessages = [
      ...validHistory.map((msg: any) => ({
        role: msg.role === "assistant" ? "assistant" : "user",
        content: typeof msg.content === "string" && msg.content.trim() ? msg.content.trim() : String(msg.content || "")
      })).filter((msg: any) => msg.content && msg.content.length > 0),
      { role: "user" as const, content: String(prompt).trim() }
    ].filter((msg: any) => msg.content && msg.content.length > 0);

    // Ensure we have at least one user message
    if (claudeMessages.length === 0 || !claudeMessages.some((msg: any) => msg.role === "user")) {
      claudeMessages.push({ role: "user" as const, content: String(prompt).trim() });
    }

    console.log("Prepared", claudeMessages.length, "messages for", model, "API");
    console.log("Message roles:", claudeMessages.map((m: any) => m.role));

    // Call appropriate API based on model selection
    let response: Response;
    let apiResponse: any;

    if (model === "gemini") {
      // Prepare Gemini API request
      console.log("=== GEMINI API PATH === ");
      console.log("Model check passed - using Gemini API");
      console.log("Calling Gemini API...");
      
      // Convert messages to Gemini format
      const geminiContents = claudeMessages.map((msg) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      }));

      // Add system prompt as the first user message for Gemini
      if (systemPrompt) {
        geminiContents.unshift({
          role: "user",
          parts: [{ text: systemPrompt }],
        });
      }

      response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
        {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
            contents: geminiContents,
            generationConfig: {
        temperature: 0.7,
              maxOutputTokens: 4096,
            },
      }),
        }
      );

      console.log("Gemini API response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
        console.error("Gemini API error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
        if (response.status === 400 || response.status === 401) {
          return new Response(
            JSON.stringify({ error: "Invalid API key or request. Please check your Gemini API configuration." }),
            { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        return new Response(
          JSON.stringify({ 
            error: `Gemini API error: ${response.status}`,
            details: errorText
          }),
          { 
            status: response.status, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }

      apiResponse = await response.json();
      
      // Extract text from Gemini response
      const geminiText = apiResponse.candidates?.[0]?.content?.parts?.[0]?.text || "";
      
      if (!geminiText || typeof geminiText !== "string") {
        console.error("No text content in Gemini response:", JSON.stringify(apiResponse));
        return new Response(
          JSON.stringify({ 
            error: "No text content in Gemini API response",
            details: "Response missing text field"
          }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Parse JSON from Gemini response (same format as Claude)
      let parsedResponse;
      try {
        const jsonMatch = geminiText.match(/```json\s*([\s\S]*?)\s*```/) || 
                         geminiText.match(/\{[\s\S]*\}/);
        
        if (jsonMatch) {
          const jsonStr = jsonMatch[1] || jsonMatch[0];
          parsedResponse = JSON.parse(jsonStr);
          console.log("Successfully parsed JSON from Gemini response");
        } else {
          console.log("No JSON found in Gemini response, creating default structure");
          parsedResponse = {
            response: geminiText,
            code: {
              html: "",
              css: "",
              js: "",
            },
          };
        }
      } catch (parseError) {
        console.error("Failed to parse Gemini AI response:", parseError);
        parsedResponse = {
          response: geminiText,
          code: {
            html: "",
            css: "",
            js: "",
          },
        };
      }

      console.log("Returning successful response from Gemini");
      return new Response(JSON.stringify(parsedResponse), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } else {
      // Call Claude API (default or when model !== "gemini")
      console.log("=== CLAUDE API PATH ===");
      console.log(`Model value is "${model}" (not "gemini") - using Claude API`);
      console.log("Calling Claude API...");
      
      // Validate messages before sending
      if (!claudeMessages || claudeMessages.length === 0) {
        console.error("No valid messages to send to Claude API");
        return new Response(
          JSON.stringify({ 
            error: "No valid messages to send",
            details: "Message array is empty or invalid"
          }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Ensure messages array is properly formatted
      const validClaudeMessages = claudeMessages.map((msg: any) => ({
        role: msg.role === "assistant" ? "assistant" : "user",
        content: String(msg.content || "").trim()
      })).filter((msg: any) => msg.content && msg.content.length > 0);

      if (validClaudeMessages.length === 0) {
        console.error("No valid message content after filtering");
        return new Response(
          JSON.stringify({ 
            error: "No valid message content",
            details: "All messages were empty after validation"
          }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      console.log("Sending to Claude API:", {
        model: "claude-3-5-sonnet-20241022",
        messageCount: validClaudeMessages.length,
        firstMessagePreview: validClaudeMessages[0]?.content?.substring(0, 50)
      });

      const requestBody = {
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 4096,
        system: systemPrompt,
        messages: validClaudeMessages,
        temperature: 0.7,
      };

      console.log("Claude API request body:", JSON.stringify(requestBody, null, 2));

      response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": CLAUDE_API_KEY,
          "anthropic-version": "2023-06-01",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      console.log("Claude API response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Claude API error:", response.status, errorText);
        console.error("Request that caused error:", JSON.stringify(requestBody, null, 2));
        
        let errorMessage = `Claude API error: ${response.status}`;
        let errorDetails = errorText;
        
        // Try to parse error details
        try {
          const errorJson = JSON.parse(errorText);
          if (errorJson?.error?.message) {
            errorMessage = errorJson.error.message;
            errorDetails = JSON.stringify(errorJson, null, 2);
          } else if (errorJson?.error) {
            errorMessage = JSON.stringify(errorJson.error);
            errorDetails = errorText;
          }
        } catch (e) {
          // If not JSON, use the text as-is
          console.error("Error parsing Claude API error response:", e);
        }
        
        // Handle specific error cases
        if (response.status === 429) {
          return new Response(
            JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
            { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

        if (response.status === 401) {
          return new Response(
            JSON.stringify({ error: "Invalid API key. Please check your Claude API configuration." }),
            { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        if (response.status === 400 && errorText.includes("credit balance is too low")) {
          return new Response(
            JSON.stringify({ 
              error: "Claude API credits exhausted. Please add credits to your Anthropic account.",
              details: "The API key has run out of credits. Visit https://console.anthropic.com to add credits."
            }),
            { 
              status: 402, 
              headers: { ...corsHeaders, "Content-Type": "application/json" } 
            }
          );
        }

        return new Response(
          JSON.stringify({ 
            error: errorMessage,
            details: errorDetails,
            status: response.status,
            requestPreview: {
              messageCount: validClaudeMessages.length,
              firstMessageLength: validClaudeMessages[0]?.content?.length || 0
            }
          }),
          { 
            status: response.status >= 400 && response.status < 500 ? response.status : 500, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
    }

      console.log("Parsing Claude API response...");
    const data = await response.json();
      
      // Validate response format
      if (!data || !data.content || !Array.isArray(data.content) || data.content.length === 0) {
        console.error("Invalid Claude API response format:", JSON.stringify(data));
        return new Response(
          JSON.stringify({ 
            error: "Invalid response format from Claude API",
            details: "Response missing content array",
            received: data ? Object.keys(data) : "null"
          }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      // Safely extract text content
      const firstContent = data.content[0];
      const aiResponse = firstContent?.text || firstContent?.content || "";
      
      if (!aiResponse || typeof aiResponse !== "string") {
        console.error("No text content in Claude response:", JSON.stringify(firstContent));
        return new Response(
          JSON.stringify({ 
            error: "No text content in Claude API response",
            details: "Response content missing text field"
          }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      console.log("Claude AI Response received, length:", aiResponse.length);

      // Parse JSON from response
    let parsedResponse;
    try {
      // Look for JSON in markdown code blocks or plain text
      const jsonMatch = aiResponse.match(/```json\s*([\s\S]*?)\s*```/) || 
                       aiResponse.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        const jsonStr = jsonMatch[1] || jsonMatch[0];
        parsedResponse = JSON.parse(jsonStr);
          console.log("Successfully parsed JSON from response");
      } else {
          console.log("No JSON found in response, creating default structure");
        parsedResponse = {
          response: aiResponse,
          code: {
            html: "",
            css: "",
            js: "",
          },
        };
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      parsedResponse = {
        response: aiResponse,
        code: {
          html: "",
          css: "",
          js: "",
        },
      };
    }

      console.log("Returning successful response from Claude");
    return new Response(JSON.stringify(parsedResponse), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
    }
  } catch (error) {
    console.error("Unexpected error in generate-code function:", error);
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace");
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error occurred",
        type: error instanceof Error ? error.constructor.name : typeof error
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

