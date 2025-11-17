import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { 
  Code2, 
  Zap, 
  Eye, 
  Sparkles, 
  Palette, 
  Layers,
  Download,
  Smartphone,
  RefreshCw,
  Shield
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "AI-Powered Code Generation",
      description: "Advanced AI understands your requirements and generates production-ready HTML, CSS, and JavaScript code instantly. No more starting from scratch.",
      details: [
        "Natural language to code conversion",
        "Context-aware generation",
        "Best practices built-in",
        "Semantic HTML structure"
      ]
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Real-Time Live Preview",
      description: "See your website come to life as code is generated. Switch between desktop, tablet, and mobile views instantly.",
      details: [
        "Instant preview updates",
        "Multiple device sizes",
        "Interactive testing",
        "Responsive design validation"
      ]
    },
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "Multi-File Code Editor",
      description: "View and organize your code across HTML, CSS, and JavaScript files with syntax highlighting and proper structure.",
      details: [
        "Tabbed file interface",
        "Syntax highlighting",
        "Clean code organization",
        "Easy file navigation"
      ]
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Generate complete websites in seconds. No waiting, no delays. Just instant results that you can iterate on immediately.",
      details: [
        "Sub-second generation",
        "Instant preview updates",
        "Quick iterations",
        "No loading screens"
      ]
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Beautiful Design",
      description: "Modern, aesthetically pleasing designs that follow current web design trends and best practices.",
      details: [
        "Modern UI/UX patterns",
        "Professional color schemes",
        "Smooth animations",
        "Consistent styling"
      ]
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Component-Based",
      description: "Code is organized into reusable components and sections, making it easy to understand and modify.",
      details: [
        "Modular structure",
        "Reusable components",
        "Clear separation",
        "Easy maintenance"
      ]
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Export Ready",
      description: "Export your complete website with all files organized and ready to deploy anywhere you want.",
      details: [
        "Clean file structure",
        "Production-ready code",
        "No dependencies",
        "Deploy anywhere"
      ]
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile-First Responsive",
      description: "Every website is built with mobile-first principles, ensuring perfect display on all devices.",
      details: [
        "Mobile-first approach",
        "Flexible layouts",
        "Touch-friendly",
        "Cross-browser compatible"
      ]
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: "Unlimited Iterations",
      description: "Not happy with the result? Simply describe changes and watch AI update the code instantly.",
      details: [
        "Conversational updates",
        "Incremental changes",
        "No limits",
        "Fast refinements"
      ]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description: "Your code and data are secure. We don't store your generated websites without your permission.",
      details: [
        "Privacy-focused",
        "Secure generation",
        "No data mining",
        "Optional save"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
              Powerful Features for
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Modern Web Development
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to build, preview, and deploy professional websites with AI assistance
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="p-8 bg-card border-border hover:border-primary/40 transition-all hover:shadow-xl duration-300"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 text-primary-foreground">
                    {feature.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {feature.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Features;
