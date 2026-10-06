import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-paper bg-[#f4f0e8] font-sans text-ink text-[#1a1814]">
      <Navbar />

      <main className="px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-2xl">
          <p className="text-sm text-mute text-[#6b645b]">Legal</p>
          <h1 className="mt-3 font-display font-['Newsreader',serif] text-4xl sm:text-5xl font-normal tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-mute text-[#6b645b]">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="mt-10 border-t border-line border-[#e4ddd2]">
            <section className="py-6 border-b border-line border-[#e4ddd2]">
              <h2 className="font-display font-['Newsreader',serif] text-2xl font-normal">Introduction</h2>
              <p className="mt-3 leading-relaxed text-mute text-[#6b645b]">
                At AI Website Builder, we take your privacy seriously. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you use our website building platform.
              </p>
            </section>

            <section className="py-6 border-b border-line border-[#e4ddd2]">
              <h2 className="font-display font-['Newsreader',serif] text-2xl font-normal">Information We Collect</h2>
              <p className="mt-3 leading-relaxed text-mute text-[#6b645b]">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="mt-3 space-y-2 leading-relaxed text-mute text-[#6b645b] list-disc pl-5">
                <li>Account information (email, username, password)</li>
                <li>Website content and code you generate</li>
                <li>Usage data and analytics</li>
                <li>Communication preferences</li>
              </ul>
            </section>

            <section className="py-6 border-b border-line border-[#e4ddd2]">
              <h2 className="font-display font-['Newsreader',serif] text-2xl font-normal">How We Use Your Information</h2>
              <p className="mt-3 leading-relaxed text-mute text-[#6b645b]">
                We use the information we collect to:
              </p>
              <ul className="mt-3 space-y-2 leading-relaxed text-mute text-[#6b645b] list-disc pl-5">
                <li>Provide and maintain our services</li>
                <li>Improve and personalize your experience</li>
                <li>Generate AI-powered code based on your requests</li>
                <li>Send you technical notices and support messages</li>
                <li>Detect and prevent fraud or abuse</li>
              </ul>
            </section>

            <section className="py-6 border-b border-line border-[#e4ddd2]">
              <h2 className="font-display font-['Newsreader',serif] text-2xl font-normal">Data Storage and Security</h2>
              <p className="mt-3 leading-relaxed text-mute text-[#6b645b]">
                We implement appropriate technical and organizational measures to protect your personal
                information. Your data is encrypted in transit and at rest. We store your information on
                secure servers and limit access to authorized personnel only.
              </p>
            </section>

            <section className="py-6 border-b border-line border-[#e4ddd2]">
              <h2 className="font-display font-['Newsreader',serif] text-2xl font-normal">Your Generated Code</h2>
              <p className="mt-3 leading-relaxed text-mute text-[#6b645b]">
                The code you generate using our platform belongs to you. We may temporarily store your
                generated code to provide the service, but we do not claim ownership or use it for any
                purpose other than improving our AI models (in an anonymized way).
              </p>
            </section>

            <section className="py-6 border-b border-line border-[#e4ddd2]">
              <h2 className="font-display font-['Newsreader',serif] text-2xl font-normal">Cookies and Tracking</h2>
              <p className="mt-3 leading-relaxed text-mute text-[#6b645b]">
                We use cookies and similar tracking technologies to track activity on our platform and
                store certain information. You can instruct your browser to refuse all cookies or to
                indicate when a cookie is being sent.
              </p>
            </section>

            <section className="py-6 border-b border-line border-[#e4ddd2]">
              <h2 className="font-display font-['Newsreader',serif] text-2xl font-normal">Third-Party Services</h2>
              <p className="mt-3 leading-relaxed text-mute text-[#6b645b]">
                We may use third-party services for analytics, hosting, and AI processing. These services
                may collect information sent by your browser as part of a web page request, such as cookies
                or your IP address.
              </p>
            </section>

            <section className="py-6 border-b border-line border-[#e4ddd2]">
              <h2 className="font-display font-['Newsreader',serif] text-2xl font-normal">Your Rights</h2>
              <p className="mt-3 leading-relaxed text-mute text-[#6b645b]">
                You have the right to:
              </p>
              <ul className="mt-3 space-y-2 leading-relaxed text-mute text-[#6b645b] list-disc pl-5">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Export your data</li>
              </ul>
            </section>

            <section className="py-6 border-b border-line border-[#e4ddd2]">
              <h2 className="font-display font-['Newsreader',serif] text-2xl font-normal">Children's Privacy</h2>
              <p className="mt-3 leading-relaxed text-mute text-[#6b645b]">
                Our service is not intended for children under 13 years of age. We do not knowingly collect
                personal information from children under 13.
              </p>
            </section>

            <section className="py-6 border-b border-line border-[#e4ddd2]">
              <h2 className="font-display font-['Newsreader',serif] text-2xl font-normal">Changes to This Policy</h2>
              <p className="mt-3 leading-relaxed text-mute text-[#6b645b]">
                We may update this Privacy Policy from time to time. We will notify you of any changes by
                posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="py-6 border-b border-line border-[#e4ddd2]">
              <h2 className="font-display font-['Newsreader',serif] text-2xl font-normal">Contact Us</h2>
              <p className="mt-3 leading-relaxed text-mute text-[#6b645b]">
                If you have any questions about this Privacy Policy, please contact us at privacy@aibuilder.com
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
