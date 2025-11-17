import { useState, useEffect } from "react";
import CodeEditor from "@/components/CodeEditor";
import PreviewPanel from "@/components/PreviewPanel";
import AiChat from "@/components/AiChat";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Code2, Eye, Code, Home, Download, CheckCircle2, Sparkles, Layers, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useDevice } from "@/hooks/use-device";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

interface CodeFile {
  name: string;
  content: string;
  language: string;
}

type ViewMode = "split" | "code" | "preview";

const Builder = () => {
  const { isMobileOrTablet, isDesktop } = useDevice();
  const [files, setFiles] = useState<CodeFile[]>([
    {
      name: "index.html",
      content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website</title>
  <style id="generated-styles"></style>
</head>
<body>
  <div class="container">
    <h1>Welcome to AI Website Builder</h1>
    <p>Ask the AI to create something amazing!</p>
  </div>
  <script id="generated-script"></script>
</body>
</html>`,
      language: "html",
    },
  ]);
  const [activeFile, setActiveFile] = useState("index.html");
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileView, setMobileView] = useState<"chat" | "preview">("chat");

  // Simulate auto-save effect
  useEffect(() => {
    if (files.length > 0) {
      setSaveStatus("saving");
      const timer = setTimeout(() => setSaveStatus("saved"), 1000);
      return () => clearTimeout(timer);
    }
  }, [files]);

  const handleCodeGenerated = (code: { html: string; css: string; js: string }) => {
    // Start streaming animation
    setIsStreaming(true);
    setIsGenerating(true);
    
    // Switch to preview view on mobile when code is being generated
    if (isMobileOrTablet) {
      setMobileView("preview");
    }
    
    const newFiles: CodeFile[] = [];
    
    if (code.html) {
      newFiles.push({
        name: "index.html",
        content: code.html,
        language: "html",
      });
    }
    
    if (code.css) {
      newFiles.push({
        name: "styles.css",
        content: code.css,
        language: "css",
      });
    }
    
    if (code.js) {
      newFiles.push({
        name: "script.js",
        content: code.js,
        language: "javascript",
      });
    }

    if (newFiles.length > 0) {
      setFiles(newFiles);
      setActiveFile(newFiles[0].name);
      
      // Stop streaming after content is displayed (estimate based on content length)
      const totalLength = newFiles.reduce((sum, file) => sum + file.content.length, 0);
      const streamDuration = Math.min((totalLength / 5) * 10, 5000); // 10ms per 5 chars, max 5s
      
      setTimeout(() => {
        setIsStreaming(false);
        setTimeout(() => setIsGenerating(false), 500); // Small delay for carousel transition
      }, streamDuration);
    } else {
      setIsStreaming(false);
      setIsGenerating(false);
    }
  };

  const handleGeneratingStart = () => {
    setIsGenerating(true);
    // Switch to preview view on mobile when generation starts
    if (isMobileOrTablet) {
      setMobileView("preview");
    }
  };

  const handleGeneratingEnd = () => {
    if (!isStreaming) {
      setIsGenerating(false);
    }
  };

  const getPreviewContent = () => {
    const htmlFile = files.find((f) => f.name === "index.html");
    const cssFile = files.find((f) => f.name === "styles.css");
    const jsFile = files.find((f) => f.name === "script.js");

    let content = htmlFile?.content || "";

    if (cssFile) {
      content = content.replace(
        '<style id="generated-styles"></style>',
        `<style id="generated-styles">${cssFile.content}</style>`
      );
    }

    if (jsFile) {
      content = content.replace(
        '<script id="generated-script"></script>',
        `<script id="generated-script">${jsFile.content}</script>`
      );
    }

    return content;
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Enhanced Header */}
      <header className="relative border-b border-border/50 glass-morphism h-16 px-6 z-10">
        <div className="flex items-center justify-between h-full">
          {/* Logo and Project Info */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-xl blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300" />
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Code2 className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
              <div className="hidden md:block">
                <h1 className="text-base font-bold text-gradient">AI Builder</h1>
                <p className="text-xs text-muted-foreground">Studio</p>
              </div>
            </Link>

            {/* Save Status Indicator */}
            <div className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
              saveStatus === "saved" ? "bg-green-500/10 text-green-500" :
              saveStatus === "saving" ? "bg-yellow-500/10 text-yellow-500" :
              "bg-red-500/10 text-red-500"
            )}>
              <CheckCircle2 className={cn(
                "w-3 h-3",
                saveStatus === "saving" && "animate-spin"
              )} />
              <span className="hidden sm:inline">
                {saveStatus === "saved" ? "Saved" : saveStatus === "saving" ? "Saving..." : "Unsaved"}
              </span>
            </div>
          </div>

          {/* View Mode Toggle - Enhanced */}
          <div className="flex items-center gap-3">
            {/* Mobile/Tablet View Toggle Button */}
            {isMobileOrTablet && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileView(mobileView === "chat" ? "preview" : "chat")}
                className="gap-2 hover:bg-muted transition-all h-8"
              >
                {mobileView === "chat" ? (
                  <>
                    <Eye className="w-4 h-4" />
                    <span className="hidden sm:inline text-xs font-semibold">Preview</span>
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-4 h-4" />
                    <span className="hidden sm:inline text-xs font-semibold">Chat</span>
                  </>
                )}
              </Button>
            )}
            
            {/* Mobile/Tablet Menu Button */}
            {isMobileOrTablet && (
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button 
                    size="sm"
                    variant="ghost"
                    className="gap-2 hover:bg-muted transition-all h-8"
                  >
                    <Menu className="w-4 h-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[90vw] sm:w-[400px] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Code Editor & Controls</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    {/* Save Status */}
                    <div className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                      saveStatus === "saved" ? "bg-green-500/10 text-green-500" :
                      saveStatus === "saving" ? "bg-yellow-500/10 text-yellow-500" :
                      "bg-red-500/10 text-red-500"
                    )}>
                      <CheckCircle2 className={cn(
                        "w-4 h-4",
                        saveStatus === "saving" && "animate-spin"
                      )} />
                      <span>
                        {saveStatus === "saved" ? "Saved" : saveStatus === "saving" ? "Saving..." : "Unsaved"}
                      </span>
                    </div>

                    <Separator />

                    {/* File count badge */}
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 text-sm font-medium text-muted-foreground">
                      <Layers className="w-4 h-4" />
                      <span>{files.length} {files.length === 1 ? 'file' : 'files'}</span>
                    </div>

                    <Separator />

                    {/* View mode toggle */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground mb-2">View Mode</p>
                      <div className="flex flex-col gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setViewMode("code");
                            setSidebarOpen(false);
                          }}
                          className={cn(
                            "gap-2 transition-all duration-200 justify-start",
                            viewMode === "code" 
                              ? "bg-primary text-primary-foreground shadow-glow hover:bg-primary/90" 
                              : "hover:bg-muted"
                          )}
                        >
                          <Code className="w-4 h-4" />
                          <span className="text-sm font-semibold">Code</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setViewMode("split");
                            setSidebarOpen(false);
                          }}
                          className={cn(
                            "gap-2 transition-all duration-200 justify-start",
                            viewMode === "split" 
                              ? "bg-primary text-primary-foreground shadow-glow hover:bg-primary/90" 
                              : "hover:bg-muted"
                          )}
                        >
                          <Code2 className="w-4 h-4" />
                          <span className="text-sm font-semibold">Split</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setViewMode("preview");
                            setSidebarOpen(false);
                          }}
                          className={cn(
                            "gap-2 transition-all duration-200 justify-start",
                            viewMode === "preview" 
                              ? "bg-primary text-primary-foreground shadow-glow hover:bg-primary/90" 
                              : "hover:bg-muted"
                          )}
                        >
                          <Eye className="w-4 h-4" />
                          <span className="text-sm font-semibold">Preview</span>
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    {/* Code Editor */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground mb-2">Code Editor</p>
                      <div className="h-[400px] rounded-lg overflow-hidden border border-border">
                        <CodeEditor
                          files={files}
                          activeFile={activeFile}
                          onFileChange={setActiveFile}
                          isStreaming={isStreaming}
                        />
                      </div>
                    </div>

                    <Separator />

                    {/* Actions */}
                    <div className="space-y-2">
                      <Button 
                        size="sm"
                        variant="outline"
                        className="w-full gap-2 border-primary/30 hover:border-primary/50 hover:bg-primary/10 transition-all"
                      >
                        <Download className="w-4 h-4" />
                        <span className="text-sm font-semibold">Export</span>
                      </Button>
                      <Link to="/" className="block">
                        <Button 
                          size="sm"
                          variant="ghost"
                          className="w-full gap-2 hover:bg-muted transition-all"
                        >
                          <Home className="w-4 h-4" />
                          <span className="text-sm font-semibold">Home</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}

            {/* Desktop View Mode Toggle */}
            {isDesktop && (
              <>
                {/* File count badge */}
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 text-xs font-medium text-muted-foreground">
                  <Layers className="w-3 h-3" />
                  <span>{files.length} {files.length === 1 ? 'file' : 'files'}</span>
                </div>

                {/* View mode toggle */}
                <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-xl">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewMode("code")}
                    className={cn(
                      "gap-2 transition-all duration-200 h-8",
                      viewMode === "code" 
                        ? "bg-primary text-primary-foreground shadow-glow hover:bg-primary/90" 
                        : "hover:bg-muted"
                    )}
                  >
                    <Code className="w-4 h-4" />
                    <span className="hidden sm:inline text-xs font-semibold">Code</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewMode("split")}
                    className={cn(
                      "gap-2 transition-all duration-200 h-8",
                      viewMode === "split" 
                        ? "bg-primary text-primary-foreground shadow-glow hover:bg-primary/90" 
                        : "hover:bg-muted"
                    )}
                  >
                    <Code2 className="w-4 h-4" />
                    <span className="hidden sm:inline text-xs font-semibold">Split</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewMode("preview")}
                    className={cn(
                      "gap-2 transition-all duration-200 h-8",
                      viewMode === "preview" 
                        ? "bg-primary text-primary-foreground shadow-glow hover:bg-primary/90" 
                        : "hover:bg-muted"
                    )}
                  >
                    <Eye className="w-4 h-4" />
                    <span className="hidden sm:inline text-xs font-semibold">Preview</span>
                  </Button>
                </div>

                {/* Export Button */}
                <Button 
                  size="sm"
                  variant="outline"
                  className="gap-2 border-primary/30 hover:border-primary/50 hover:bg-primary/10 transition-all h-8"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden md:inline text-xs font-semibold">Export</span>
                </Button>

                {/* Home Button */}
                <Link to="/">
                  <Button 
                    size="sm"
                    variant="ghost"
                    className="gap-2 hover:bg-muted transition-all h-8"
                  >
                    <Home className="w-4 h-4" />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content with enhanced spacing */}
      <div className="flex-1 overflow-hidden">
        {isMobileOrTablet ? (
          /* Mobile/Tablet Layout: Switch between Chat and Preview */
          <div className="h-full flex flex-col relative">
            {/* AI Chat View */}
            <div
              className={cn(
                "absolute inset-0 transition-all duration-300 ease-in-out",
                mobileView === "chat" 
                  ? "opacity-100 translate-x-0 z-10" 
                  : "opacity-0 -translate-x-full pointer-events-none z-0"
              )}
            >
              <div className="h-full p-3 bg-background">
                <div className="h-full rounded-xl overflow-hidden">
                  <AiChat 
                    onCodeGenerated={handleCodeGenerated}
                    onGeneratingStart={handleGeneratingStart}
                    onGeneratingEnd={handleGeneratingEnd}
                  />
                </div>
              </div>
            </div>

            {/* Preview View */}
            <div
              className={cn(
                "absolute inset-0 transition-all duration-300 ease-in-out",
                mobileView === "preview" 
                  ? "opacity-100 translate-x-0 z-10" 
                  : "opacity-0 translate-x-full pointer-events-none z-0"
              )}
            >
              <div className="h-full p-3 bg-background">
                <div className="h-full rounded-xl overflow-hidden">
                  <PreviewPanel 
                    htmlContent={getPreviewContent()}
                    isGenerating={isGenerating}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Desktop Layout: Full layout with all panels */
          <ResizablePanelGroup direction="horizontal" className="h-full">
            {/* Left Panel - AI Chat */}
            <ResizablePanel defaultSize={25} minSize={20} maxSize={40} className="relative">
              <div className="h-full p-3 bg-background">
                <div className="h-full rounded-xl overflow-hidden">
                  <AiChat 
                    onCodeGenerated={handleCodeGenerated}
                    onGeneratingStart={handleGeneratingStart}
                    onGeneratingEnd={handleGeneratingEnd}
                  />
                </div>
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle className="hover:bg-primary/20 transition-colors" />

            {/* Dynamic Content Area */}
            {viewMode === "split" && (
              <>
                {/* Middle Panel - Code Editor */}
                <ResizablePanel defaultSize={40} minSize={30} className="relative">
                  <div className="h-full p-3 bg-background">
                    <div className="h-full rounded-xl overflow-hidden">
                      <CodeEditor
                        files={files}
                        activeFile={activeFile}
                        onFileChange={setActiveFile}
                        isStreaming={isStreaming}
                      />
                    </div>
                  </div>
                </ResizablePanel>

                <ResizableHandle withHandle className="hover:bg-primary/20 transition-colors" />

                {/* Right Panel - Preview */}
                <ResizablePanel defaultSize={35} minSize={30} className="relative">
                  <div className="h-full p-3 bg-background">
                    <div className="h-full rounded-xl overflow-hidden">
                      <PreviewPanel 
                        htmlContent={getPreviewContent()}
                        isGenerating={isGenerating}
                      />
                    </div>
                  </div>
                </ResizablePanel>
              </>
            )}

            {viewMode === "code" && (
              <ResizablePanel defaultSize={75} minSize={50} className="relative">
                <div className="h-full p-3 bg-background">
                  <div className="h-full rounded-xl overflow-hidden">
                    <CodeEditor
                      files={files}
                      activeFile={activeFile}
                      onFileChange={setActiveFile}
                      isStreaming={isStreaming}
                    />
                  </div>
                </div>
              </ResizablePanel>
            )}

            {viewMode === "preview" && (
              <ResizablePanel defaultSize={75} minSize={50} className="relative">
                <div className="h-full p-3 bg-background">
                  <div className="h-full rounded-xl overflow-hidden">
                    <PreviewPanel 
                      htmlContent={getPreviewContent()}
                      isGenerating={isGenerating}
                    />
                  </div>
                </div>
              </ResizablePanel>
            )}
          </ResizablePanelGroup>
        )}
      </div>

      {/* Status Bar - Bottom */}
      <footer className="h-8 px-6 flex items-center justify-between border-t border-border/50 glass-morphism text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-primary" />
            <span>Ready</span>
          </div>
          <div className="hidden md:block">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-muted text-foreground font-mono text-[10px]">Cmd+K</kbd> for shortcuts</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span>{files.length} files</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">UTF-8</span>
        </div>
      </footer>
    </div>
  );
};

export default Builder;
