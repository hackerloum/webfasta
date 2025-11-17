import { Card } from "@/components/ui/card";
import { Monitor, Smartphone, Tablet, ExternalLink, RefreshCw, Maximize2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import PreviewCarousel from "./PreviewCarousel";

interface PreviewPanelProps {
  htmlContent: string;
  isGenerating?: boolean;
}

type ViewMode = "desktop" | "tablet" | "mobile";

const PreviewPanel = ({ htmlContent, isGenerating = false }: PreviewPanelProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Check if content is empty or default
  const hasContent = htmlContent && 
    htmlContent.length > 100 && 
    !htmlContent.includes("Ask the AI to create something amazing");

  const getPreviewWidth = () => {
    switch (viewMode) {
      case "mobile":
        return "375px";
      case "tablet":
        return "768px";
      default:
        return "100%";
    }
  };

  const getDeviceLabel = () => {
    switch (viewMode) {
      case "mobile":
        return "iPhone 14 (375px)";
      case "tablet":
        return "iPad (768px)";
      default:
        return "Desktop (100%)";
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleOpenInNewTab = () => {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  return (
    <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="relative border-b border-border/50 glass-morphism-light p-3">
        <div className="flex items-center justify-between">
          {/* Title and Device Info */}
          <div>
            <h3 className="text-sm font-bold text-foreground">Live Preview</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{getDeviceLabel()}</p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Device Toggle */}
            <div className="flex gap-1 p-1 bg-muted/50 rounded-lg">
          <Button
                variant="ghost"
            size="sm"
            onClick={() => setViewMode("desktop")}
                className={cn(
                  "h-8 w-8 p-0 transition-all duration-200",
                  viewMode === "desktop" 
                    ? "bg-primary text-primary-foreground shadow-glow" 
                    : "hover:bg-muted"
                )}
                title="Desktop view"
          >
            <Monitor className="w-4 h-4" />
          </Button>
          <Button
                variant="ghost"
            size="sm"
            onClick={() => setViewMode("tablet")}
                className={cn(
                  "h-8 w-8 p-0 transition-all duration-200",
                  viewMode === "tablet" 
                    ? "bg-primary text-primary-foreground shadow-glow" 
                    : "hover:bg-muted"
                )}
                title="Tablet view"
          >
            <Tablet className="w-4 h-4" />
          </Button>
          <Button
                variant="ghost"
            size="sm"
            onClick={() => setViewMode("mobile")}
                className={cn(
                  "h-8 w-8 p-0 transition-all duration-200",
                  viewMode === "mobile" 
                    ? "bg-primary text-primary-foreground shadow-glow" 
                    : "hover:bg-muted"
                )}
                title="Mobile view"
          >
            <Smartphone className="w-4 h-4" />
          </Button>
            </div>

            {/* Action Buttons */}
            <div className="h-8 w-px bg-border/50" />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              className="h-8 w-8 p-0 hover:bg-primary/10 transition-all"
              title="Refresh preview"
            >
              <RefreshCw className={cn(
                "w-4 h-4",
                isRefreshing && "animate-spin"
              )} />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleOpenInNewTab}
              className="h-8 w-8 p-0 hover:bg-primary/10 transition-all"
              title="Open in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-hidden relative">
        {/* Show carousel when no content or generating */}
        {(!hasContent || isGenerating) ? (
          <PreviewCarousel isGenerating={isGenerating} />
        ) : (
          <div className="h-full bg-muted/30 p-6 overflow-auto flex items-center justify-center relative">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-dots-pattern opacity-30" />

            {/* Device Frame */}
            <div
              className={cn(
                "bg-background rounded-2xl shadow-2xl transition-all duration-500 relative overflow-hidden",
                viewMode === "mobile" && "ring-8 ring-background/50",
                viewMode === "tablet" && "ring-4 ring-background/50"
              )}
              style={{ 
                width: getPreviewWidth(), 
                height: viewMode === "desktop" ? "100%" : "90%",
                maxHeight: viewMode === "desktop" ? "100%" : "800px"
              }}
        >
              {/* Device notch for mobile */}
              {viewMode === "mobile" && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-background rounded-b-2xl z-10 border-x border-b border-border/50" />
              )}

              {/* Loading Bar */}
              {isRefreshing && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-gradient z-20" />
              )}

              {/* Iframe */}
          <iframe
                key={isRefreshing ? Date.now() : "preview"}
            srcDoc={htmlContent}
                className={cn(
                  "w-full h-full border-0",
                  viewMode === "mobile" ? "rounded-2xl pt-6" : "rounded-2xl"
                )}
            title="preview"
                sandbox="allow-scripts allow-same-origin"
          />
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="border-t border-border/50 px-4 py-2 glass-morphism-light flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>Live</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono">{viewMode === "desktop" ? "Responsive" : getPreviewWidth()}</span>
        </div>
      </div>
    </Card>
  );
};

export default PreviewPanel;
