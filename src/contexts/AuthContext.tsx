import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  userProfile: UserProfile | null;
  subscriptionPlan: string | null;
}

interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  subscription_plan: string | null;
  created_at: string;
  preferences: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [subscriptionPlan, setSubscriptionPlan] = useState<string | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setUserProfile(null);
        setSubscriptionPlan(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error && error.code !== "PGRST116") {
        // PGRST116 = no rows returned, which is fine for new users
        console.error("Error fetching user profile:", error);
      }

      if (data) {
        setUserProfile(data);
        setSubscriptionPlan(data.subscription_plan || "free");
      } else {
        // Create profile if it doesn't exist
        const { data: newProfile } = await supabase
          .from("user_profiles")
          .insert({
            id: userId,
            email: user?.email || "",
            subscription_plan: "free",
          })
          .select()
          .single();

        if (newProfile) {
          setUserProfile(newProfile);
          setSubscriptionPlan("free");
        }
      }
    } catch (error) {
      console.error("Error in fetchUserProfile:", error);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/pricing`,
        },
      });

      if (authError) {
        console.error("Signup error:", authError);
        return { error: authError };
      }

      // Create user profile immediately after signup
      // The trigger is disabled, so we handle it in code
      if (data.user) {
        // Small delay to ensure user is fully created
        await new Promise(resolve => setTimeout(resolve, 500));
        
        try {
          const { error: profileError } = await supabase
            .from("user_profiles")
            .insert({
              id: data.user.id,
              email: data.user.email || email,
              full_name: fullName || null,
              subscription_plan: "free",
            });

          if (profileError) {
            // If profile already exists, that's fine
            if (profileError.code !== '23505') { // Not a duplicate key error
              console.warn("Profile creation error:", profileError);
            }
          } else {
            console.log("User profile created successfully");
            // Refresh profile data
            await fetchUserProfile(data.user.id);
          }
        } catch (profileErr: any) {
          console.warn("Profile creation exception:", profileErr);
          // Don't fail signup - profile can be created later
        }
      }

      return { error: null };
    } catch (error: any) {
      console.error("Signup exception:", error);
      return { error: error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUserProfile(null);
    setSubscriptionPlan(null);
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    userProfile,
    subscriptionPlan,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // During hot reload in development, context might be temporarily undefined
    // Provide a fallback to prevent crashes, but log a warning
    if (import.meta.env.DEV) {
      console.warn("useAuth called outside AuthProvider - this may be a hot reload issue");
      return {
        user: null,
        session: null,
        loading: true,
        signIn: async () => ({ error: new Error("Auth not available") }),
        signUp: async () => ({ error: new Error("Auth not available") }),
        signOut: async () => {},
        userProfile: null,
        subscriptionPlan: null,
      };
    }
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

