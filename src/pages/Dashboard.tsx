import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User,
  Sparkles,
  Code2,
  Settings,
  CreditCard,
  FileText,
  HelpCircle,
  LogOut,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Mail,
  Crown,
  Zap,
  Rocket,
  BarChart3,
  BookOpen,
  LayoutDashboard,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const { user, userProfile, subscriptionPlan, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // Check auth state on mount and wait for it to be fully loaded
  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      // Wait for the auth context to finish loading
      if (loading) {
        return;
      }

      // If user exists, we're good
      if (user) {
        if (isMounted) {
          setAuthChecked(true);
        }
        return;
      }

      // Double-check with Supabase directly to avoid race conditions
      // This handles the case where the page refreshes and auth context hasn't loaded yet
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!isMounted) return;

        if (session?.user) {
          // Session exists, user will be set by AuthContext soon
          // Wait a bit for AuthContext to catch up
          setTimeout(() => {
            if (isMounted) {
              setAuthChecked(true);
            }
          }, 100);
        } else {
          // No session, redirect to pricing
          setAuthChecked(true);
          navigate("/pricing", { replace: true });
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        if (isMounted) {
          setAuthChecked(true);
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [user, loading, navigate]);

  // Show loading while checking auth
  if (loading || !authChecked) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If no user after auth check, don't render (redirect is happening)
  if (!user) {
    return null;
  }

  const planInfo = {
    free: {
      name: "Free",
      icon: <Zap className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500",
      features: ["Unlimited AI generations", "Basic templates", "5 active projects"]
    },
    starter: {
      name: "Starter",
      icon: <Rocket className="w-5 h-5" />,
      color: "from-green-500 to-emerald-500",
      features: ["Everything in Free", "3 active websites", "Email support"]
    },
    pro: {
      name: "Pro",
      icon: <Crown className="w-5 h-5" />,
      color: "from-primary to-accent",
      features: ["Everything in Starter", "Unlimited websites", "Priority support"]
    },
    business: {
      name: "Business",
      icon: <Crown className="w-5 h-5" />,
      color: "from-purple-500 to-pink-500",
      features: ["Everything in Pro", "Dedicated support", "Custom features"]
    },
    enterprise: {
      name: "Enterprise",
      icon: <Crown className="w-5 h-5" />,
      color: "from-purple-500 to-pink-500",
      features: ["Everything in Business", "Custom integrations", "24/7 support"]
    }
  };

  const currentPlan = planInfo[subscriptionPlan as keyof typeof planInfo] || planInfo.free;

  const sidebarLinks = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      link: "/dashboard",
      active: true
    },
    {
      title: "Builder",
      icon: <Sparkles className="w-5 h-5" />,
      link: "/builder",
      active: false
    },
    {
      title: "Projects",
      icon: <Code2 className="w-5 h-5" />,
      link: "/builder",
      active: false
    },
    {
      title: "Templates",
      icon: <FileText className="w-5 h-5" />,
      link: "/features",
      active: false
    },
    {
      title: "Documentation",
      icon: <BookOpen className="w-5 h-5" />,
      link: "/about",
      active: false
    }
  ];

  const stats = [
    {
      label: "Projects Created",
      value: "0",
      icon: <Code2 className="w-5 h-5" />,
      color: "text-primary"
    },
    {
      label: "AI Generations",
      value: "0",
      icon: <Sparkles className="w-5 h-5" />,
      color: "text-accent"
    },
    {
      label: "Account Created",
      value: new Date(userProfile?.created_at || Date.now()).toLocaleDateString(),
      icon: <Calendar className="w-5 h-5" />,
      color: "text-green-500"
    }
  ];

  const quickActions = [
    {
      title: "Start Building",
      description: "Create a new website with AI",
      icon: <Sparkles className="w-6 h-6" />,
      link: "/builder",
      color: "from-primary to-accent",
      gradient: "from-primary/20 to-accent/20"
    },
    {
      title: "View Projects",
      description: "See all your websites",
      icon: <Code2 className="w-6 h-6" />,
      link: "/builder",
      color: "from-blue-500 to-cyan-500",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "Browse Templates",
      description: "Explore website templates",
      icon: <FileText className="w-6 h-6" />,
      link: "/features",
      color: "from-green-500 to-emerald-500",
      gradient: "from-green-500/20 to-emerald-500/20"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-card/95 backdrop-blur-xl border-r border-border transition-transform duration-300 lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo/Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">AI Studio</h1>
                <p className="text-xs text-muted-foreground">Dashboard</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {sidebarLinks.map((link) => (
              <Link
                key={link.title}
                to={link.link}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                  link.active
                    ? "bg-gradient-to-r from-primary/20 to-accent/20 text-primary border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {link.icon}
                <span className="font-medium">{link.title}</span>
              </Link>
            ))}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  {userProfile?.full_name || user.email?.split("@")[0] || "User"}
                </p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
            <div className="space-y-2">
              <Link to="/pricing">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Manage Plan
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full justify-start text-destructive hover:text-destructive"
                size="sm"
                onClick={signOut}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-xl border-b border-border">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
                <p className="text-sm text-muted-foreground">Welcome back, {userProfile?.full_name || user.email?.split("@")[0] || "User"}!</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r text-white",
                currentPlan.color
              )}>
                {currentPlan.icon}
                <span className="text-sm font-semibold">{currentPlan.name}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={cn("p-3 rounded-xl bg-muted/50", stat.color)}>
                    {stat.icon}
                  </div>
                </div>
                <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.link}>
                  <Card className={cn(
                    "p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer group",
                    `hover:bg-gradient-to-br ${action.gradient}`
                  )}>
                    <div className={cn(
                      "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform",
                      action.color
                    )}>
                      {action.icon}
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {action.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Account Information & Plan Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Account Information */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-4">Account Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">Full Name</p>
                    <p className="text-base font-semibold text-foreground">
                      {userProfile?.full_name || "Not set"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">Email Address</p>
                    <p className="text-base font-semibold text-foreground">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">Member Since</p>
                    <p className="text-base font-semibold text-foreground">
                      {userProfile?.created_at
                        ? new Date(userProfile.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                          })
                        : "Recently"}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Plan Features */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Your Plan</h3>
                <Link to="/pricing">
                  <Button variant="outline" size="sm">
                    Change Plan
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className={cn(
                  "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white",
                  currentPlan.color
                )}>
                  {currentPlan.icon}
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-foreground">{currentPlan.name} Plan</h4>
                  <p className="text-sm text-muted-foreground">Your current subscription</p>
                </div>
              </div>
              <div className="space-y-2">
                {currentPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-2 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Getting Started (Free Plan Only) */}
          {subscriptionPlan === "free" && (
            <Card className="p-8 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 border-primary/20">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Ready to Build Something Amazing?
                  </h3>
                  <p className="text-muted-foreground">
                    Start creating your first website with AI. It's free and takes less than a minute.
                  </p>
                </div>
                <Link to="/builder">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-glow transition-all hover:scale-105"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Start Building Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
