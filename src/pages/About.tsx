import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Code2, Target, Users, Zap } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              About AI Website Builder
            </h1>
            <p className="text-xl text-muted-foreground">
              Making web development accessible to everyone through AI
            </p>
          </div>

          {/* Mission */}
          <Card className="p-8 mb-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Target className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We believe that everyone should have the ability to bring their ideas to life on the web, 
                  regardless of their technical background. Our mission is to democratize web development by 
                  combining the power of artificial intelligence with intuitive design tools, making website 
                  creation accessible, fast, and enjoyable for everyone.
                </p>
              </div>
            </div>
          </Card>

          {/* Story */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                AI Website Builder was born from a simple observation: while AI technology has made incredible 
                advances, creating websites still requires significant technical knowledge and time investment.
              </p>
              <p>
                We set out to change that by building a platform that leverages cutting-edge AI to understand 
                natural language descriptions and transform them into production-ready code. What used to take 
                hours or days can now be accomplished in minutes.
              </p>
              <p>
                Today, we're proud to serve thousands of users worldwide—from entrepreneurs launching their 
                first business website to designers prototyping new concepts, to developers looking to speed 
                up their workflow.
              </p>
            </div>
          </div>

          {/* Values */}
          <h2 className="text-3xl font-bold text-foreground mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 bg-card border-border">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                <Code2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Quality</h3>
              <p className="text-muted-foreground text-sm">
                We generate clean, semantic, production-ready code that follows industry best practices.
              </p>
            </Card>

            <Card className="p-6 bg-card border-border">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Accessibility</h3>
              <p className="text-muted-foreground text-sm">
                Making web development accessible to everyone, regardless of their technical expertise.
              </p>
            </Card>

            <Card className="p-6 bg-card border-border">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Innovation</h3>
              <p className="text-muted-foreground text-sm">
                Constantly pushing the boundaries of what's possible with AI-assisted development.
              </p>
            </Card>
          </div>

          {/* Technology */}
          <Card className="p-8 bg-card border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4">Powered by Advanced AI</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our platform uses state-of-the-art language models to understand your requirements and 
              generate high-quality code. We've trained our system on millions of websites and best 
              practices to ensure every generation meets professional standards.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              With real-time preview, responsive design support, and intelligent code organization, 
              we provide everything you need to go from idea to deployment in record time.
            </p>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
