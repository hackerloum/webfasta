import { Card } from "@/components/ui/card";
import { Monitor, Smartphone, Tablet, ExternalLink, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
    !htmlContent.includes("Describe a page in the chat.");

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

  const deviceButtonClass = (active: boolean) =>
    cn(
      "h-7 w-7 p-0 rounded-none shadow-none",
      active
        ? "bg-[#146c43] text-[#fbf9f5] hover:bg-[#0e4d30] hover:text-[#fbf9f5]"
        : "text-[#6b645b] hover:bg-[#f4f0e8] hover:text-[#1a1814]"
    );

  return (
    <Card className="h-full bg-[#fbf9f5] text-[#1a1814] border border-[#e4ddd2] shadow-none rounded-none flex flex-col overflow-hidden font-sans">
      <div className="border-b border-[#e4ddd2] px-3 py-2">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-sm font-['Newsreader',serif] text-[#1a1814]">Preview</h3>
            <p className="text-xs text-[#6b645b] truncate">{getDeviceLabel()}</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex border border-[#e4ddd2]">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("desktop")}
                className={deviceButtonClass(viewMode === "desktop")}
                title="Desktop view"
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("tablet")}
                className={deviceButtonClass(viewMode === "tablet")}
                title="Tablet view"
              >
                <Tablet className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("mobile")}
                className={deviceButtonClass(viewMode === "mobile")}
                title="Mobile view"
              >
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>

            <div className="h-5 w-px bg-[#e4ddd2]" />

            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              className="h-7 w-7 p-0 text-[#6b645b] hover:bg-[#f4f0e8] hover:text-[#1a1814] shadow-none"
              title="Refresh preview"
            >
              <RefreshCw className={cn("w-4 h-4", isRefreshing && "animate-spin")} />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleOpenInNewTab}
              className="h-7 w-7 p-0 text-[#6b645b] hover:bg-[#f4f0e8] hover:text-[#1a1814] shadow-none"
              title="Open in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative">
        {(!hasContent || isGenerating) ? (
          <div className="h-full bg-[#f4f0e8] flex items-center justify-center px-6">
            <p className="text-sm text-[#6b645b]">
              {isGenerating ? "Working" : "Preview will appear here."}
            </p>
          </div>
        ) : (
          <div className="h-full bg-[#f4f0e8] p-3 overflow-auto flex items-center justify-center">
            <div
              className="bg-[#fbf9f5] border border-[#e4ddd2] relative overflow-hidden"
              style={{
                width: getPreviewWidth(),
                height: viewMode === "desktop" ? "100%" : "90%",
                maxHeight: viewMode === "desktop" ? "100%" : "800px",
              }}
            >
              {isRefreshing && (
                <div className="absolute top-0 left-0 right-0 h-px bg-[#146c43] z-20" />
              )}

              <iframe
                key={isRefreshing ? Date.now() : "preview"}
                srcDoc={htmlContent}
                className="w-full h-full border-0 bg-white"
                title="preview"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-[#e4ddd2] px-3 py-1.5 flex items-center justify-between text-xs text-[#6b645b]">
        <span>Live</span>
        <span className="font-mono">{viewMode === "desktop" ? "Responsive" : getPreviewWidth()}</span>
      </div>
    </Card>
  );
};

export default PreviewPanel;
