import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Code2,
  CreditCard,
  FileText,
  LogOut,
  BookOpen,
  LayoutDashboard,
  Menu,
  X,
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

      setAuthChecked(true);
      navigate("/pricing", { replace: true });
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [user, loading, navigate]);

  // Show loading while checking auth
  if (loading || !authChecked) {
    return (
      <div className="min-h-screen bg-[#f4f0e8] text-[#1a1814] font-sans flex items-center justify-center">
        <p className="text-sm text-[#6b645b]">Loading</p>
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
      features: ["Unlimited AI generations", "Basic templates", "5 active projects"],
    },
    starter: {
      name: "Starter",
      features: ["Everything in Free", "3 active websites", "Email support"],
    },
    pro: {
      name: "Pro",
      features: ["Everything in Starter", "Unlimited websites", "Priority support"],
    },
    business: {
      name: "Business",
      features: ["Everything in Pro", "Dedicated support", "Custom features"],
    },
    enterprise: {
      name: "Enterprise",
      features: ["Everything in Business", "Custom integrations", "24/7 support"],
    },
  };

  const currentPlan = planInfo[subscriptionPlan as keyof typeof planInfo] || planInfo.free;
  const displayName = userProfile?.fullName || user.email?.split("@")[0] || "User";

  const sidebarLinks = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="w-4 h-4" />,
      link: "/dashboard",
      active: true,
    },
    {
      title: "Builder",
      icon: <Code2 className="w-4 h-4" />,
      link: "/builder",
      active: false,
    },
    {
      title: "Projects",
      icon: <Code2 className="w-4 h-4" />,
      link: "/builder",
      active: false,
    },
    {
      title: "Templates",
      icon: <FileText className="w-4 h-4" />,
      link: "/features",
      active: false,
    },
    {
      title: "Documentation",
      icon: <BookOpen className="w-4 h-4" />,
      link: "/about",
      active: false,
    },
  ];

  const quickActions = [
    {
      title: "Start Building",
      description: "Create a new website with AI",
      link: "/builder",
    },
    {
      title: "View Projects",
      description: "See all your websites",
      link: "/builder",
    },
    {
      title: "Browse Templates",
      description: "Explore website templates",
      link: "/features",
    },
  ];

  const memberSince = userProfile?.createdAt
    ? new Date(userProfile.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recently";

  return (
    <div className="min-h-screen bg-[#f4f0e8] text-[#1a1814] font-sans">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-56 bg-[#fbf9f5] border-r border-[#e4ddd2] flex flex-col transition-transform duration-200 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-12 px-4 border-b border-[#e4ddd2]">
          <p className="font-['Newsreader',serif] text-lg leading-none">Webfasta</p>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-8 w-8 text-[#1a1814] hover:bg-[#f4f0e8] hover:text-[#1a1814]"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {sidebarLinks.map((link) => (
            <Link
              key={link.title}
              to={link.link}
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 text-sm",
                link.active
                  ? "bg-[#146c43] text-[#fbf9f5]"
                  : "text-[#6b645b] hover:bg-[#f4f0e8] hover:text-[#1a1814]"
              )}
            >
              {link.icon}
              <span>{link.title}</span>
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-[#e4ddd2] space-y-2">
          <div className="min-w-0">
            <p className="text-sm truncate">{displayName}</p>
            <p className="text-xs text-[#6b645b] truncate">{user.email}</p>
          </div>
          <Link to="/pricing" className="block">
            <Button
              variant="outline"
              className="w-full justify-start h-8 border-[#e4ddd2] bg-transparent text-[#1a1814] hover:bg-[#f4f0e8] hover:text-[#1a1814] shadow-none"
              size="sm"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Manage Plan
            </Button>
          </Link>
          <Button
            variant="outline"
            className="w-full justify-start h-8 border-[#e4ddd2] bg-transparent text-[#1a1814] hover:bg-[#f4f0e8] hover:text-[#1a1814] shadow-none"
            size="sm"
            onClick={signOut}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-[#1a1814]/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="lg:ml-56">
        <header className="sticky top-0 z-30 bg-[#fbf9f5] border-b border-[#e4ddd2]">
          <div className="flex items-center justify-between h-12 px-4">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-8 w-8 text-[#1a1814] hover:bg-[#f4f0e8] hover:text-[#1a1814]"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-4 h-4" />
              </Button>
              <h1 className="font-['Newsreader',serif] text-xl leading-none">Account</h1>
            </div>
            <span className="text-xs px-2 py-1 border border-[#e4ddd2] text-[#146c43]">
              {currentPlan.name}
            </span>
          </div>
        </header>

        <main className="max-w-2xl px-4 py-8 space-y-8">
          <section>
            <h2 className="font-['Newsreader',serif] text-3xl leading-tight">{displayName}</h2>
            <p className="text-sm text-[#6b645b] mt-1">{user.email}</p>
            <p className="text-sm mt-3">Plan: {currentPlan.name}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Link to="/builder">
                <Button className="h-9 bg-[#146c43] text-[#fbf9f5] hover:bg-[#0e4d30] shadow-none">
                  Start building
                </Button>
              </Link>
              <Link to="/pricing">
                <Button
                  variant="outline"
                  className="h-9 border-[#e4ddd2] bg-transparent text-[#1a1814] hover:bg-[#fbf9f5] hover:text-[#1a1814] shadow-none"
                >
                  Manage plan
                </Button>
              </Link>
            </div>
          </section>

          <section className="border border-[#e4ddd2] bg-[#fbf9f5]">
            <h3 className="px-4 py-2 text-sm border-b border-[#e4ddd2]">Details</h3>
            <dl className="text-sm divide-y divide-[#e4ddd2]">
              <div className="grid grid-cols-[8rem_1fr] gap-3 px-4 py-2.5">
                <dt className="text-[#6b645b]">Name</dt>
                <dd>{userProfile?.fullName || "Not set"}</dd>
              </div>
              <div className="grid grid-cols-[8rem_1fr] gap-3 px-4 py-2.5">
                <dt className="text-[#6b645b]">Email</dt>
                <dd className="break-all">{user.email}</dd>
              </div>
              <div className="grid grid-cols-[8rem_1fr] gap-3 px-4 py-2.5">
                <dt className="text-[#6b645b]">Member since</dt>
                <dd>{memberSince}</dd>
              </div>
              <div className="grid grid-cols-[8rem_1fr] gap-3 px-4 py-2.5">
                <dt className="text-[#6b645b]">Projects</dt>
                <dd>0</dd>
              </div>
              <div className="grid grid-cols-[8rem_1fr] gap-3 px-4 py-2.5">
                <dt className="text-[#6b645b]">Generations</dt>
                <dd>0</dd>
              </div>
              <div className="grid grid-cols-[8rem_1fr] gap-3 px-4 py-2.5">
                <dt className="text-[#6b645b]">Account created</dt>
                <dd>{new Date(userProfile?.createdAt || Date.now()).toLocaleDateString()}</dd>
              </div>
            </dl>
          </section>

          <section className="border border-[#e4ddd2] bg-[#fbf9f5]">
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#e4ddd2]">
              <h3 className="text-sm">{currentPlan.name} plan</h3>
              <Link to="/pricing" className="text-sm text-[#146c43] hover:text-[#0e4d30]">
                Change Plan
              </Link>
            </div>
            <ul className="px-4 py-3 space-y-1.5 text-sm">
              {currentPlan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-sm text-[#6b645b] mb-2">Actions</h3>
            <ul className="border border-[#e4ddd2] bg-[#fbf9f5] divide-y divide-[#e4ddd2]">
              {quickActions.map((action) => (
                <li key={action.title}>
                  <Link to={action.link} className="block px-4 py-3 hover:bg-[#f4f0e8]">
                    <span className="text-sm">{action.title}</span>
                    <span className="block text-xs text-[#6b645b] mt-0.5">{action.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {subscriptionPlan === "free" && (
            <p className="text-sm text-[#6b645b]">
              The builder is included on the free plan.{" "}
              <Link to="/builder" className="text-[#146c43] hover:text-[#0e4d30]">
                Start building
              </Link>
            </p>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
