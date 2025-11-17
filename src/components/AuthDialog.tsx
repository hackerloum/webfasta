import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Mail, Lock, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "signin" | "signup";
  onModeChange: (mode: "signin" | "signup") => void;
}

const AuthDialog = ({ open, onOpenChange, mode, onModeChange }: AuthDialogProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "signin") {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: "Sign In Failed",
            description: error.message || "Invalid email or password",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "Redirecting to your dashboard...",
          });
          onOpenChange(false);
          setEmail("");
          setPassword("");
          setFullName("");
          
          // Redirect to dashboard after successful sign in
          setTimeout(() => {
            navigate("/dashboard");
          }, 500);
        }
      } else {
        if (password.length < 6) {
          toast({
            title: "Password too short",
            description: "Password must be at least 6 characters",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        const { error } = await signUp(email, password, fullName);
        if (error) {
          toast({
            title: "Sign Up Failed",
            description: error.message || "Could not create account",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Account created!",
            description: "Welcome! Redirecting to your dashboard...",
          });
          onOpenChange(false);
          setEmail("");
          setPassword("");
          setFullName("");
          
          // Redirect to dashboard after a brief delay
          setTimeout(() => {
            navigate("/dashboard");
          }, 500);
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            {mode === "signin" ? "Welcome Back" : "Create Account"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {mode === "signin"
              ? "Sign in to continue building amazing websites"
              : "Start your journey with AI Website Studio"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-foreground">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-10 bg-background/50 border-border/50"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-background/50 border-border/50"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder={mode === "signin" ? "Enter your password" : "At least 6 characters"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-background/50 border-border/50"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-lg font-semibold shadow-lg hover:shadow-glow transition-all"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {mode === "signin" ? "Signing in..." : "Creating account..."}
              </>
            ) : (
              mode === "signin" ? "Sign In" : "Create Account"
            )}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => onModeChange(mode === "signin" ? "signup" : "signin")}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {mode === "signin" ? (
              <>
                Don't have an account? <span className="font-semibold text-primary">Sign up</span>
              </>
            ) : (
              <>
                Already have an account? <span className="font-semibold text-primary">Sign in</span>
              </>
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;

