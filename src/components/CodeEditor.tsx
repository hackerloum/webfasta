import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileCode, FileText, Code, Copy, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface CodeFile {
  name: string;
  content: string;
  language: string;
}

interface CodeEditorProps {
  files: CodeFile[];
  activeFile: string;
  onFileChange: (fileName: string) => void;
  isStreaming?: boolean;
}

const CodeEditor = ({ files, activeFile, onFileChange, isStreaming = false }: CodeEditorProps) => {
  const [copied, setCopied] = useState(false);
  const [displayedContent, setDisplayedContent] = useState<{ [key: string]: string }>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  const streamingRef = useRef<{ [key: string]: number }>({});

  const handleCopy = () => {
    const currentFile = files.find((f) => f.name === activeFile);
    if (currentFile) {
      navigator.clipboard.writeText(currentFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Streaming effect - typewriter animation
  useEffect(() => {
    files.forEach((file) => {
      const targetContent = file.content;
      const currentDisplayed = displayedContent[file.name] || "";

      // If content is already fully displayed or streaming is off, just show full content
      if (!isStreaming || currentDisplayed === targetContent) {
        if (displayedContent[file.name] !== targetContent) {
          setDisplayedContent((prev) => ({ ...prev, [file.name]: targetContent }));
        }
        return;
      }

      // Start streaming animation
      if (currentDisplayed.length < targetContent.length) {
        const currentIndex = streamingRef.current[file.name] || 0;
        
        if (currentIndex < targetContent.length) {
          const timer = setTimeout(() => {
            // Stream faster (show chunks of characters for better performance)
            const chunkSize = 5; // Show 5 characters at a time
            const nextIndex = Math.min(currentIndex + chunkSize, targetContent.length);
            const newContent = targetContent.substring(0, nextIndex);
            
            setDisplayedContent((prev) => ({ ...prev, [file.name]: newContent }));
            streamingRef.current[file.name] = nextIndex;

            // Auto-scroll to bottom
            if (scrollRef.current) {
              scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }
          }, 10); // 10ms per chunk (faster streaming)

          return () => clearTimeout(timer);
        }
      }
    });
  }, [files, displayedContent, isStreaming]);

  // Reset streaming refs when files change
  useEffect(() => {
    if (isStreaming) {
      streamingRef.current = {};
      setDisplayedContent({});
    }
  }, [files.length, isStreaming]);

  const getFileIcon = (language: string) => {
    switch (language) {
      case "html":
        return <FileText className="w-4 h-4" />;
      case "css":
        return <Code className="w-4 h-4" />;
      case "javascript":
        return <FileCode className="w-4 h-4" />;
      default:
        return <FileCode className="w-4 h-4" />;
    }
  };

  const getLanguageColor = (language: string) => {
    switch (language) {
      case "html":
        return "text-orange-400";
      case "css":
        return "text-blue-400";
      case "javascript":
        return "text-yellow-400";
      default:
        return "text-primary";
    }
  };

  const currentFile = files.find((f) => f.name === activeFile);
  const contentToShow = displayedContent[activeFile] || currentFile?.content || "";
  const lines = contentToShow.split("\n");
  const isCurrentlyStreaming = isStreaming && contentToShow.length < (currentFile?.content.length || 0);

  return (
    <Card className="h-full bg-code-bg/50 backdrop-blur-sm border-code-border/50 flex flex-col overflow-hidden">
      {/* Tab Bar */}
      <div className="relative border-b border-code-border/50 glass-morphism-light">
        <Tabs value={activeFile} onValueChange={onFileChange} className="w-full">
          <div className="flex items-center justify-between">
            <ScrollArea className="flex-1">
            <TabsList className="w-full justify-start bg-transparent border-0 p-0 h-auto rounded-none">
                {files.map((file) => {
                  const fileContent = displayedContent[file.name] || "";
                  const isFileStreaming = isStreaming && fileContent.length < file.content.length;
                  
                  return (
                <TabsTrigger
                  key={file.name}
                  value={file.name}
                      className={cn(
                        "relative border-b-2 border-transparent rounded-none px-4 py-3 transition-all hover:bg-code-bg/50 data-[state=active]:bg-code-bg",
                        "data-[state=active]:border-primary data-[state=active]:text-primary"
                      )}
                >
                  <div className="flex items-center gap-2">
                        {isFileStreaming && (
                          <Loader2 className="w-3 h-3 animate-spin text-primary" />
                    )}
                        <span className={cn(
                          "transition-colors",
                          activeFile === file.name ? getLanguageColor(file.language) : ""
                        )}>
                          {getFileIcon(file.language)}
                        </span>
                        <span className="text-xs font-semibold">{file.name}</span>
                  </div>
                </TabsTrigger>
                  );
                })}
            </TabsList>
          </ScrollArea>

            {/* Action Buttons */}
            <div className="flex-shrink-0 px-3 flex items-center gap-2">
              {/* Streaming Indicator */}
              {isCurrentlyStreaming && (
                <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-primary/10 border border-primary/30">
                  <Loader2 className="w-3 h-3 animate-spin text-primary" />
                  <span className="text-xs font-medium text-primary">Generating...</span>
                </div>
              )}
              
              {/* Copy Button */}
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCopy}
                className="h-8 gap-2 hover:bg-primary/10 transition-all"
                disabled={isCurrentlyStreaming}
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-green-500" />
                    <span className="text-xs font-medium text-green-500">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span className="text-xs font-medium">Copy</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </Tabs>
      </div>

      {/* Code Display */}
      <ScrollArea className="flex-1 scrollbar-thin" ref={scrollRef}>
        <div className="relative">
          {files.map((file) => {
            const displayContent = displayedContent[file.name] || file.content;
            const displayLines = displayContent.split("\n");
            
            return (
            <div
              key={file.name}
                className={cn(
                  "transition-opacity duration-200",
                  activeFile === file.name ? "block" : "hidden"
                )}
              >
                <div className="flex">
                  {/* Line Numbers */}
                  <div className="flex-shrink-0 w-12 bg-code-bg/30 border-r border-code-border/30 text-right pr-4 py-4 select-none">
                    {displayLines.map((_, idx) => (
                      <div
                        key={idx}
                        className="text-xs text-muted-foreground/40 font-mono leading-relaxed hover:text-muted-foreground/60 transition-colors"
                      >
                        {idx + 1}
                      </div>
                    ))}
                  </div>

                  {/* Code Content */}
                  <div className="flex-1 p-4 overflow-x-auto">
              <pre className="text-sm text-foreground font-mono leading-relaxed">
                      <code className="language-{file.language}">
                        {displayContent}
                        {isStreaming && displayContent.length < file.content.length && (
                          <span className="inline-block w-2 h-4 ml-1 bg-primary animate-pulse" />
                        )}
                      </code>
              </pre>
            </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Status Bar */}
      <div className="border-t border-code-border/50 px-4 py-2 glass-morphism-light flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span className="font-medium">
            {currentFile?.language.toUpperCase() || "TEXT"}
          </span>
          <span>•</span>
          <span>{lines.length} lines</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono">UTF-8</span>
        </div>
      </div>
    </Card>
  );
};

export default CodeEditor;
