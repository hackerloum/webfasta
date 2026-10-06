import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requirePlan?: boolean;
}

const ProtectedRoute = ({ children, requirePlan = true }: ProtectedRouteProps) => {
  const { user, loading, subscriptionPlan, userProfile } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#f4f0e8] text-[#1a1814] font-sans">
        <p className="text-sm text-[#6b645b]">Loading</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/pricing" replace />;
  }

  const planToCheck = subscriptionPlan || userProfile?.subscriptionPlan || "free";

  if (requirePlan && !planToCheck) {
    return <Navigate to="/pricing" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
