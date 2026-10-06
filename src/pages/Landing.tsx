import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

const shopLines = [
  ["Kanga", "25,000 TSH"],
  ["Sare ya shule", "18,000 TSH"],
  ["Vitambaa, kwa mita", "12,000 TSH"],
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar />

      <main>
        <section className="px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] gap-12 lg:gap-16 items-start">
            <div>
              <p className="text-sm text-moss">Dar es Salaam · TSH</p>
              <h1 className="mt-3 font-display text-4xl sm:text-5xl font-medium leading-[1.12] max-w-xl">
                A page for the shop. A link you can send on WhatsApp.
              </h1>
              <p className="mt-5 text-base sm:text-lg text-mute leading-relaxed max-w-lg">
                Write what you sell, in Swahili or English. Webfasta makes the page. You change the words, then pay with M-Pesa, Airtel Money, or Tigo Pesa.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Button asChild>
                  <Link to="/pricing">See plans</Link>
                </Button>
                <Link
                  to="/features"
                  className="text-sm text-ink underline underline-offset-4 decoration-line hover:decoration-moss"
                >
                  What you can build
                </Link>
              </div>
              <p className="mt-5 text-sm text-mute">Starter is 3,000 TSH a month.</p>
            </div>

            <div className="border border-line bg-card">
              <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
                <p className="text-xs text-mute">kariakoo-textiles.co.tz</p>
                <p className="text-xs text-moss">Live</p>
              </div>
              <div className="px-5 py-6">
                <p className="text-[11px] uppercase tracking-[0.16em] text-moss">Kariakoo Textiles</p>
                <p className="mt-2 font-display text-3xl leading-tight">Vitambaa na sare, tayari kuagiza.</p>
                <p className="mt-3 text-sm text-mute leading-relaxed">
                  Duka la nguo, Kariakoo. Fungua kila siku. Wateja wapige simu kuagiza.
                </p>
                <dl className="mt-6 border-t border-line">
                  {shopLines.map(([item, price]) => (
                    <div key={item} className="flex items-baseline justify-between gap-4 border-b border-line py-2 text-sm">
                      <dt>{item}</dt>
                      <dd className="tabular-nums text-mute">{price}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 text-sm">Piga simu · 0712 000 000</p>
                <p className="mt-1 text-xs text-mute">Lipa kwa M-Pesa, Airtel Money, au Tigo Pesa.</p>
              </div>
              <p className="border-t border-line px-5 py-3 text-xs text-mute leading-relaxed">
                Written from: “Duka la nguo Kariakoo. Tunauza vitambaa na sare. Wateja wapige simu kuagiza.”
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-line px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-6xl mx-auto grid md:grid-cols-[12rem_1fr] gap-8">
            <h2 className="font-display text-3xl">Who it is for</h2>
            <div className="border-y border-line divide-y divide-line">
              {[
                ["A shop", "A page with your phone number and what you sell, sent as a link on WhatsApp."],
                ["A service", "A salon, clinic, or garage that needs hours, prices, and a way to book."],
                ["A first website", "You can explain the business. You do not need to learn HTML."],
              ].map(([title, body]) => (
                <div key={title} className="grid sm:grid-cols-[9rem_1fr] gap-2 sm:gap-6 py-4">
                  <h3 className="font-sans text-sm font-medium">{title}</h3>
                  <p className="text-sm text-mute leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-line px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-6xl mx-auto grid md:grid-cols-[12rem_1fr] gap-8">
            <h2 className="font-display text-3xl">How it works</h2>
            <ol className="border-y border-line divide-y divide-line">
              {[
                ["Write the brief", "Say what you sell, where you are, and how customers should reach you."],
                ["Edit the page", "The builder shows the site next to the words. Change a sentence and look again."],
                ["Pay by phone", "Starter, Pro, and Business are billed in TSH through mobile money."],
              ].map(([title, body], index) => (
                <li key={title} className="grid sm:grid-cols-[2rem_1fr] gap-3 py-4">
                  <span className="text-sm text-mute">{index + 1}</span>
                  <div>
                    <h3 className="font-sans text-sm font-medium">{title}</h3>
                    <p className="mt-1 text-sm text-mute leading-relaxed">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-t border-line px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <h2 className="font-display text-3xl">Plans</h2>
                <p className="mt-2 text-sm text-mute">TSH per month. M-Pesa, Airtel Money, or Tigo Pesa.</p>
              </div>
              <Link to="/pricing" className="text-sm text-moss underline underline-offset-4">
                Full pricing
              </Link>
            </div>
            <div className="mt-8 grid md:grid-cols-3 border border-line">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`flex flex-col p-6 border-b border-line last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 ${
                    plan.marked ? "bg-card" : "bg-paper"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-sans text-sm font-medium">{plan.name}</h3>
                    {plan.marked && <span className="text-xs text-moss">Middle plan</span>}
                  </div>
                  <p className="mt-4 font-display text-4xl leading-none">
                    {plan.price}
                    <span className="ml-2 font-sans text-sm font-normal text-mute">TSH</span>
                  </p>
                  <p className="mt-3 text-sm text-mute">{plan.who}</p>
                  <ul className="mt-5 space-y-2 text-sm flex-1">
                    {plan.points.map((point) => (
                      <li key={point} className="border-t border-line pt-2">
                        {point}
                      </li>
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

        <section className="border-t border-line px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <h2 className="font-display text-3xl max-w-md">Open the builder after you have an account.</h2>
              <p className="mt-3 text-sm text-mute max-w-md">
                Sign up from pricing, pick a plan, then write the first brief.
              </p>
            </div>
            <Button asChild>
              <Link to="/pricing">Create an account</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
