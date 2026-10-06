import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, User, CreditCard } from "lucide-react";
import { useState, useEffect } from "react";
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-paper border-b border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="font-display text-2xl leading-none text-ink">
            Webfasta
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm text-mute hover:text-ink"
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" className="h-9 px-2">
                    <User className="w-4 h-4" />
                    Dashboard
                  </Button>
                </Link>
                <Link to="/builder">
                  <Button variant="ghost" className="h-9 px-2">
                    Builder
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-9 gap-2 px-2">
                      <User className="w-4 h-4" />
                      <span className="hidden sm:inline">{user.email?.split("@")[0]}</span>
                      {subscriptionPlan && (
                        <span className="hidden sm:inline border border-line px-1.5 py-0.5 text-xs text-moss">
                          {subscriptionPlan}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 rounded-sm border-line bg-card shadow-none">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user.email}</p>
                        {subscriptionPlan && (
                          <p className="text-xs text-mute">Plan: {subscriptionPlan}</p>
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
                >
                  Sign in
                </Button>
                <Button
                  onClick={() => {
                    setAuthMode("signup");
                    setAuthDialogOpen(true);
                  }}
                >
                  Sign up
                </Button>
              </>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-ink"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-ink/30 md:hidden"
            onClick={() => setIsOpen(false)}
          />

          <div className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-paper border-l border-line md:hidden">
            <div className="flex flex-col h-full p-6 pt-20">
              <div className="flex flex-col border-t border-line">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="border-b border-line py-3 text-base text-ink"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="mt-auto space-y-3 pt-8">
                {user ? (
                  <>
                    <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block">
                      <Button variant="outline" className="w-full">
                        Dashboard
                      </Button>
                    </Link>
                    <Link to="/builder" onClick={() => setIsOpen(false)} className="block pt-3">
                      <Button className="w-full">Open builder</Button>
                    </Link>
                    <Button
                      variant="outline"
                      onClick={() => {
                        signOut();
                        setIsOpen(false);
                      }}
                      className="w-full"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign out
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
                      className="w-full"
                    >
                      Sign up
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setAuthMode("signin");
                        setAuthDialogOpen(true);
                        setIsOpen(false);
                      }}
                      className="w-full"
                    >
                      Sign in
                    </Button>
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
