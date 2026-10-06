import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import type { SubscriptionPlan } from "@/lib/users";
import { useToast } from "@/components/ui/use-toast";
import AuthDialog from "@/components/AuthDialog";
import PaymentDialog from "@/components/PaymentDialog";
import { useState, useEffect } from "react";

const plans = [
  {
    name: "Starter",
    price: "3,000",
    currency: "TSH",
    period: "month",
    description: "One shop or service, a few pages",
    features: [
      "AI website generation",
      "Basic templates library",
      "Website setup assistance",
      "Email support (Swahili/English)",
      "Mobile-friendly design",
      "3 active websites",
      "Basic training included",
      "Export clean code"
    ],
    cta: "Anza Sasa (Start Now)",
    popular: false,
    planId: "starter"
  },
  {
    name: "Pro",
    price: "10,000",
    currency: "TSH",
    period: "month",
    description: "When you keep adding pages",
    features: [
      "Everything in Starter",
      "Premium templates library",
      "Priority support (24h response)",
      "Unlimited websites",
      "Custom domain support",
      "Advanced analytics",
      "1-on-1 training sessions",
      "WhatsApp support (Swahili/English)",
      "SEO optimization included",
      "E-commerce ready"
    ],
    cta: "Anza Pro (Start Pro)",
    popular: true,
    planId: "pro"
  },
  {
    name: "Business",
    price: "25,000",
    currency: "TSH",
    period: "month",
    description: "When you want a person on the phone",
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "Phone & WhatsApp support",
      "Custom website design",
      "Team training (up to 5 people)",
      "E-commerce features",
      "Payment gateway integration",
      "Monthly strategy sessions",
      "Priority feature requests",
      "24/7 support"
    ],
    cta: "Wasiliana Nasi (Contact Us)",
    popular: false,
    planId: "business"
  }
];

const faqs = [
  {
    question: "Je, nahitaji kadi ya benki kuanza? (Do I need a bank card to start?)",
    answer: "Hapana! Unaweza kuanza bila kadi ya benki. Tunaweza kulipa kwa M-Pesa, Airtel Money, au Tigo Pesa. No! You can start without a bank card. We accept M-Pesa, Airtel Money, or Tigo Pesa."
  },
  {
    question: "Je, naweza kubadilisha mpango baadaye? (Can I change plans later?)",
    answer: "Ndiyo! Unaweza kuongeza au kupunguza mpango wako wakati wowote. Mabadiliko yanafanya kazi mara moja. Yes! You can upgrade or downgrade your plan anytime. Changes take effect immediately."
  },
  {
    question: "Je, kuna bei ya chini kwa mwaka? (Is there a discount for annual plans?)",
    answer: "Ndiyo! Mipango ya mwaka inaokoa 20% ikilinganishwa na malipo ya kila mwezi. Yes! Annual plans save you 20% compared to monthly billing."
  },
  {
    question: "Je, ni njia gani za malipo unazokubali? (What payment methods do you accept?)",
    answer: "Tunakubali M-Pesa, Airtel Money, Tigo Pesa, na malipo ya benki kwa mipango ya Biashara. We accept M-Pesa, Airtel Money, Tigo Pesa, and bank transfers for Business plans."
  },
  {
    question: "Je, naweza kupata rudi pesa? (Can I get a refund?)",
    answer: "Ndiyo! Tunatoa dhamana ya kurudi pesa kwa siku 30 kwa mipango yote ya kulipia. Hakuna maswali. Yes! We offer a 30-day money-back guarantee on all paid plans. No questions asked."
  },
  {
    question: "Je, mna msaada wa Kiswahili? (Do you have Swahili support?)",
    answer: "Ndiyo! Tuna msaada wa Kiswahili na Kiingereza. Unaweza kuwasiliana nasi kwa barua pepe, WhatsApp, au simu. Yes! We have Swahili and English support. You can contact us via email, WhatsApp, or phone."
  }
];

