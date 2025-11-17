import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Code2, 
  Zap, 
  Eye, 
  Sparkles, 
  Palette, 
  Layers, 
  ArrowRight,
  CheckCircle2,
  Rocket,
  Globe,
  Shield,
  TrendingUp,
  Users,
  Clock,
  FileCode,
  Play,
  Star,
  ChevronDown,
  Terminal,
  Layout,
  Wand2
} from "lucide-react";

const Landing = () => {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Generation",
      description: "Describe your vision and watch AI create production-ready HTML, CSS, and JavaScript instantly.",
      gradient: "from-purple-500/20 to-pink-500/20",
      delay: "0ms"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Live Preview",
      description: "See your website come to life in real-time with responsive preview across all devices.",
      gradient: "from-blue-500/20 to-cyan-500/20",
      delay: "100ms"
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Clean Code",
      description: "Get semantic, well-structured code that follows modern web development best practices.",
      gradient: "from-green-500/20 to-emerald-500/20",
      delay: "200ms"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Generate complete websites in seconds, not hours. Deploy instantly with one click.",
      gradient: "from-yellow-500/20 to-orange-500/20",
      delay: "300ms"
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Beautiful Design",
      description: "Modern, responsive designs that look stunning on every screen size and device.",
      gradient: "from-pink-500/20 to-rose-500/20",
      delay: "400ms"
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: "Multi-File Support",
      description: "Organized code structure with separate HTML, CSS, and JavaScript files.",
      gradient: "from-indigo-500/20 to-purple-500/20",
      delay: "500ms"
    }
  ];

  const stats = [
    { value: "10K+", label: "Websites Created", icon: <Globe className="w-5 h-5" /> },
    { value: "5K+", label: "Active Users", icon: <Users className="w-5 h-5" /> },
    { value: "99%", label: "Satisfaction Rate", icon: <TrendingUp className="w-5 h-5" /> },
    { value: "<30s", label: "Average Build Time", icon: <Clock className="w-5 h-5" /> }
  ];

  const steps = [
    {
      number: "01",
      title: "Describe Your Vision",
      description: "Simply tell our AI what you want to build. Be as detailed or as simple as you like.",
      icon: <FileCode className="w-8 h-8" />
    },
    {
      number: "02",
      title: "AI Generates Code",
      description: "Watch as our advanced AI creates clean, production-ready code in seconds.",
      icon: <Wand2 className="w-8 h-8" />
    },
    {
      number: "03",
      title: "Preview & Deploy",
      description: "See your website live, make adjustments, and deploy with a single click.",
      icon: <Rocket className="w-8 h-8" />
    }
  ];

  const benefits = [
    "No coding experience required",
    "Export clean, production-ready code",
    "Responsive by default",
    "SEO-optimized output",
    "Instant deployment",
    "Unlimited iterations"
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section - Full viewport with mesh gradient */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated mesh gradient background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-primary/20 rounded-full blur-[120px] animate-float" />
          <div className="absolute top-1/3 right-1/4 w-[800px] h-[800px] bg-accent/15 rounded-full blur-[100px] animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[80px] animate-float" style={{ animationDelay: "4s" }} />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="text-center">
            {/* Badge with shimmer effect */}
            <div 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-morphism-light mb-8 hover:scale-105 transition-transform cursor-pointer animate-fade-in border border-primary/20"
            >
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-semibold text-primary">AI-Powered Website Builder</span>
              <span className="px-2 py-0.5 rounded-full bg-primary/20 text-xs font-bold text-primary">NEW</span>
            </div>
            
            {/* Main Heading - Massive with gradient */}
            <h1 
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-foreground mb-8 leading-[1.05] tracking-tighter animate-fade-in"
              style={{ animationDelay: "100ms" }}
            >
              Build Websites
              <br />
              <span className="relative inline-block mt-2">
                <span className="text-gradient bg-[length:200%_auto] animate-gradient">
                  with AI Magic
                </span>
                <span className="absolute -bottom-4 left-0 right-0 h-4 bg-gradient-to-r from-primary/40 via-accent/40 to-primary/40 blur-2xl" />
              </span>
            </h1>
            
            {/* Subheading */}
            <p 
              className="text-xl sm:text-2xl md:text-3xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed animate-fade-in"
              style={{ animationDelay: "200ms" }}
            >
              Transform your ideas into production-ready websites in{" "}
              <span className="text-foreground font-bold relative">
                seconds
                <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-accent" />
              </span>
              .{" "}
              <span className="text-foreground font-semibold">No coding required.</span>
            </p>
            
            {/* CTA Buttons */}
            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in"
              style={{ animationDelay: "300ms" }}
            >
              <Link to="/pricing">
                <Button 
                  size="lg" 
                  className="group relative bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-lg px-10 py-7 h-auto rounded-2xl shadow-2xl shadow-primary/30 hover:shadow-glow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <span className="relative z-10 flex items-center gap-2 font-bold">
                  Start Building Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 blur-2xl transition-opacity" />
                </Button>
              </Link>
              <Link to="/features">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="group text-lg px-10 py-7 h-auto rounded-2xl border-2 border-primary/30 hover:border-primary/60 glass-morphism-light hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                >
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Watch Demo</span>
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div 
              className="flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-muted-foreground animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <span className="group-hover:text-foreground transition-colors">No Credit Card</span>
              </div>
              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Zap className="w-4 h-4 text-accent" />
                </div>
                <span className="group-hover:text-foreground transition-colors">Instant Setup</span>
              </div>
              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </div>
                <span className="group-hover:text-foreground transition-colors">Free Forever</span>
              </div>
            </div>
          </div>

          {/* Hero Visual - Enhanced with mock interface */}
          <div 
            className="mt-24 animate-slide-up max-w-6xl mx-auto"
            style={{ animationDelay: "500ms" }}
          >
            <Card className="group relative p-1.5 bg-gradient-to-br from-primary/30 via-accent/30 to-primary/30 border-0 shadow-2xl overflow-hidden hover:shadow-glow-lg transition-all duration-500">
              {/* Animated gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow" />
              
              <div className="relative bg-code-bg rounded-2xl overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  {/* Browser chrome mockup */}
                  <div className="absolute top-0 left-0 right-0 h-10 glass-morphism-light flex items-center gap-2 px-4 z-10 border-b border-border/50">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors cursor-pointer" />
                    </div>
                    <div className="flex-1 mx-4 h-6 bg-background/50 rounded-lg flex items-center px-3">
                      <Terminal className="w-3 h-3 text-muted-foreground mr-2" />
                      <span className="text-xs text-muted-foreground">ai-website-studio.app</span>
                    </div>
                  </div>

                  {/* Real Image or Placeholder */}
                  <img 
                    src="/hero-preview.png" 
                    alt="AI Website Builder Interface - Split screen showing AI chat, code editor, and live preview"
                    className="w-full h-full object-cover object-top pt-10"
                    onError={(e) => {
                      // Fallback to beautiful gradient placeholder
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      target.nextElementSibling?.classList.remove("hidden");
                    }}
                  />
                  
                  {/* Fallback gradient placeholder */}
                  <div className="hidden w-full h-full bg-gradient-to-br from-card via-card/80 to-card flex items-center justify-center relative pt-10">
                    <div className="absolute inset-0 bg-dots-pattern opacity-20" />
                    <div className="relative z-10 text-center p-12">
                      <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-accent mb-8 shadow-2xl shadow-primary/30 animate-float">
                        <Layout className="w-12 h-12 text-primary-foreground" />
                      </div>
                      <p className="text-muted-foreground text-xl font-semibold mb-2">
                        Professional Builder Interface
                      </p>
                      <p className="text-sm text-muted-foreground/70">
                        AI Chat • Code Editor • Live Preview
                  </p>
                    </div>
                  </div>

                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </Card>
          </div>

          {/* Scroll Indicator */}
          <div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-subtle cursor-pointer"
            style={{ animationDelay: "600ms" }}
          >
            <span className="text-xs text-muted-foreground font-medium">Scroll to explore</span>
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* Stats Section with hover effects */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10 border-y border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots-pattern opacity-10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center group cursor-pointer animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-glow">
                  <div className="text-primary group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl sm:text-5xl font-black text-foreground mb-3 text-gradient group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-scale-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Powerful Features</span>
            </div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-foreground mb-8 animate-fade-in">
              Everything You Need
              <br />
              <span className="text-gradient">to Build Amazing</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "100ms" }}>
              Powerful features designed to make website building effortless, enjoyable, and incredibly fast
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group relative p-10 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-card-hover hover:-translate-y-2 overflow-hidden cursor-pointer animate-scale-in"
                style={{ animationDelay: feature.delay }}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-3xl blur-xl opacity-0 group-hover:opacity-75 transition-opacity duration-500" />
                    <div className="relative w-16 h-16 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  {feature.icon}
                </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                  {feature.description}
                </p>

                  {/* Learn more link */}
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Corner decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-muted/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6 animate-scale-in">
              <Rocket className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold text-accent">Simple Process</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-black text-foreground mb-8 animate-fade-in">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "100ms" }}>
              Three simple steps to transform your ideas into reality
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting lines - hidden on mobile */}
            <div className="hidden md:block absolute top-20 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-primary via-accent to-primary opacity-30" />
            
            {steps.map((step, index) => (
              <div key={index} className="relative animate-slide-in-bottom" style={{ animationDelay: `${index * 150}ms` }}>
                <Card className="relative p-10 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl h-full group overflow-hidden">
                  {/* Gradient glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    {/* Step number background */}
                    <div className="absolute -top-6 -right-6 text-[120px] font-black text-muted-foreground/5 leading-none group-hover:text-primary/10 transition-colors duration-500">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className="relative mb-8">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground shadow-xl group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                        {step.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - Split Layout */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left Column - Text Content */}
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-8">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-sm font-semibold text-green-500">Why Choose Us</span>
              </div>
              
              <h2 className="text-5xl sm:text-6xl font-black text-foreground mb-8 leading-tight">
                Build Professional
                <br />
                <span className="text-gradient">Without Limits</span>
              </h2>
              
              <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                We combine the power of AI with intuitive design tools to give you 
                the fastest, most efficient way to create professional websites.
              </p>
              
              {/* Benefits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-4 group cursor-pointer p-4 rounded-2xl hover:bg-primary/5 transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mt-0.5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-glow">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground font-semibold group-hover:text-primary transition-colors flex-1">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Visual Card */}
            <div className="animate-scale-in" style={{ animationDelay: "200ms" }}>
              <Card className="relative p-12 bg-gradient-to-br from-card/90 via-card/70 to-muted/50 backdrop-blur-xl border-primary/30 shadow-2xl overflow-hidden group">
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Floating orbs */}
                <div className="absolute top-10 right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-10 left-10 w-40 h-40 bg-accent/15 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
                
                <div className="relative z-10 space-y-10">
                  {steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-6 group/item">
                      {/* Number Circle */}
                      <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/40 rounded-full blur-xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-500" />
                        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border-2 border-primary/40 group-hover/item:scale-110 group-hover/item:border-primary/60 transition-all duration-500 shadow-xl">
                          <span className="text-3xl font-black text-gradient">{index + 1}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 pt-3">
                        <h4 className="font-bold text-foreground mb-2 text-xl group-hover/item:text-primary transition-colors duration-300">
                          {step.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Decorative corner */}
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-primary/10 via-transparent to-transparent rounded-tl-[100px]" />
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-muted/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots-pattern opacity-10" />
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-scale-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Simple Pricing</span>
            </div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-foreground mb-8 animate-fade-in">
              Choose Your
              <br />
              <span className="text-gradient">Perfect Plan</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "100ms" }}>
              Bei nafuu kwa Watanzania. Anza na 3,000 TSH/mwezi. Lipa kwa M-Pesa, Airtel Money, au Tigo Pesa.
              <br className="hidden sm:block" />
              <span className="text-foreground font-semibold">Affordable prices for Tanzanians. Start at 3,000 TSH/month. Pay with mobile money.</span>
            </p>
                  </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <Card className="relative p-10 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-card-hover hover:-translate-y-2 overflow-hidden group animate-scale-in">
              <div className="relative z-10">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Starter</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-black text-foreground">3,000</span>
                    <span className="text-muted-foreground text-lg">TSH</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Perfect for small businesses</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {[
                    "AI website generation",
                    "Basic templates",
                    "Website setup assistance",
                    "Email support (Swahili/English)",
                    "Mobile-friendly design",
                    "3 active websites",
                    "Basic training included"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/pricing" className="block">
                  <Button 
                    variant="outline" 
                    className="w-full group/btn border-2 border-primary/30 hover:border-primary/60 hover:bg-primary/10 transition-all duration-300"
                  >
                    Anza Sasa (Start Now)
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Pro Plan - Featured */}
            <Card className="relative p-10 bg-gradient-to-br from-card via-card/90 to-card border-2 border-primary/50 hover:border-primary shadow-2xl shadow-primary/20 hover:shadow-glow-lg transition-all duration-500 hover:-translate-y-2 overflow-hidden group animate-scale-in scale-105 md:scale-100" style={{ animationDelay: "100ms" }}>
              {/* Popular Badge */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-primary to-accent text-xs font-bold text-primary-foreground shadow-lg">
                  MOST POPULAR
                </div>
                  </div>

              {/* Gradient glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Pro</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-black text-foreground">10,000</span>
                    <span className="text-muted-foreground text-lg">TSH</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground">For growing businesses</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {[
                    "Everything in Starter",
                    "Premium templates",
                    "Priority support (24h response)",
                    "Unlimited websites",
                    "Custom domain support",
                    "Advanced analytics",
                    "1-on-1 training sessions",
                    "WhatsApp support (Swahili/English)",
                    "SEO optimization included"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/pricing" className="block">
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-lg font-bold shadow-lg hover:shadow-glow transition-all duration-300 hover:scale-105"
                  >
                    Anza Pro (Start Pro)
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                  </div>
            </Card>

            {/* Business Plan */}
            <Card className="relative p-10 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-card-hover hover:-translate-y-2 overflow-hidden group animate-scale-in" style={{ animationDelay: "200ms" }}>
              <div className="relative z-10">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Business</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-black text-foreground">25,000</span>
                    <span className="text-muted-foreground text-lg">TSH</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground">For established businesses</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {[
                    "Everything in Pro",
                    "Dedicated account manager",
                    "Phone & WhatsApp support",
                    "Custom website design",
                    "Team training (up to 5 people)",
                    "E-commerce features",
                    "Payment gateway integration",
                    "Monthly strategy sessions",
                    "Priority feature requests"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/pricing" className="block">
                  <Button 
                    variant="outline" 
                    className="w-full group/btn border-2 border-primary/30 hover:border-primary/60 hover:bg-primary/10 transition-all duration-300"
                  >
                    Wasiliana Nasi (Contact Us)
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>

          {/* FAQ Link */}
          <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <p className="text-muted-foreground mb-4">
              Bei nafuu kwa Watanzania. Tunaweza kulipa kwa M-Pesa, Airtel Money, au Tigo Pesa.
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Affordable prices for Tanzanians. Pay with M-Pesa, Airtel Money, or Tigo Pesa.
            </p>
            <Link to="/pricing" className="text-primary hover:text-accent font-semibold transition-colors inline-flex items-center gap-2">
              Angalia bei zaidi (View detailed pricing)
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section - Full width with gradient */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-accent/15 to-primary/15" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        
        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: "2s" }} />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-morphism-light mb-10 border border-primary/30 animate-scale-in">
            <Rocket className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Ready to Get Started?</span>
          </div>
          
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-foreground mb-8 leading-tight animate-fade-in">
            Build Something
            <br />
            <span className="text-gradient bg-[length:200%_auto] animate-gradient">
              Amazing Today
            </span>
          </h2>
          
          <p className="text-xl sm:text-2xl text-muted-foreground mb-14 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: "100ms" }}>
            Join thousands of creators building beautiful websites with AI. 
            <br className="hidden sm:block" />
            Start your journey today—it's <span className="text-foreground font-bold">completely free</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in" style={{ animationDelay: "200ms" }}>
            <Link to="/pricing">
              <Button 
                size="lg"
                className="group relative bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-xl px-12 py-8 h-auto rounded-2xl shadow-2xl shadow-primary/40 hover:shadow-glow-lg transition-all duration-300 hover:scale-110 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-3 font-bold">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                  Start Building Now
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </span>
                <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 blur-3xl transition-opacity" />
              </Button>
            </Link>
            
            <Link to="/features">
            <Button 
              size="lg" 
                variant="outline"
                className="group text-xl px-12 py-8 h-auto rounded-2xl border-2 border-primary/40 hover:border-primary/70 glass-morphism-light hover:bg-primary/10 transition-all duration-300 hover:scale-105"
            >
                <span className="font-semibold">Learn More</span>
            </Button>
          </Link>
          </div>

          {/* Social proof */}
          <div className="mt-16 flex items-center justify-center gap-3 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background flex items-center justify-center text-xs font-bold text-primary-foreground">
                  {i === 1 ? '👤' : ''}
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Loved by <span className="font-semibold text-foreground">5,000+</span> developers
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
