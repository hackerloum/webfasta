import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  createUserProfile,
  getUserProfile,
  updateSubscriptionPlan,
  type SubscriptionPlan,
  type UserProfile,
} from "@/lib/users";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (
    email: string,
    password: string,
    fullName?: string
  ) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  userProfile: UserProfile | null;
  subscriptionPlan: string | null;
  refreshProfile: () => Promise<void>;
  updatePlan: (plan: SubscriptionPlan) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [subscriptionPlan, setSubscriptionPlan] = useState<string | null>(null);

  const applyProfile = useCallback((profile: UserProfile | null) => {
    setUserProfile(profile);
    setSubscriptionPlan(profile?.subscriptionPlan ?? null);
  }, []);

  const loadProfile = useCallback(async (firebaseUser: User) => {
    const existing = await getUserProfile(firebaseUser.uid);
    if (existing) {
      applyProfile(existing);
      return;
    }

    const created = await createUserProfile({
      id: firebaseUser.uid,
      email: firebaseUser.email ?? "",
      fullName: firebaseUser.displayName,
    });
    applyProfile(created);
  }, [applyProfile]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          await loadProfile(firebaseUser);
        } catch (error) {
          console.error("Error loading user profile:", error);
          applyProfile(null);
        }
      } else {
        applyProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [applyProfile, loadProfile]);

  const refreshProfile = async () => {
    if (!user) return;
    const profile = await getUserProfile(user.uid);
    applyProfile(profile);
  };

  const updatePlan = async (plan: SubscriptionPlan) => {
    if (!user) throw new Error("You need to sign in first");
    await updateSubscriptionPlan(user.uid, plan);
    await refreshProfile();
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      if (fullName) {
        await updateProfile(credential.user, { displayName: fullName });
      }
      const profile = await createUserProfile({
        id: credential.user.uid,
        email,
        fullName: fullName ?? null,
      });
      applyProfile(profile);
      return { error: null };
    } catch (error) {
      console.error("Signup error:", error);
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    applyProfile(null);
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    userProfile,
    subscriptionPlan,
    refreshProfile,
    updatePlan,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    if (import.meta.env.DEV) {
      console.warn("useAuth called outside AuthProvider - this may be a hot reload issue");
      return {
        user: null,
        loading: true,
        signIn: async () => ({ error: new Error("Auth not available") }),
        signUp: async () => ({ error: new Error("Auth not available") }),
        signOut: async () => {},
        userProfile: null,
        subscriptionPlan: null,
        refreshProfile: async () => {},
        updatePlan: async () => {},
      };
    }
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
