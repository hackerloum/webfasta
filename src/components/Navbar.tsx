import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code2, Menu, X, Sparkles, LogOut, User, CreditCard } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import AuthDialog from "./AuthDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const { user, signOut, subscriptionPlan } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Features", path: "/features" },
    { name: "Pricing", path: "/pricing" },
    { name: "About", path: "/about" },
    { name: "Privacy", path: "/privacy" },
    { name: "Terms", path: "/terms" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "glass-morphism shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group relative z-50">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-xl blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300" />
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Code2 className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold">
                <span className="text-gradient">AI</span>
                <span className="text-foreground"> Builder</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button 
                    variant="ghost"
                    className="transition-all duration-200 hover:scale-105"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
            <Link to="/builder">
                  <Button 
                    variant="ghost"
                    className="transition-all duration-200 hover:scale-105"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Builder
              </Button>
            </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="gap-2">
                      <User className="w-4 h-4" />
                      <span className="hidden sm:inline">{user.email?.split("@")[0]}</span>
                      {subscriptionPlan && (
                        <span className="hidden sm:inline px-2 py-0.5 rounded-full text-xs bg-primary/20 text-primary">
                          {subscriptionPlan}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user.email}</p>
                        {subscriptionPlan && (
                          <p className="text-xs text-muted-foreground">Plan: {subscriptionPlan}</p>
                        )}
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/pricing")}>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Manage Plan
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut} className="text-destructive">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost"
                  onClick={() => {
                    setAuthMode("signin");
                    setAuthDialogOpen(true);
                  }}
                  className="transition-all duration-200 hover:scale-105"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => {
                    setAuthMode("signup");
                    setAuthDialogOpen(true);
                  }}
                  className="relative bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-200 hover:scale-105 hover:shadow-glow-hover active:scale-95"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors relative z-50 rounded-lg hover:bg-white/5"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 transition-transform duration-300 rotate-90" />
            ) : (
              <Menu className="w-6 h-6 transition-transform duration-300" />
            )}
          </button>
        </div>
        </div>

      {/* Mobile Menu Overlay */}
        {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm md:hidden animate-fade-in"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-card/95 backdrop-blur-xl border-l border-border md:hidden animate-slide-in-bottom shadow-2xl">
            <div className="flex flex-col h-full p-8 pt-24">
              <div className="flex flex-col gap-6 flex-1">
                {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                    className="text-2xl font-semibold text-muted-foreground hover:text-foreground transition-all hover:translate-x-2 animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                >
                  {link.name}
                </Link>
              ))}
              </div>
              
              <div className="space-y-4 pt-8 border-t border-border">
                {user ? (
                  <>
              <Link to="/builder" onClick={() => setIsOpen(false)}>
                      <Button 
                        className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-200 hover:scale-105 hover:shadow-glow-hover h-12 text-base"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Open Builder
                </Button>
              </Link>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        signOut();
                        setIsOpen(false);
                      }}
                      className="w-full h-12 text-base"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      onClick={() => {
                        setAuthMode("signup");
                        setAuthDialogOpen(true);
                        setIsOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-200 hover:scale-105 hover:shadow-glow-hover h-12 text-base"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Get Started
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setAuthMode("signin");
                        setAuthDialogOpen(true);
                        setIsOpen(false);
                      }}
                      className="w-full h-12 text-base"
                    >
                      Sign In
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      No credit card required • Free forever
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
        )}
      
      <AuthDialog 
        open={authDialogOpen} 
        onOpenChange={setAuthDialogOpen}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </nav>
  );
};

export default Navbar;
