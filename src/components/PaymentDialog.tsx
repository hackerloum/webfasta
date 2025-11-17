import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, CreditCard, Phone, Mail, User } from "lucide-react";
import { initiatePayment, validateTanzanianPhone, formatTanzanianPhone, PaymentRequest } from "@/lib/payment";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string;
  amount: number;
  planId: string;
  userId?: string;
  userEmail?: string;
  userName?: string;
  onSuccess?: () => void;
}

export default function PaymentDialog({
  open,
  onOpenChange,
  planName,
  amount,
  planId,
  userId,
  userEmail,
  userName,
  onSuccess,
}: PaymentDialogProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    buyer_email: userEmail || "",
    buyer_name: userName || "",
    buyer_phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form
      if (!formData.buyer_email || !formData.buyer_name || !formData.buyer_phone) {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Format and validate phone number
      const formattedPhone = formatTanzanianPhone(formData.buyer_phone);
      if (!validateTanzanianPhone(formattedPhone)) {
        toast({
          title: "Invalid Phone Number",
          description: "Please enter a valid Tanzanian mobile number (format: 07XXXXXXXX)",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.buyer_email)) {
        toast({
          title: "Invalid Email",
          description: "Please enter a valid email address",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Initiate payment
      const paymentData: PaymentRequest = {
        buyer_email: formData.buyer_email,
        buyer_name: formData.buyer_name,
        buyer_phone: formattedPhone,
        amount: amount,
        plan_id: planId,
        user_id: userId,
      };

      const result = await initiatePayment(paymentData);

      if (result.status === "success") {
        toast({
          title: "Payment Initiated!",
          description: result.message || "Please complete the payment on your mobile phone",
        });

        // Close dialog and call success callback
        onOpenChange(false);
        if (onSuccess) {
          onSuccess();
        }
      } else {
        toast({
          title: "Payment Failed",
          description: result.message || "Failed to initiate payment. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Complete Payment - {planName} Plan
          </DialogTitle>
          <DialogDescription>
            Enter your details to complete the payment via mobile money (M-Pesa, Airtel Money, or Tigo Pesa)
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-semibold">
              Amount
            </Label>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted border border-border">
              <span className="text-2xl font-bold text-foreground">
                {amount.toLocaleString()} TZS
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="buyer_name" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Full Name *
            </Label>
            <Input
              id="buyer_name"
              type="text"
              placeholder="John Doe"
              value={formData.buyer_name}
              onChange={(e) =>
                setFormData({ ...formData, buyer_name: e.target.value })
              }
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="buyer_email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Address *
            </Label>
            <Input
              id="buyer_email"
              type="email"
              placeholder="john@example.com"
              value={formData.buyer_email}
              onChange={(e) =>
                setFormData({ ...formData, buyer_email: e.target.value })
              }
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="buyer_phone" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Mobile Number *
            </Label>
            <Input
              id="buyer_phone"
              type="tel"
              placeholder="0744963858"
              value={formData.buyer_phone}
              onChange={(e) =>
                setFormData({ ...formData, buyer_phone: e.target.value })
              }
              required
              disabled={loading}
            />
            <p className="text-xs text-muted-foreground">
              Tanzanian mobile format: 07XXXXXXXX (e.g., 0744963858)
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay {amount.toLocaleString()} TZS
                </>
              )}
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground pt-2">
            You will receive a payment prompt on your mobile phone. Please complete the payment to activate your plan.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}

