import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import AuthDialog from "@/components/AuthDialog";
import PaymentDialog from "@/components/PaymentDialog";
import { useState, useEffect } from "react";
import { 
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Users,
  Globe,
  Code2,
  Rocket,
  Star,
  HelpCircle
} from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "3,000",
    currency: "TSH",
    period: "month",
    description: "Perfect for small businesses",
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
    gradient: "from-blue-500/20 to-cyan-500/20",
    planId: "starter"
  },
  {
    name: "Pro",
    price: "10,000",
    currency: "TSH",
    period: "month",
    description: "For growing businesses",
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
    gradient: "from-primary/20 to-accent/20",
    planId: "pro"
  },
  {
    name: "Business",
    price: "25,000",
    currency: "TSH",
    period: "month",
    description: "For established businesses",
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
    gradient: "from-purple-500/20 to-pink-500/20",
    planId: "business"
  }
];

const Pricing = () => {
  const { user, userProfile, loading: authLoading } = useAuth();
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

  // Handle plan selection after successful authentication
  useEffect(() => {
    if (user && selectedPlan) {
      // User just signed up/in, now show payment dialog
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
      // Store selected plan and show auth dialog
      setSelectedPlan(planName);
      setAuthMode("signup");
      setAuthDialogOpen(true);
      return;
    }

    // Find the plan details
    const plan = plans.find((p) => p.name === planName);
    if (!plan) {
      toast({
        title: "Error",
        description: "Plan not found",
        variant: "destructive",
      });
      return;
    }

    // Check if user is already on this plan
    if (userProfile?.subscription_plan === plan.planId) {
      toast({
        title: "Already on this plan",
        description: `You're already subscribed to the ${planName} plan.`,
      });
      navigate("/dashboard");
      return;
    }

    // For free/starter plans, update directly without payment
    if (plan.planId === "starter" || plan.price === "3,000") {
      try {
        const { error } = await supabase
          .from("user_profiles")
          .update({ subscription_plan: plan.planId })
          .eq("id", user.id);

        if (error) throw error;

        toast({
          title: "Plan updated!",
          description: `You're now on the ${planName} plan.`,
        });

        // Redirect to dashboard
        navigate("/dashboard");
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to update plan",
          variant: "destructive",
        });
      }
      return;
    }

    // For paid plans, show payment dialog
    setSelectedPlanForPayment({
      name: plan.name,
      amount: parseInt(plan.price.replace(/,/g, "")),
      planId: plan.planId,
    });
    setPaymentDialogOpen(true);
  };

  const handlePaymentSuccess = async () => {
    // Refresh user profile to get updated subscription plan
    if (user) {
      const { data } = await supabase
        .from("user_profiles")
        .select("subscription_plan")
        .eq("id", user.id)
        .single();

      if (data) {
        toast({
          title: "Payment Successful!",
          description: `Your ${selectedPlanForPayment?.name} plan is now active.`,
        });
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    }
  };

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

  const benefits = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Salama na Kuaminika (Secure & Reliable)",
      description: "Usalama wa hali ya juu na huduma ya 99.9% uptime. Enterprise-grade security with 99.9% uptime."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Futa Wakati Wowote (Cancel Anytime)",
      description: "Hakuna mikataba ya muda mrefu. Futa usajili wako wakati wowote. No long-term contracts. Cancel anytime."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Msaada wa Kikanda (Local Support)",
      description: "Msaada wa Kiswahili na Kiingereza. Tunaweza kukusaidia kwa WhatsApp au simu. Swahili and English support via WhatsApp or phone."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Malipo ya Rahisi (Easy Payments)",
      description: "Lipa kwa M-Pesa, Airtel Money, au Tigo Pesa. Pay with M-Pesa, Airtel Money, or Tigo Pesa."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] animate-float" />
          <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-accent/15 rounded-full blur-[100px] animate-float" style={{ animationDelay: "2s" }} />
        </div>
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-morphism-light mb-8 border border-primary/20 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-semibold text-primary">Pricing Plans</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-foreground mb-8 leading-tight animate-fade-in">
              Simple, Transparent
              <br />
              <span className="text-gradient bg-[length:200%_auto] animate-gradient">Pricing</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in" style={{ animationDelay: "100ms" }}>
              Chagua mpango unaokufaa. Bei nafuu kwa Watanzania. Anza sasa!
              <br className="hidden sm:block" />
              <span className="text-foreground font-semibold">Choose the perfect plan. Affordable prices for Tanzanians. Start now!</span>
              <br className="hidden sm:block" />
              <span className="text-foreground font-semibold">Lipa kwa M-Pesa, Airtel Money, au Tigo Pesa.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={plan.name}
                className={`relative p-10 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-card-hover hover:-translate-y-2 overflow-hidden group animate-scale-in ${
                  plan.popular ? "md:scale-105 border-2 border-primary/50 shadow-2xl shadow-primary/20" : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-primary to-accent text-xs font-bold text-primary-foreground shadow-lg">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10">
                  <div className="mb-8">
                    <h3 className="text-3xl font-bold text-foreground mb-3">{plan.name}</h3>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-6xl font-black text-foreground">{plan.price}</span>
                      {plan.currency && (
                        <span className="text-muted-foreground text-lg">{plan.currency}</span>
                      )}
                      {plan.period && (
                        <span className="text-muted-foreground text-lg">/{plan.period}</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>

                  <ul className="space-y-4 mb-10">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    onClick={() => handlePlanSelect(plan.name)}
                    disabled={user && userProfile?.subscription_plan === plan.planId}
                    className={`w-full ${
                      plan.popular 
                        ? "bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-lg font-bold shadow-lg hover:shadow-glow" 
                        : "border-2 border-primary/30 hover:border-primary/60 hover:bg-primary/10"
                    } transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {user && userProfile?.subscription_plan === plan.planId ? "Current Plan" : plan.cta}
                    {(!user || userProfile?.subscription_plan !== plan.planId) && (
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    )}
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Trust Message */}
          <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: "400ms" }}>
            <p className="text-muted-foreground mb-2">
              Bei nafuu kwa Watanzania. Tunaweza kulipa kwa M-Pesa, Airtel Money, au Tigo Pesa.
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Affordable prices for Tanzanians. Pay with M-Pesa, Airtel Money, or Tigo Pesa.
            </p>
            <p className="text-sm text-muted-foreground">
              Dhamana ya kurudi pesa kwa siku 30 kwa mipango yote ya kulipia. 30-day money-back guarantee on all paid plans.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots-pattern opacity-10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-6">
              Why Choose <span className="text-gradient">Us</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing the best experience for all our users
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card 
                key={index}
                className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <div className="text-primary">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <HelpCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Frequently Asked Questions</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-6">
              Got <span className="text-gradient">Questions?</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              We've got answers. If you can't find what you're looking for, contact our support team.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card 
                key={index}
                className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <h3 className="text-xl font-bold text-foreground mb-3 flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-muted-foreground leading-relaxed pl-8">
                  {faq.answer}
                </p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Still have questions?
            </p>
            <Link to="/pricing">
              <Button 
                variant="outline"
                className="border-2 border-primary/30 hover:border-primary/60 hover:bg-primary/10"
              >
                Contact Support
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-accent/15 to-primary/15" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: "2s" }} />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-morphism-light mb-10 border border-primary/30">
            <Rocket className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Ready to Get Started?</span>
          </div>
          
          <h2 className="text-5xl sm:text-6xl font-black text-foreground mb-8 leading-tight">
            Start Building
            <br />
            <span className="text-gradient bg-[length:200%_auto] animate-gradient">
              Today
            </span>
          </h2>
          
          <p className="text-xl sm:text-2xl text-muted-foreground mb-14 max-w-3xl mx-auto leading-relaxed">
            Join thousands of creators building beautiful websites with AI.
            <br className="hidden sm:block" />
            Start your journey today—it's <span className="text-foreground font-bold">completely free</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg"
              onClick={() => {
                if (user) {
                  navigate("/dashboard");
                } else {
                  setAuthMode("signup");
                  setAuthDialogOpen(true);
                }
              }}
              className="group relative bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-xl px-12 py-8 h-auto rounded-2xl shadow-2xl shadow-primary/40 hover:shadow-glow-lg transition-all duration-300 hover:scale-110 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-3 font-bold">
                <Sparkles className="w-6 h-6 animate-pulse" />
                {user ? "Start Building Now" : "Get Started"}
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>
              <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 blur-3xl transition-opacity" />
            </Button>
          </div>
        </div>
      </section>

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
          userId={user?.id}
          userEmail={user?.email}
          userName={userProfile?.full_name || undefined}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default Pricing;

