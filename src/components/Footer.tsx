import { Link } from "react-router-dom";
import { Code2, Github, Twitter, Linkedin, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="relative bg-card/30 backdrop-blur-sm border-t border-border/50 overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 group mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-xl blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300" />
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
                <Code2 className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-black">
                  <span className="text-gradient">AI</span>
                  <span className="text-foreground"> Builder</span>
                </div>
            </div>
            </Link>
            
            <p className="text-base text-muted-foreground max-w-md mb-6 leading-relaxed">
              Build beautiful websites with the power of AI. From landing pages to full applications,
              create production-ready code in minutes—no coding experience required.
            </p>
            
            {/* Newsletter */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-foreground mb-3">
                Stay updated with our latest features
              </p>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                />
                <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all hover:scale-105">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 rounded-xl bg-muted/50 hover:bg-primary/20 flex items-center justify-center text-muted-foreground hover:text-primary transition-all hover:scale-110 hover:-translate-y-1"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-xl bg-muted/50 hover:bg-primary/20 flex items-center justify-center text-muted-foreground hover:text-primary transition-all hover:scale-110 hover:-translate-y-1"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-xl bg-muted/50 hover:bg-primary/20 flex items-center justify-center text-muted-foreground hover:text-primary transition-all hover:scale-110 hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h3 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/features" 
                  className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all inline-block"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all inline-block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/builder" 
                  className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all inline-block"
                >
                  Start Building
                </Link>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all inline-block"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all inline-block"
                >
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/privacy" 
                  className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all inline-block"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all inline-block"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all inline-block"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all inline-block"
                >
                  Licenses
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} AI Website Builder. All rights reserved.
          </p>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            <span>by developers, for developers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
