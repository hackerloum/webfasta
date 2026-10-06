import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const steps = [
  {
    n: "01",
    title: "Describe the shop",
    body: "Write what you sell, the neighbourhood, opening days, and the phone number customers should use. Swahili or English both work. A few sentences are enough.",
  },
  {
    n: "02",
    title: "Edit the page",
    body: "Webfasta drafts a homepage from that description. The page sits next to the text. Change a price, a street, or a sentence, then look again before anything is public.",
  },
  {
    n: "03",
    title: "Pay by phone",
    body: "Starter is 3,000 TSH a month, Pro is 10,000 TSH, Business is 25,000 TSH. Pay with M-Pesa, Airtel Money, or Tigo Pesa. A bank card is not required.",
  },
];

const onThePage = [
  ["Name and place", "The shop name, the area, and a line a customer understands in one glance."],
  ["What you sell", "A short list: vitambaa, sare, a service menu, or the jobs you take."],
  ["How to reach you", "A phone number a person can tap from WhatsApp, plus the days you are open."],
  ["Words you can fix", "Prices, hours, and sentences stay editable. You are not handed a locked template."],
];

const Features = () => {
  return (
    <div className="min-h-screen bg-paper bg-[#f4f0e8] font-sans text-ink text-[#1a1814]">
      <Navbar />

      <main>
        <section className="px-4 sm:px-6 lg:px-8 pt-28 pb-14">
          <div className="max-w-3xl">
            <p className="text-sm text-mute text-[#6b645b]">What the product does</p>
            <h1 className="mt-3 max-w-xl font-display font-['Newsreader',serif] text-4xl sm:text-5xl font-normal leading-[1.15] tracking-tight">
              A page for the shop, written from a description.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-mute text-[#6b645b]">
              You say what the business sells and how customers should call. Webfasta writes the first version. You correct it. You pay with mobile money.
            </p>
          </div>
        </section>

        <section className="border-t border-line border-[#e4ddd2] px-4 sm:px-6 lg:px-8 py-14">
          <div className="max-w-5xl">
            <h2 className="font-display font-['Newsreader',serif] text-3xl font-normal tracking-tight">
              A cloth shop in Kariakoo
            </h2>
            <p className="mt-3 max-w-xl text-mute text-[#6b645b] leading-relaxed">
              The shop sells vitambaa and school uniforms. The owner does not want a developer. They want a link they can send on WhatsApp.
            </p>

            <div className="mt-8 grid md:grid-cols-2 border border-line border-[#e4ddd2]">
              <div className="p-5 sm:p-6 border-b md:border-b-0 md:border-r border-line border-[#e4ddd2]">
                <p className="text-xs uppercase tracking-[0.14em] text-mute text-[#6b645b]">What she types</p>
                <p className="mt-4 leading-relaxed">
                  “Duka la nguo Kariakoo. Tunauza vitambaa na sare za shule. Wateja wapige simu kuagiza. Fungua Jumatatu hadi Jumamosi.”
                </p>
              </div>
              <div className="bg-card bg-[#fbf9f5] p-5 sm:p-6">
                <p className="text-xs uppercase tracking-[0.14em] text-mute text-[#6b645b]">What the page shows</p>
                <p className="mt-4 font-display font-['Newsreader',serif] text-2xl leading-snug">
                  Vitambaa na sare, Kariakoo
                </p>
                <p className="mt-3 text-sm leading-relaxed text-mute text-[#6b645b]">
                  Order by phone. The shop is open Monday to Saturday.
                </p>
                <ul className="mt-4 space-y-1 text-sm">
                  <li>Kitenge and school uniforms</li>
                  <li>Kariakoo, Dar es Salaam</li>
                  <li>A call button with the shop number</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-line border-[#e4ddd2] px-4 sm:px-6 lg:px-8 py-14">
          <div className="max-w-3xl">
            <h2 className="font-display font-['Newsreader',serif] text-3xl font-normal tracking-tight">
              Three steps, then the site is hers
            </h2>
            <ol className="mt-8 border-t border-line border-[#e4ddd2]">
              {steps.map((step) => (
                <li key={step.n} className="grid sm:grid-cols-[3.5rem_1fr] gap-2 sm:gap-6 py-6 border-b border-line border-[#e4ddd2]">
                  <span className="text-sm text-mute text-[#6b645b]">{step.n}</span>
                  <div>
                    <h3 className="font-display font-['Newsreader',serif] text-xl font-normal">{step.title}</h3>
                    <p className="mt-2 leading-relaxed text-mute text-[#6b645b]">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-t border-line border-[#e4ddd2] px-4 sm:px-6 lg:px-8 py-14">
          <div className="max-w-3xl">
            <h2 className="font-display font-['Newsreader',serif] text-3xl font-normal tracking-tight">
              What stays on the page
            </h2>
            <dl className="mt-8 border-t border-line border-[#e4ddd2]">
              {onThePage.map(([title, body]) => (
                <div key={title} className="grid sm:grid-cols-[11rem_1fr] gap-2 sm:gap-8 py-5 border-b border-line border-[#e4ddd2]">
                  <dt className="font-medium">{title}</dt>
                  <dd className="leading-relaxed text-mute text-[#6b645b]">{body}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 text-sm leading-relaxed text-mute text-[#6b645b]">
              Starter includes 3 websites and email support in Swahili or English. Pro adds more sites and WhatsApp support. Business adds a named contact and training for up to five people.
            </p>
            <Link
              to="/pricing"
              className="mt-4 inline-block text-sm underline underline-offset-4 decoration-[#146c43] text-moss text-[#146c43]"
            >
              See the three prices
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Features;
