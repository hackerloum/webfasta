import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
  type Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export type SubscriptionPlan = "free" | "starter" | "pro" | "business" | "enterprise";

export interface UserProfile {
  id: string;
  email: string;
  fullName: string | null;
  subscriptionPlan: SubscriptionPlan;
  preferences: Record<string, unknown>;
  createdAt: string;
}

const PLANS: SubscriptionPlan[] = ["free", "starter", "pro", "business", "enterprise"];

function asPlan(value: unknown): SubscriptionPlan {
  return PLANS.includes(value as SubscriptionPlan) ? (value as SubscriptionPlan) : "free";
}

function timestampToIso(value: unknown): string {
  if (value && typeof value === "object" && "toDate" in value) {
    return (value as Timestamp).toDate().toISOString();
  }
  if (typeof value === "string") return value;
  return new Date().toISOString();
}

function toProfile(id: string, data: Record<string, unknown>): UserProfile {
  return {
    id,
    email: typeof data.email === "string" ? data.email : "",
    fullName: typeof data.fullName === "string" ? data.fullName : null,
    subscriptionPlan: asPlan(data.subscriptionPlan),
    preferences:
      data.preferences && typeof data.preferences === "object"
        ? (data.preferences as Record<string, unknown>)
        : {},
    createdAt: timestampToIso(data.createdAt),
  };
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return null;
  return toProfile(snap.id, snap.data());
}

export async function createUserProfile(input: {
  id: string;
  email: string;
  fullName?: string | null;
}): Promise<UserProfile> {
  const ref = doc(db, "users", input.id);
  const existing = await getDoc(ref);
  if (existing.exists()) {
    return toProfile(existing.id, existing.data());
  }

  await setDoc(ref, {
    email: input.email,
    fullName: input.fullName ?? null,
    subscriptionPlan: "free",
    preferences: {},
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  const created = await getDoc(ref);
  return toProfile(created.id, created.data() ?? {});
}

export async function updateSubscriptionPlan(uid: string, plan: SubscriptionPlan) {
  await updateDoc(doc(db, "users", uid), {
    subscriptionPlan: plan,
    updatedAt: serverTimestamp(),
  });
}
