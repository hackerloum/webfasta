import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send, Sparkles, Wand2, Lightbulb, Bot, Zap } from "lucide-react";
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

const AiChat = ({ onCodeGenerated, onGeneratingStart, onGeneratingEnd }: AiChatProps) => {
  // Initialize messages as empty - don't persist across page reloads
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<"claude" | "gemini">(() => {
    // Load from localStorage or default to claude
    const saved = localStorage.getItem("ai-model-preference");
    return (saved === "claude" || saved === "gemini") ? saved : "claude";
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

      let response: any;

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

        // Retry logic for 503/temporary errors
        const maxRetries = 3;
        let lastError: Error | null = null;
        let apiResponse: Response | null = null;

        for (let attempt = 0; attempt < maxRetries; attempt++) {
          try {
            // Use official REST API format - try gemini-2.5-flash first, fallback to other models
            const models = [
              "gemini-2.5-flash",
              "gemini-1.5-flash",
              "gemini-1.5-pro",
            ];
            const modelToUse = models[attempt] || models[0];

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
                    maxOutputTokens: 4096,
                  },
                }),
              }
            );

            // If successful, break out of retry loop
            if (apiResponse.ok) {
              break;
            }

            // If 503 or 429, retry after delay
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
                console.log(`Gemini API unavailable, retrying in ${delayMs}ms (attempt ${attempt + 1}/${maxRetries})...`);
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
          } catch (error: any) {
            lastError = error;
            // If it's not a retryable error, throw immediately
            if (apiResponse && apiResponse.status !== 503 && apiResponse.status !== 429) {
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
          throw lastError || new Error("Gemini API request failed after retries");
        }

        const geminiData = await apiResponse.json();
        const geminiText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "";

        if (!geminiText) {
          throw new Error("No response from Gemini API. The model may be temporarily unavailable.");
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
          } catch (error: any) {
            lastError = error;
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
        content: response.response || response.code?.html || "Code generated successfully!",
      };
      setMessages((prev) => [...prev, assistantMessage]);

      if (response.code) {
        onCodeGenerated(response.code);
      }
    } catch (error: any) {
      console.error("Error:", error);
      
      toast({
        title: "Error",
        description: error?.message || "Failed to generate code. Please try again.",
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
    <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="relative border-b border-border/50 glass-morphism-light p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-xl blur-lg opacity-50 animate-pulse" />
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">AI Assistant</h3>
              <p className="text-xs text-muted-foreground">
                Powered by {selectedModel === "claude" ? "Claude 3.5 Sonnet" : "Gemini 2.0 Flash"}
              </p>
            </div>
          </div>
          <Select value={selectedModel} onValueChange={(value: "claude" | "gemini") => setSelectedModel(value)}>
            <SelectTrigger className="w-[140px] h-9 text-xs">
              <SelectValue>
                <div className="flex items-center gap-2">
                  {selectedModel === "claude" ? (
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
            <SelectContent>
              <SelectItem value="claude">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  <span>Claude 3.5</span>
                </div>
              </SelectItem>
              <SelectItem value="gemini">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>Gemini 2.0</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4 scrollbar-thin" ref={scrollRef}>
        <div className="space-y-4">
          {/* Empty State */}
          {messages.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl" />
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto border-2 border-primary/30">
                  <Wand2 className="w-10 h-10 text-primary animate-float" />
                </div>
              </div>
              
              <h4 className="text-lg font-bold text-foreground mb-2">
                Let's Build Something Amazing
              </h4>
              <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
                Describe what you want to create and I'll generate the code for you instantly.
                <br />
                <span className="text-xs opacity-75">(Supports English & Swahili / Inasaidia Kiingereza na Kiswahili)</span>
              </p>

              {/* Suggestions */}
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-3">
                  <Lightbulb className="w-3 h-3" />
                  <span>Try these examples:</span>
                </div>
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="block w-full text-left text-xs px-4 py-2.5 rounded-lg bg-muted/50 hover:bg-primary/10 border border-border/50 hover:border-primary/50 text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-1"
                  >
                    <span className="inline-block mr-2">→</span>
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={cn(
                "flex animate-fade-in",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl p-4 shadow-lg transition-all duration-300 hover:scale-[1.02]",
                  msg.role === "user"
                    ? "bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-primary/20"
                    : "bg-muted/80 backdrop-blur-sm text-foreground border border-border/50"
                )}
              >
                {/* Avatar for assistant */}
                {msg.role === "assistant" && (
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Sparkles className="w-3 h-3 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                )}
                {msg.role === "user" && (
                  <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">{msg.content}</p>
                )}
              </div>
            </div>
          ))}

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-muted/80 backdrop-blur-sm border border-border/50 rounded-2xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                  </div>
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-border/50 p-4 glass-morphism-light">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <div className="flex-1 relative group">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
              placeholder="Describe what you want to build... (English or Swahili)"
            disabled={isLoading}
              className="flex-1 bg-background/50 border-border/50 focus:border-primary/50 pr-10 h-11 rounded-xl transition-all focus:shadow-glow"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground opacity-0 group-focus-within:opacity-100 transition-opacity">
              <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono">↵</kbd>
            </div>
          </div>
          <Button 
            type="submit" 
            disabled={isLoading || !input.trim()} 
            size="icon"
            className={cn(
              "h-11 w-11 rounded-xl transition-all duration-200",
              !isLoading && input.trim() 
                ? "bg-gradient-to-br from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-glow hover:shadow-glow-lg hover:scale-105 active:scale-95" 
                : ""
            )}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </form>
        <p className="text-[10px] text-muted-foreground mt-2 text-center">
          AI can make mistakes. Always review generated code.
        </p>
      </div>
    </Card>
  );
};

export default AiChat;