const notes = [
  {
    title: "Salama na Kuaminika (Secure & Reliable)",
    body: "Usalama wa hali ya juu na huduma ya 99.9% uptime. Enterprise-grade security with 99.9% uptime."
  },
  {
    title: "Futa Wakati Wowote (Cancel Anytime)",
    body: "Hakuna mikataba ya muda mrefu. Futa usajili wako wakati wowote. No long-term contracts. Cancel anytime."
  },
  {
    title: "Msaada wa Kikanda (Local Support)",
    body: "Msaada wa Kiswahili na Kiingereza. Tunaweza kukusaidia kwa WhatsApp au simu. Swahili and English support via WhatsApp or phone."
  },
  {
    title: "Malipo ya Rahisi (Easy Payments)",
    body: "Lipa kwa M-Pesa, Airtel Money, au Tigo Pesa. Pay with M-Pesa, Airtel Money, or Tigo Pesa."
  }
];

const Pricing = () => {
  const { user, userProfile, updatePlan, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signup");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedPlanForPayment, setSelectedPlanForPayment] = useState<{
    name: string;
    amount: number;
    planId: string;
  } | null>(null);

  useEffect(() => {
    if (user && selectedPlan) {
      const plan = plans.find((p) => p.name === selectedPlan);
      if (plan) {
        setSelectedPlanForPayment({
          name: plan.name,
          amount: parseInt(plan.price.replace(/,/g, "")),
          planId: plan.planId,
        });
        setPaymentDialogOpen(true);
        setSelectedPlan(null);
        setAuthDialogOpen(false);
      }
    }
  }, [user, selectedPlan]);

  const handlePlanSelect = async (planName: string) => {
    if (!user) {
      setSelectedPlan(planName);
      setAuthMode("signup");
      setAuthDialogOpen(true);
      return;
    }

    const plan = plans.find((p) => p.name === planName);
    if (!plan) {
      toast({
        title: "Error",
        description: "Plan not found",
        variant: "destructive",
      });
      return;
    }

    if (userProfile?.subscriptionPlan === plan.planId) {
      toast({
        title: "Already on this plan",
        description: `You're already subscribed to the ${planName} plan.`,
      });
      navigate("/dashboard");
      return;
    }

    if (plan.planId === "starter" || plan.price === "3,000") {
      try {
        await updatePlan(plan.planId as SubscriptionPlan);

        toast({
          title: "Plan updated!",
          description: `You're now on the ${planName} plan.`,
        });

        navigate("/dashboard");
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to update plan",
          variant: "destructive",
        });
      }
      return;
    }

    setSelectedPlanForPayment({
      name: plan.name,
      amount: parseInt(plan.price.replace(/,/g, "")),
      planId: plan.planId,
    });
    setPaymentDialogOpen(true);
  };

  const handlePaymentSuccess = async () => {
    if (!user) return;
    await refreshProfile();
    toast({
      title: "Payment Successful!",
      description: `Your ${selectedPlanForPayment?.name} plan is now active.`,
    });
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-paper bg-[#f4f0e8] font-sans text-ink text-[#1a1814]">
      <Navbar />

      <main>
        <section className="px-4 sm:px-6 lg:px-8 pt-28 pb-12">
          <div className="max-w-5xl">
            <p className="text-sm text-mute text-[#6b645b]">Bei / Pricing</p>
            <h1 className="mt-3 max-w-xl font-display font-['Newsreader',serif] text-4xl sm:text-5xl font-normal leading-[1.15] tracking-tight">
              Three prices. Pay with your phone.
            </h1>
            <p className="mt-5 max-w-xl leading-relaxed text-mute text-[#6b645b]">
              Chagua mpango unaokufaa. Bei nafuu kwa Watanzania. Anza sasa.
              Lipa kwa M-Pesa, Airtel Money, au Tigo Pesa.
            </p>
            <p className="mt-2 max-w-xl leading-relaxed text-mute text-[#6b645b]">
              Choose a plan. Starter is 3,000 TSH, Pro is 10,000 TSH, Business is 25,000 TSH, each month.
            </p>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => {
              const isCurrent = Boolean(user && userProfile?.subscriptionPlan === plan.planId);
              return (
                <article
                  key={plan.name}
                  className={`flex flex-col border bg-card bg-[#fbf9f5] p-6 ${
                    plan.popular ? "border-[#146c43] border-moss" : "border-line border-[#e4ddd2]"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h2 className="font-display font-['Newsreader',serif] text-2xl font-normal">{plan.name}</h2>
                    {plan.popular && (
                      <span className="text-xs text-moss text-[#146c43]">Most chosen</span>
                    )}
                  </div>
                  <p className="mt-5 font-display font-['Newsreader',serif] text-4xl font-normal tracking-tight">
                    {plan.price}
                    <span className="ml-2 text-base text-mute text-[#6b645b]">
                      {plan.currency}/{plan.period}
                    </span>
                  </p>
                  <p className="mt-2 text-sm text-mute text-[#6b645b]">{plan.description}</p>
                  <ul className="mt-6 space-y-2 text-sm flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="leading-snug">
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => handlePlanSelect(plan.name)}
                    disabled={isCurrent}
                    className={`mt-8 inline-flex h-11 w-full items-center justify-center px-4 text-sm disabled:cursor-not-allowed disabled:opacity-50 ${
                      plan.popular
                        ? "bg-moss bg-[#146c43] text-primary-foreground text-[#fbf9f5] hover:bg-moss-dark hover:bg-[#0e4d30]"
                        : "border border-line border-[#e4ddd2] bg-paper bg-[#f4f0e8] text-ink text-[#1a1814] hover:border-[#146c43]"
                    }`}
                  >
                    {isCurrent ? "Current Plan" : plan.cta}
                  </button>
                </article>
              );
            })}
          </div>

          <div className="max-w-5xl mt-8 space-y-1 text-sm leading-relaxed text-mute text-[#6b645b]">
            <p>Bei nafuu kwa Watanzania. Tunaweza kulipa kwa M-Pesa, Airtel Money, au Tigo Pesa.</p>
            <p>Affordable prices for Tanzanians. Pay with M-Pesa, Airtel Money, or Tigo Pesa.</p>
            <p>Dhamana ya kurudi pesa kwa siku 30 kwa mipango yote ya kulipia. 30-day money-back guarantee on all paid plans.</p>
          </div>
        </section>

        <section className="border-t border-line border-[#e4ddd2] px-4 sm:px-6 lg:px-8 py-14">
          <div className="max-w-3xl">
            <h2 className="font-display font-['Newsreader',serif] text-3xl font-normal tracking-tight">
              Kabla ya kulipa
            </h2>
            <p className="mt-2 text-sm text-mute text-[#6b645b]">Before you pay</p>
            <div className="mt-8 border-t border-line border-[#e4ddd2]">
              {notes.map((note) => (
                <div key={note.title} className="py-5 border-b border-line border-[#e4ddd2]">
                  <h3 className="font-medium">{note.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mute text-[#6b645b]">{note.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-line border-[#e4ddd2] px-4 sm:px-6 lg:px-8 py-14">
          <div className="max-w-3xl">
            <h2 className="font-display font-['Newsreader',serif] text-3xl font-normal tracking-tight">
              Maswali
            </h2>
            <p className="mt-2 text-sm text-mute text-[#6b645b]">
              Questions. If yours is not here, open an account and write to support.
            </p>
            <div className="mt-8 border-t border-line border-[#e4ddd2]">
              {faqs.map((faq) => (
                <div key={faq.question} className="py-6 border-b border-line border-[#e4ddd2]">
                  <h3 className="font-medium leading-snug">{faq.question}</h3>
                  <p className="mt-2 leading-relaxed text-mute text-[#6b645b]">{faq.answer}</p>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                if (user) {
                  navigate("/dashboard");
                } else {
                  setAuthMode("signup");
                  setAuthDialogOpen(true);
                }
              }}
              className="mt-8 inline-flex h-11 items-center border border-line border-[#e4ddd2] bg-card bg-[#fbf9f5] px-4 text-sm text-ink text-[#1a1814] hover:border-[#146c43]"
            >
              {user ? "Open your account" : "Create an account"}
            </button>
          </div>
        </section>
      </main>

      <Footer />

      <AuthDialog
        open={authDialogOpen}
        onOpenChange={(open) => {
          setAuthDialogOpen(open);
          if (!open) {
            setSelectedPlan(null);
          }
        }}
        mode={authMode}
        onModeChange={setAuthMode}
      />

      {selectedPlanForPayment && (
        <PaymentDialog
          open={paymentDialogOpen}
          onOpenChange={setPaymentDialogOpen}
          planName={selectedPlanForPayment.name}
          amount={selectedPlanForPayment.amount}
          planId={selectedPlanForPayment.planId}
          userId={user?.uid}
          userEmail={user?.email || undefined}
          userName={userProfile?.fullName || undefined}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default Pricing;
