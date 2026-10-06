import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const people = [
  {
    title: "A shop",
    body: "You sell from a stall or a room and customers already ask for a link. The page lists what you sell, where you are, and a number they can call.",
  },
  {
    title: "A service",
    body: "A salon, a clinic, or a garage needs hours, a few prices, and a way to book. The same brief works: say what you do and when you are open.",
  },
  {
    title: "A small team",
    body: "On the Business plan, up to five people can be shown how the page is edited, and one person at Webfasta is the account contact.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-paper bg-[#f4f0e8] font-sans text-ink text-[#1a1814]">
      <Navbar />

      <main>
        <section className="px-4 sm:px-6 lg:px-8 pt-28 pb-14">
          <div className="max-w-3xl">
            <p className="text-sm text-mute text-[#6b645b]">About Webfasta</p>
            <h1 className="mt-3 max-w-xl font-display font-['Newsreader',serif] text-4xl sm:text-5xl font-normal leading-[1.15] tracking-tight">
              For owners who can explain the business and do not want to learn HTML.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-mute text-[#6b645b]">
              Webfasta is a website tool for shops and services in Tanzania. You describe the work. You fix the words. You pay by phone.
            </p>
          </div>
        </section>

        <section className="border-t border-line border-[#e4ddd2] px-4 sm:px-6 lg:px-8 py-14">
          <div className="max-w-3xl">
            <h2 className="font-display font-['Newsreader',serif] text-3xl font-normal tracking-tight">
              A normal week
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-mute text-[#6b645b]">
              <p>
                On Monday you write a short brief. A hardware shop in Mwanza might say: “Tunauza saruji, rangi, na mabomba. Duka liko Nyamagana. Wateja wapige simu kabla ya kuja.”
              </p>
              <p>
                Webfasta turns that into a page: the name, what is on the shelves, the area, and a call button. On Tuesday you correct a price that was wrong and add Saturday hours. You read it on your own phone before you send the link.
              </p>
              <p>
                When you are ready to keep the site, you pay in TSH. Starter is 3,000 a month, Pro is 10,000, Business is 25,000. M-Pesa, Airtel Money, and Tigo Pesa are the usual ways to pay. Business plans can also use a bank transfer.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-line border-[#e4ddd2] px-4 sm:px-6 lg:px-8 py-14">
          <div className="max-w-3xl">
            <h2 className="font-display font-['Newsreader',serif] text-3xl font-normal tracking-tight">
              Who it is for
            </h2>
            <div className="mt-8 border-t border-line border-[#e4ddd2]">
              {people.map((person) => (
                <div key={person.title} className="py-6 border-b border-line border-[#e4ddd2]">
                  <h3 className="font-display font-['Newsreader',serif] text-xl font-normal">{person.title}</h3>
                  <p className="mt-2 leading-relaxed text-mute text-[#6b645b]">{person.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-line border-[#e4ddd2] px-4 sm:px-6 lg:px-8 py-14">
          <div className="max-w-3xl">
            <h2 className="font-display font-['Newsreader',serif] text-3xl font-normal tracking-tight">
              Language and support
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-mute text-[#6b645b]">
              Write the brief in Kiswahili or English. Replies come in the language you use. Starter includes email. Pro adds WhatsApp. Business adds phone support and a named account manager.
            </p>
            <Link
              to="/pricing"
              className="mt-6 inline-block text-sm underline underline-offset-4 decoration-[#146c43] text-moss text-[#146c43]"
            >
              Compare plans
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
