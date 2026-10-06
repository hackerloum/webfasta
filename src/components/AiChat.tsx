import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send, Bot, Zap, Cpu } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AiChatProps {
  onCodeGenerated: (code: { html: string; css: string; js: string }) => void;
  onGeneratingStart?: () => void;
  onGeneratingEnd?: () => void;
}

type AiModel = "openai" | "claude" | "gemini";

interface GeneratedResponse {
  response?: string;
  code?: { html: string; css: string; js: string };
}

interface GeminiResponse {
  candidates?: Array<{
    content?: { parts?: Array<{ text?: string }> };
    finishReason?: string;
  }>;
  error?: { message?: string };
  usageMetadata?: unknown;
}

function asError(error: unknown): Error {
  return error instanceof Error ? error : new Error(String(error));
}

const WEBSITE_SYSTEM_PROMPT = `You are an expert web developer AI that generates complete, production-ready HTML, CSS, and JavaScript code.

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

function parseModelJson(text: string) {
  try {
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const jsonStr = jsonMatch[1] || jsonMatch[0];
      return JSON.parse(jsonStr);
    }
  } catch {
    // Fall through to a plain-text response.
  }

  return {
    response: text,
    code: { html: "", css: "", js: "" },
  };
}

const AiChat = ({ onCodeGenerated, onGeneratingStart, onGeneratingEnd }: AiChatProps) => {
  // Initialize messages as empty - don't persist across page reloads
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<AiModel>(() => {
    const saved = localStorage.getItem("ai-model-preference");
    return saved === "claude" || saved === "gemini" || saved === "openai" ? saved : "openai";
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { user, userProfile } = useAuth();

  // Clear localStorage messages on component mount (page refresh/restart)
  useEffect(() => {
    localStorage.removeItem("ai-chat-messages");
  }, []);

  // Save model preference to localStorage
  useEffect(() => {
    localStorage.setItem("ai-model-preference", selectedModel);
  }, [selectedModel]);

  const suggestions = [
    "Create a landing page for a coffee shop",
    "Build a portfolio website for a photographer",
    "Make a pricing page with 3 tiers",
    "Design a contact form with validation",
    "Tengeneza ukurasa wa kwanza kwa duka la kahawa",
    "Unda tovuti ya portfolio kwa mpiga picha",
    "Fanya ukurasa wa bei na viwango 3",
    "Tengeneza fomu ya mawasiliano"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    const promptText = input.trim();
    setInput("");
    setIsLoading(true);

    // Notify that generation has started
    onGeneratingStart?.();

    try {
      console.log("Sending request with prompt:", promptText.substring(0, 50));
      console.log("Messages count:", messages.length);
      console.log("Selected model:", selectedModel);

      let response: GeneratedResponse | null = null;

      if (selectedModel === "gemini") {
        // Call Gemini API directly using official REST API
        const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
        
        if (!GEMINI_API_KEY) {
          throw new Error("Gemini API key is not configured. Please set VITE_GEMINI_API_KEY in your .env file.");
        }
        
        // Build conversation history in Gemini format
        const conversationParts = messages.map((msg) => msg.content);
        const fullPrompt = promptText;

        // Combine system prompt with user prompt
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

        // Build the prompt with conversation context
        let fullContext = systemPrompt;
        if (conversationParts.length > 0) {
          fullContext += "\n\nPrevious conversation:\n" + conversationParts.join("\n\n");
        }
        fullContext += `\n\nUser request: ${fullPrompt}`;

        // Retry logic for 503/temporary errors - always use gemini-2.5-flash
        const maxRetries = 3;
        const modelToUse = "gemini-2.5-flash"; // Always use gemini-2.5-flash as per official guide
        let lastError: Error | null = null;
        let apiResponse: Response | null = null;

        for (let attempt = 0; attempt < maxRetries; attempt++) {
          try {
            // Use official REST API format with gemini-2.5-flash model
            apiResponse = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/${modelToUse}:generateContent`,
              {
                method: "POST",
                headers: {
                  "x-goog-api-key": GEMINI_API_KEY,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  contents: [
                    {
                      parts: [
                        {
                          text: fullContext,
                        },
                      ],
                    },
                  ],
                  generationConfig: {
                    temperature: 0.7,
                    // Use default maxOutputTokens - let API decide optimal token allocation
                  },
                }),
              }
            );

            // If successful, break out of retry loop
            if (apiResponse.ok) {
              break;
            }

            // If 503 or 429, retry with same model after delay
            if (apiResponse.status === 503 || apiResponse.status === 429) {
              const errorText = await apiResponse.text();
              let errorMessage = "Gemini API temporarily unavailable";
              try {
                const errorJson = JSON.parse(errorText);
                errorMessage = errorJson.error?.message || errorMessage;
              } catch (e) {
                // Use default error message
              }

              lastError = new Error(errorMessage);

              // Wait before retrying (exponential backoff)
              if (attempt < maxRetries - 1) {
                const delayMs = Math.min(1000 * Math.pow(2, attempt), 5000);
                console.log(`Gemini API temporarily unavailable, retrying ${modelToUse} in ${delayMs}ms (attempt ${attempt + 1}/${maxRetries})...`);
                await new Promise(resolve => setTimeout(resolve, delayMs));
                continue;
              }
            } else {
              // For other errors, don't retry
              const errorText = await apiResponse.text();
              let errorMessage = "Gemini API error";
              try {
                const errorJson = JSON.parse(errorText);
                errorMessage = errorJson.error?.message || errorText;
              } catch (e) {
                errorMessage = errorText;
              }
              throw new Error(errorMessage);
            }
          } catch (error: unknown) {
            lastError = asError(error);
            // If it's a network error or retryable HTTP error, continue to next retry
            if (!apiResponse || apiResponse.status === 503 || apiResponse.status === 429) {
              if (attempt < maxRetries - 1) {
                const delayMs = Math.min(1000 * Math.pow(2, attempt), 5000);
                await new Promise(resolve => setTimeout(resolve, delayMs));
                continue;
              }
            } else {
              // For other errors, throw immediately
              throw error;
            }
          }
        }

        // If we exhausted retries, throw the last error
        if (!apiResponse || !apiResponse.ok) {
          throw lastError || new Error("Gemini API request failed after retries");
        }

        // Parse response with error handling
        let geminiData: GeminiResponse;
        try {
          const responseText = await apiResponse.text();
          console.log("Gemini API raw response:", responseText.substring(0, 500)); // Log first 500 chars for debugging
          
          if (!responseText || responseText.trim().length === 0) {
            throw new Error("Empty response from Gemini API");
          }
          
          geminiData = JSON.parse(responseText) as GeminiResponse;
        } catch (parseError: unknown) {
          console.error("Error parsing Gemini API response:", parseError);
          throw new Error(`Failed to parse Gemini API response: ${asError(parseError).message}`);
        }
        
        // Log the full response for debugging
        console.log("Gemini API parsed response:", geminiData);
        
        // Handle different response structures
        let geminiText = "";
        
        // Check for candidates array (standard response)
        if (geminiData.candidates && geminiData.candidates.length > 0) {
          const candidate = geminiData.candidates[0];
          if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
            geminiText = candidate.content.parts[0].text || "";
          }
        }
        
        // Check for error in response
        if (geminiData.error) {
          throw new Error(geminiData.error.message || `Gemini API error: ${JSON.stringify(geminiData.error)}`);
        }
        
        // Check for blocked content
        const finishReason = geminiData.candidates?.[0]?.finishReason;
        
        if (finishReason === "SAFETY") {
          throw new Error("Response blocked for safety reasons. Please try a different prompt.");
        }
        
        if (finishReason === "RECITATION") {
          throw new Error("Response blocked for recitation. Please try a different prompt.");
        }
        
        if (finishReason === "MAX_TOKENS") {
          // Response was truncated - try to get partial content or inform user
          if (!geminiText || geminiText.trim().length === 0) {
            throw new Error("Response was truncated due to token limit. The prompt may be too complex. Please try breaking it into smaller requests or simplify your request.");
          }
          // If we have partial text, continue but warn user
          console.warn("Gemini response was truncated (MAX_TOKENS). Partial response will be used.");
        }

        if (!geminiText || geminiText.trim().length === 0) {
          console.error("Empty Gemini response:", geminiData);
          console.error("Finish reason:", finishReason);
          console.error("Usage metadata:", geminiData.usageMetadata);
          
          // Provide helpful error message based on finish reason
          if (finishReason === "MAX_TOKENS") {
            throw new Error("Response exceeded token limit. The prompt or response was too long. Please try a simpler request or break it into smaller parts.");
          }
          
          throw new Error("No text content in Gemini API response. Please check the API response structure or try again.");
        }

        // Parse JSON from response
        let parsedResponse;
        try {
          const jsonMatch = geminiText.match(/```json\s*([\s\S]*?)\s*```/) || 
                           geminiText.match(/\{[\s\S]*\}/);
          
          if (jsonMatch) {
            const jsonStr = jsonMatch[1] || jsonMatch[0];
            parsedResponse = JSON.parse(jsonStr);
          } else {
            parsedResponse = {
              response: geminiText,
              code: { html: "", css: "", js: "" },
            };
          }
        } catch (parseError) {
          parsedResponse = {
            response: geminiText,
            code: { html: "", css: "", js: "" },
          };
        }

        response = parsedResponse;
      } else if (selectedModel === "openai") {
        const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || "";

        if (!OPENAI_API_KEY) {
          throw new Error("OpenAI API key is not configured. Please set VITE_OPENAI_API_KEY in your .env file.");
        }

        const openaiMessages = [
          { role: "system" as const, content: WEBSITE_SYSTEM_PROMPT },
          ...messages.map((msg) => ({
            role: msg.role === "assistant" ? ("assistant" as const) : ("user" as const),
            content: msg.content,
          })),
          { role: "user" as const, content: promptText },
        ];

        const maxRetries = 3;
        let lastError: Error | null = null;
        let apiResponse: Response | null = null;

        for (let attempt = 0; attempt < maxRetries; attempt++) {
          try {
            apiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${OPENAI_API_KEY}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                model: "gpt-6.1-sol",
                messages: openaiMessages,
                response_format: { type: "json_object" },
                max_completion_tokens: 32000,
              }),
            });

            if (apiResponse.ok) {
              break;
            }

            if (apiResponse.status === 429 || apiResponse.status === 503) {
              const errorText = await apiResponse.text();
              let errorMessage = "OpenAI API temporarily unavailable";
              try {
                const errorJson = JSON.parse(errorText);
                errorMessage = errorJson.error?.message || errorMessage;
              } catch {
                // Use the default error message.
              }

              lastError = new Error(errorMessage);

              if (attempt < maxRetries - 1) {
                const delayMs = Math.min(1000 * Math.pow(2, attempt), 5000);
                await new Promise((resolve) => setTimeout(resolve, delayMs));
                continue;
              }
            } else {
              const errorText = await apiResponse.text();
              let errorMessage = "OpenAI API error";
              try {
                const errorJson = JSON.parse(errorText);
                errorMessage = errorJson.error?.message || errorText;
              } catch {
                errorMessage = errorText;
              }
              throw new Error(errorMessage);
            }
          } catch (error: unknown) {
            lastError = asError(error);
            if (apiResponse && apiResponse.status !== 429 && apiResponse.status !== 503) {
              throw error;
            }
            if (attempt < maxRetries - 1) {
              const delayMs = Math.min(1000 * Math.pow(2, attempt), 5000);
              await new Promise((resolve) => setTimeout(resolve, delayMs));
              continue;
            }
          }
        }

        if (!apiResponse || !apiResponse.ok) {
          throw lastError || new Error("OpenAI API request failed after retries");
        }

        const openaiData = await apiResponse.json();
        const aiResponse = openaiData.choices?.[0]?.message?.content || "";

        if (!aiResponse) {
          throw new Error("No response from OpenAI API");
        }

        response = parseModelJson(aiResponse);
      } else {
        // Call Claude API directly
        const CLAUDE_API_KEY = import.meta.env.VITE_CLAUDE_API_KEY || "";
        
        if (!CLAUDE_API_KEY) {
          throw new Error("Claude API key is not configured. Please set VITE_CLAUDE_API_KEY in your .env file.");
        }
        
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

        const claudeMessages = [
          ...messages.map((msg) => ({
            role: msg.role === "assistant" ? "assistant" : "user",
            content: msg.content,
          })),
          { role: "user" as const, content: promptText },
        ];

        // Retry logic for Claude API
        const maxRetries = 3;
        let lastError: Error | null = null;
        let apiResponse: Response | null = null;

        for (let attempt = 0; attempt < maxRetries; attempt++) {
          try {
            apiResponse = await fetch("https://api.anthropic.com/v1/messages", {
              method: "POST",
              headers: {
                "x-api-key": CLAUDE_API_KEY,
                "anthropic-version": "2023-06-01",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                model: "claude-3-5-sonnet-20241022",
                max_tokens: 4096,
                system: systemPrompt,
                messages: claudeMessages,
                temperature: 0.7,
              }),
            });

            // If successful, break out of retry loop
            if (apiResponse.ok) {
              break;
            }

            // If 429 (rate limit) or 503 (service unavailable), retry after delay
            if (apiResponse.status === 429 || apiResponse.status === 503) {
              const errorText = await apiResponse.text();
              let errorMessage = "Claude API temporarily unavailable";
              try {
                const errorJson = JSON.parse(errorText);
                errorMessage = errorJson.error?.message || errorMessage;
              } catch (e) {
                // Use default error message
              }

              lastError = new Error(errorMessage);

              // Wait before retrying (exponential backoff)
              if (attempt < maxRetries - 1) {
                const delayMs = Math.min(1000 * Math.pow(2, attempt), 5000);
                console.log(`Claude API unavailable, retrying in ${delayMs}ms (attempt ${attempt + 1}/${maxRetries})...`);
                await new Promise(resolve => setTimeout(resolve, delayMs));
                continue;
              }
            } else {
              // For other errors, don't retry
              const errorText = await apiResponse.text();
              let errorMessage = "Claude API error";
              try {
                const errorJson = JSON.parse(errorText);
                errorMessage = errorJson.error?.message || errorText;
              } catch (e) {
                errorMessage = errorText;
              }
              throw new Error(errorMessage);
            }
          } catch (error: unknown) {
            lastError = asError(error);
            // If it's not a retryable error, throw immediately
            if (apiResponse && apiResponse.status !== 429 && apiResponse.status !== 503) {
              throw error;
            }
            // Otherwise, continue to next retry
            if (attempt < maxRetries - 1) {
              const delayMs = Math.min(1000 * Math.pow(2, attempt), 5000);
              await new Promise(resolve => setTimeout(resolve, delayMs));
              continue;
            }
          }
        }

        // If we exhausted retries, throw the last error
        if (!apiResponse || !apiResponse.ok) {
          throw lastError || new Error("Claude API request failed after retries");
        }

        const claudeData = await apiResponse.json();
        const aiResponse = claudeData.content?.[0]?.text || "";

        if (!aiResponse) {
          throw new Error("No response from Claude API");
        }

        // Parse JSON from response
        let parsedResponse;
        try {
          const jsonMatch = aiResponse.match(/```json\s*([\s\S]*?)\s*```/) || 
                           aiResponse.match(/\{[\s\S]*\}/);
          
          if (jsonMatch) {
            const jsonStr = jsonMatch[1] || jsonMatch[0];
            parsedResponse = JSON.parse(jsonStr);
          } else {
            parsedResponse = {
              response: aiResponse,
              code: { html: "", css: "", js: "" },
            };
          }
        } catch (parseError) {
          parsedResponse = {
            response: aiResponse,
            code: { html: "", css: "", js: "" },
          };
        }

        response = parsedResponse;
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: response?.response || response?.code?.html || "Code generated successfully!",
      };
      setMessages((prev) => [...prev, assistantMessage]);

      if (response?.code) {
        onCodeGenerated(response.code);
      }
    } catch (error: unknown) {
      console.error("Error:", error);
      
      toast({
        title: "Error",
        description: asError(error).message || "Failed to generate code. Please try again.",
        variant: "destructive",
      });
      
      // Notify that generation has ended (even on error)
      onGeneratingEnd?.();
    } finally {
      setIsLoading(false);
      
      // Notify that generation has ended
      onGeneratingEnd?.();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <Card className="h-full bg-[#fbf9f5] text-[#1a1814] border border-[#e4ddd2] shadow-none rounded-none flex flex-col overflow-hidden font-sans">
      <div className="border-b border-[#e4ddd2] px-3 py-2">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-sm font-['Newsreader',serif] text-[#1a1814]">Chat</h3>
            <p className="text-xs text-[#6b645b] truncate">
              {selectedModel === "openai"
                ? "GPT-6.1"
                : selectedModel === "claude"
                  ? "Claude 3.5 Sonnet"
                  : "Gemini 2.5 Flash"}
            </p>
          </div>
          <Select
            value={selectedModel}
            onValueChange={(value) => {
              if (value === "openai" || value === "claude" || value === "gemini") {
                setSelectedModel(value);
              }
            }}
          >
            <SelectTrigger className="w-[140px] h-8 text-xs border-[#e4ddd2] bg-[#fbf9f5] text-[#1a1814] shadow-none">
              <SelectValue>
                <div className="flex items-center gap-2">
                  {selectedModel === "openai" ? (
                    <>
                      <Cpu className="w-3 h-3" />
                      <span>OpenAI</span>
                    </>
                  ) : selectedModel === "claude" ? (
                    <>
                      <Bot className="w-3 h-3" />
                      <span>Claude</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-3 h-3" />
                      <span>Gemini</span>
                    </>
                  )}
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-[#fbf9f5] text-[#1a1814] border-[#e4ddd2]">
              <SelectItem value="openai">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  <span>GPT-6.1</span>
                </div>
              </SelectItem>
              <SelectItem value="claude">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  <span>Claude 3.5</span>
                </div>
              </SelectItem>
              <SelectItem value="gemini">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>Gemini 2.5</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ScrollArea className="flex-1 px-3 py-3" ref={scrollRef}>
        <div className="space-y-3">
          {messages.length === 0 && (
            <div className="py-6">
              <h4 className="font-['Newsreader',serif] text-lg text-[#1a1814] mb-1">
                What should we build?
              </h4>
              <p className="text-sm text-[#6b645b] mb-4">
                Describe the page. English and Swahili both work.
              </p>

              <div className="space-y-1">
                <p className="text-xs text-[#6b645b] mb-2">Examples</p>
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="block w-full text-left text-xs px-2 py-1.5 text-[#1a1814] border border-transparent hover:border-[#e4ddd2] hover:bg-[#f4f0e8]"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={cn(
                "flex",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] px-3 py-2 text-sm leading-relaxed",
                  msg.role === "user"
                    ? "bg-[#146c43] text-[#fbf9f5]"
                    : "bg-[#f4f0e8] text-[#1a1814] border border-[#e4ddd2]"
                )}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="px-3 py-2 text-xs text-[#6b645b] border border-[#e4ddd2] bg-[#f4f0e8]">
                Working
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t border-[#e4ddd2] p-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe what you want to build... (English or Swahili)"
            disabled={isLoading}
            className="bg-[#fbf9f5] border-[#e4ddd2] text-[#1a1814] shadow-none h-9 rounded-md placeholder:text-[#6b645b] focus-visible:ring-[#146c43] focus-visible:ring-offset-0"
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            size="icon"
            className="h-9 w-9 rounded-md bg-[#146c43] text-[#fbf9f5] hover:bg-[#0e4d30] shadow-none"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </form>
        <p className="text-[10px] text-[#6b645b] mt-2">
          AI can make mistakes. Always review generated code.
        </p>
      </div>
    </Card>
  );
};

export default AiChat;
