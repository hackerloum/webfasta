import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase";

export interface PaymentRequest {
  buyer_email: string;
  buyer_name: string;
  buyer_phone: string;
  amount: number;
  plan_id: string;
  user_id?: string;
}

export interface PaymentResponse {
  status: "success" | "error";
  message: string;
  transaction_id?: string;
  order_id?: string;
  details?: unknown;
}

const zenopayPayment = httpsCallable<
  Omit<PaymentRequest, "user_id"> & { order_id: string },
  PaymentResponse
>(functions, "zenopayPayment");

export async function initiatePayment(paymentData: PaymentRequest): Promise<PaymentResponse> {
  try {
    const orderId = crypto.randomUUID();
    const { data } = await zenopayPayment({
      order_id: orderId,
      buyer_email: paymentData.buyer_email,
      buyer_name: paymentData.buyer_name,
      buyer_phone: paymentData.buyer_phone,
      amount: paymentData.amount,
      plan_id: paymentData.plan_id,
    });

    if (data?.status === "error") {
      return {
        status: "error",
        message: data.message || "Payment initiation failed",
        details: data.details,
      };
    }

    return {
      status: "success",
      message: data?.message || "Payment initiated successfully",
      transaction_id: data?.transaction_id,
      order_id: data?.order_id || orderId,
    };
  } catch (error) {
    console.error("Payment error:", error);
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

export function validateTanzanianPhone(phone: string): boolean {
  const phoneRegex = /^07\d{8}$/;
  return phoneRegex.test(phone);
}

export function formatTanzanianPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");

  if (digits.startsWith("255")) {
    return "0" + digits.slice(3);
  }

  if (digits.startsWith("0")) {
    return digits;
  }

  return "0" + digits;
}
