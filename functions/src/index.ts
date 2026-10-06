import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import { cert, initializeApp, type ServiceAccount } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { defineSecret } from "firebase-functions/params";
import { HttpsError, onCall } from "firebase-functions/v2/https";

const serviceAccountPath = resolve(__dirname, "../service-account.json");

if (existsSync(serviceAccountPath)) {
  const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8")) as ServiceAccount;
  initializeApp({
    credential: cert(serviceAccount),
    projectId: "webfaster-65829",
  });
} else {
  initializeApp();
}

const db = getFirestore();
const zenopayApiKey = defineSecret("ZENOPAY_API_KEY");

const PAID_PLANS = new Set(["pro", "business", "enterprise"]);

interface PaymentBody {
  order_id?: string;
  buyer_email?: string;
  buyer_name?: string;
  buyer_phone?: string;
  amount?: number;
  plan_id?: string;
}

export const zenopayPayment = onCall(
  { region: "us-central1", secrets: [zenopayApiKey] },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError("unauthenticated", "Sign in required");
    }

    const body = (request.data ?? {}) as PaymentBody;
    const orderId = typeof body.order_id === "string" ? body.order_id.trim() : "";
    const buyerEmail = typeof body.buyer_email === "string" ? body.buyer_email.trim() : "";
    const buyerName = typeof body.buyer_name === "string" ? body.buyer_name.trim() : "";
    const buyerPhone = typeof body.buyer_phone === "string" ? body.buyer_phone.trim() : "";
    const amount = typeof body.amount === "number" ? body.amount : Number(body.amount);
    const planId = typeof body.plan_id === "string" ? body.plan_id : "";

    if (!orderId || !buyerEmail || !buyerName || !buyerPhone || !planId) {
      throw new HttpsError(
        "invalid-argument",
        "order_id, buyer_email, buyer_name, buyer_phone, amount, and plan_id are required"
      );
    }

    if (!PAID_PLANS.has(planId)) {
      throw new HttpsError("invalid-argument", "This plan does not require a ZenoPay payment");
    }

    if (!/^07\d{8}$/.test(buyerPhone)) {
      throw new HttpsError(
        "invalid-argument",
        "Invalid phone number format. Please use Tanzanian mobile format: 07XXXXXXXX"
      );
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      throw new HttpsError("invalid-argument", "Amount must be greater than 0");
    }

    const apiKey = zenopayApiKey.value();
    if (!apiKey) {
      throw new HttpsError("failed-precondition", "ZenoPay API key is not configured");
    }

    const zenopayResponse = await fetch("https://zenoapi.com/api/payments/mobile_money_tanzania", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        order_id: orderId,
        buyer_email: buyerEmail,
        buyer_name: buyerName,
        buyer_phone: buyerPhone,
        amount,
      }),
    });

    const zenopayData = (await zenopayResponse.json().catch(() => ({}))) as {
      status?: string;
      message?: string;
      transaction_id?: string;
    };

    if (!zenopayResponse.ok || zenopayData.status === "error") {
      throw new HttpsError(
        "internal",
        zenopayData.message || "Payment initiation failed"
      );
    }

    const userId = request.auth.uid;
    const safeResponse = JSON.parse(JSON.stringify(zenopayData ?? {}));

    await db.collection("payments").doc(orderId).set({
      userId,
      orderId,
      transactionId: zenopayData.transaction_id ?? null,
      planId,
      amount,
      currency: "TZS",
      buyerEmail,
      buyerName,
      buyerPhone,
      status: "pending",
      zenopayResponse: safeResponse,
      errorMessage: null,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    await db.collection("users").doc(userId).set(
      {
        subscriptionPlan: planId,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    return {
      status: "success",
      message: zenopayData.message || "Payment initiated successfully",
      transaction_id: zenopayData.transaction_id,
      order_id: orderId,
    };
  }
);
