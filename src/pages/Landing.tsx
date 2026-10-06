import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "3,000",
    who: "A single shop or service",
    points: ["3 websites", "Mobile layout", "Email support in Swahili or English"],
    cta: "Start with Starter",
  },
  {
    name: "Pro",
    price: "10,000",
    who: "A business that keeps adding pages",
    points: ["Unlimited websites", "WhatsApp support", "Help with your own domain"],
    cta: "Choose Pro",
    marked: true,
  },
  {
    name: "Business",
    price: "25,000",
    who: "A team that wants someone on the phone",
    points: ["A named account manager", "Training for up to 5 people", "Payments on the site"],
    cta: "Talk to us",
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main>
        <section className="px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-start">
            <div>
              <p className="text-sm font-medium text-primary mb-4">Websites for Tanzanian businesses</p>
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.15] max-w-xl">
                Your shop needs a website. You don't need a developer.
              </h1>
              <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-lg">
                Describe the business in Swahili or English. Webfasta writes the page, you fix the words, and you pay with M-Pesa, Airtel Money, or Tigo Pesa.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="h-11 px-5">
                  <Link to="/pricing">
                    See plans
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-11 px-5">
                  <Link to="/features">What you can build</Link>
                </Button>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                Starter is 3,000 TSH a month. No bank card.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="h-10 border-b border-border flex items-center gap-2 px-3">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-300/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                <span className="ml-2 text-xs text-muted-foreground">darcafe.co.tz</span>
              </div>
              <div className="grid sm:grid-cols-[1fr_1.15fr] min-h-[280px]">
                <div className="hidden sm:flex flex-col gap-3 p-4 border-r border-border bg-background/40">
                  <p className="text-xs text-muted-foreground">You wrote</p>
                  <p className="text-sm leading-relaxed">
                    “Duka la nguo Kariakoo. Tunauza vitambaa na sare. Wateja wapige simu kuagiza.”
                  </p>
                  <p className="text-xs text-muted-foreground pt-2">Webfasta answered</p>
                  <p className="text-sm leading-relaxed text-foreground/90">
                    Homepage, a short catalogue, and a call button. Change any line before you publish.
                  </p>
                </div>
                <div className="p-5 bg-white text-slate-900">
                  <p className="text-[11px] tracking-wide uppercase text-sky-700">Kariakoo Textiles</p>
                  <p className="mt-2 text-xl font-semibold leading-snug">Vitambaa na sare, tayari kuagiza.</p>
                  <p className="mt-2 text-sm text-slate-600">Fungua duka kila siku. Piga simu, tutakutengenezea.</p>
                  <div className="mt-4 inline-flex rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white">
                    Piga simu
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 py-16 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold tracking-tight">Who this is for</h2>
            <div className="mt-8 grid md:grid-cols-3 gap-px bg-border rounded-xl overflow-hidden border border-border">
              {[
                ["A shop", "You need a page people can open from WhatsApp, with your phone number and what you sell."],
                ["A service", "A salon, clinic, or garage that wants hours, prices, and a way to book."],
                ["A first website", "You can explain the business. You don't want to learn HTML to get online."],
              ].map(([title, body]) => (
                <div key={title} className="bg-background p-6">
                  <h3 className="font-medium">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 py-16 border-t border-border">
          <div className="max-w-6xl mx-auto grid md:grid-cols-[220px_1fr] gap-10">
            <h2 className="text-2xl font-semibold tracking-tight">How it works</h2>
            <ol className="divide-y divide-border border-y border-border">
              {[
                ["Write the brief", "Say what you sell, where you are, and how customers should reach you."],
                ["Edit the page", "The builder shows the site next to the code. Change a sentence and look again."],
                ["Pay by phone", "Starter, Pro, and Business are billed in TSH through mobile money."],
              ].map(([title, body], index) => (
                <li key={title} className="grid sm:grid-cols-[2rem_1fr] gap-4 py-5">
                  <span className="text-sm text-muted-foreground">{index + 1}</span>
                  <div>
                    <h3 className="font-medium">{title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 py-16 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Prices</h2>
                <p className="mt-2 text-sm text-muted-foreground">TSH per month. Pay with M-Pesa, Airtel Money, or Tigo Pesa.</p>
              </div>
              <Link to="/pricing" className="text-sm text-primary hover:underline">
                Full pricing
              </Link>
            </div>
            <div className="mt-8 grid md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-xl border p-6 flex flex-col ${
                    plan.marked ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-medium">{plan.name}</h3>
                    {plan.marked && <span className="text-xs text-primary">Most chosen</span>}
                  </div>
                  <p className="mt-4 text-3xl font-semibold tracking-tight">
                    {plan.price}
                    <span className="ml-1 text-sm font-normal text-muted-foreground">TSH</span>
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{plan.who}</p>
                  <ul className="mt-5 space-y-2 text-sm flex-1">
                    {plan.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <Button asChild variant={plan.marked ? "default" : "outline"} className="mt-6 w-full">
                    <Link to="/pricing">{plan.cta}</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 py-16 border-t border-border">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Open the builder when you have an account.</h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-md">
                Sign up on the pricing page, pick a plan, then write the first brief.
              </p>
            </div>
            <Button asChild size="lg" className="h-11 px-5 shrink-0">
              <Link to="/pricing">
                Create an account
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
