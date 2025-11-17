import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requirePlan?: boolean;
}

const ProtectedRoute = ({ children, requirePlan = true }: ProtectedRouteProps) => {
  const { user, loading, subscriptionPlan, userProfile } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);
  const [finalSubscriptionPlan, setFinalSubscriptionPlan] = useState<string | null>(null);

  // Wait for auth to fully load and verify subscription plan
  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      // Wait for auth context to finish loading
      if (loading) {
        return;
      }

      // If no user, we'll redirect
      if (!user) {
        if (isMounted) {
          setAuthChecked(true);
        }
        return;
      }

      // If subscriptionPlan is already loaded, use it
      if (subscriptionPlan || userProfile?.subscription_plan) {
        if (isMounted) {
          setFinalSubscriptionPlan(subscriptionPlan || userProfile?.subscription_plan || "free");
          setAuthChecked(true);
        }
        return;
      }

      // Double-check with Supabase directly if subscriptionPlan is not loaded yet
      // This handles the case where page refreshes and profile hasn't loaded
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!isMounted || !session?.user) {
          if (isMounted) {
            setAuthChecked(true);
          }
          return;
        }

        // Fetch profile directly to get subscription plan
        const { data: profile } = await supabase
          .from("user_profiles")
          .select("subscription_plan")
          .eq("id", session.user.id)
          .single();

        if (isMounted) {
          const plan = profile?.subscription_plan || "free";
          setFinalSubscriptionPlan(plan);
          setAuthChecked(true);
        }
      } catch (error) {
        console.error("Error checking subscription plan:", error);
        if (isMounted) {
          // Default to "free" if we can't fetch the plan
          setFinalSubscriptionPlan("free");
          setAuthChecked(true);
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [user, loading, subscriptionPlan, userProfile]);

  // Show loading while checking auth
  if (loading || !authChecked) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect if no user
  if (!user) {
    return <Navigate to="/pricing" replace />;
  }

  // Use the final subscription plan (from context or fetched)
  const planToCheck = finalSubscriptionPlan || subscriptionPlan || userProfile?.subscription_plan || "free";

  // Redirect if plan is required but not set (only if it's actually null, not "free")
  if (requirePlan && (!planToCheck || planToCheck === null)) {
    return <Navigate to="/pricing" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

