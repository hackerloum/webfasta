import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles, Lightbulb, Zap, Code2, Palette, Smartphone, Rocket, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface CarouselSlide {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

const slides: CarouselSlide[] = [
  {
    icon: <Sparkles className="w-12 h-12" />,
    title: "AI-Powered Generation",
    description: "Describe your vision and watch as Claude 3.5 Sonnet creates beautiful, production-ready code in seconds.",
    gradient: "from-primary to-accent",
  },
  {
    icon: <Code2 className="w-12 h-12" />,
    title: "Clean Code Output",
    description: "Get semantic HTML5, modern CSS3, and vanilla JavaScript that's easy to understand and modify.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: <Palette className="w-12 h-12" />,
    title: "Beautiful by Default",
    description: "Every generated website features modern design patterns, smooth animations, and professional styling.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: <Smartphone className="w-12 h-12" />,
    title: "Mobile-First Responsive",
    description: "All websites are automatically responsive and optimized for mobile, tablet, and desktop devices.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: <Zap className="w-12 h-12" />,
    title: "Instant Preview",
    description: "See your changes in real-time with our live preview panel. Switch between desktop, tablet, and mobile views.",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: <Rocket className="w-12 h-12" />,
    title: "Export Ready",
    description: "Download your complete website with all files organized and ready to deploy anywhere.",
    gradient: "from-red-500 to-pink-500",
  },
  {
    icon: <Shield className="w-12 h-12" />,
    title: "Safe & Secure",
    description: "All generated code runs in a sandboxed environment. Your data stays private and secure.",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: <Lightbulb className="w-12 h-12" />,
    title: "Pro Tips",
    description: "Be specific in your prompts. Mention colors, layouts, sections, and features you want to include.",
    gradient: "from-amber-500 to-yellow-500",
  },
];

interface PreviewCarouselProps {
  isGenerating?: boolean;
}

const PreviewCarousel = ({ isGenerating = false }: PreviewCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [autoPlay]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setAutoPlay(false);
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setAutoPlay(true), 10000);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-background via-background-elevated to-background relative overflow-hidden">
      {/* Animated background patterns */}
      <div className="absolute inset-0 bg-dots-pattern opacity-20" />
      <div className="absolute inset-0 bg-mesh-gradient" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "0s" }} />
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      {/* Content */}
      <div className="relative z-10 max-w-2xl w-full">
        {/* Generating indicator */}
        {isGenerating && (
          <div className="mb-8 flex items-center justify-center gap-3 text-primary animate-pulse">
            <Sparkles className="w-5 h-5 animate-spin" />
            <span className="text-sm font-semibold">AI is generating your website...</span>
          </div>
        )}

        {/* Main slide */}
        <div className="text-center animate-fade-in" key={currentSlide}>
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className={cn(
              "relative w-24 h-24 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-2xl animate-scale-in",
              slide.gradient
            )}>
              <div className="absolute inset-0 bg-gradient-to-br rounded-2xl blur-xl opacity-50" 
                style={{
                  backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`
                }}
              />
              <div className="relative text-white">
                {slide.icon}
              </div>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-3xl font-bold text-foreground mb-4 animate-slide-in-bottom">
            {slide.title}
          </h3>

          {/* Description */}
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto animate-slide-in-bottom" style={{ animationDelay: "100ms" }}>
            {slide.description}
          </p>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex items-center justify-center gap-4">
          {/* Previous button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="h-10 w-10 rounded-full hover:bg-primary/10 transition-all hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          {/* Dots */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === currentSlide
                    ? "w-8 bg-primary shadow-glow"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Next button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="h-10 w-10 rounded-full hover:bg-primary/10 transition-all hover:scale-110"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Counter */}
        <div className="mt-6 text-center text-xs text-muted-foreground">
          {currentSlide + 1} / {slides.length}
        </div>

        {/* Call to action */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20">
            <Lightbulb className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              Start by describing your website in the AI chat
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewCarousel;

