import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-paper bg-[#f4f0e8] font-sans text-ink text-[#1a1814]">
      <Navbar />

      <main className="px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-2xl">
          <p className="text-sm text-mute text-[#6b645b]">Legal</p>
          <h1 className="mt-3 font-display font-['Newsreader',serif] text-4xl sm:text-5xl font-normal tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-mute text-[#6b645b]">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="mt-10 border-t border-line border-[#e4ddd2]">
            <section className="py-6 border-b border-line border-[#e4ddd2]">
              <h2 className="font-display font-['Newsreader',serif] text-2xl font-normal">Agreement to Terms</h2>
              <p className="mt-3 leading-relaxed text-mute text-[#6b645b]">
                By accessing or using AI Website Builder, you agree to be bound by these Terms of Service
                and all applicable laws and regulations. If you do not agree with any of these terms, you
                are prohibited from using this service.
              </p>
            </section>

            <section className="py-6 border-b border-line border-[#e4ddd2]">
              <h2 className="font-display font-['Newsreader',serif] text-2xl font-normal">Use License</h2>
              <p className="mt-3 leading-relaxed text-mute text-[#6b645b]">
                Permission is granted to use AI Website Builder for personal or commercial purposes, subject
                to the following restrictions:
              </p>
              <ul className="mt-3 space-y-2 leading-relaxed text-mute text-[#6b645b] list-disc pl-5">
                <li>You must not reverse engineer or attempt to extract the source code</li>
                <li>You must not use the service for any illegal purposes</li>
                <li>You must not attempt to overload or disrupt our servers</li>
                <li>You must not impersonate others or provide false information</li>
              </ul>
            </section>

            <section className="py-6 border-b border-line border-[#e4ddd2]">
              <h2 className="font-display font-['Newsreader',serif] text-2xl font-normal">Generated Content Ownership</h2>
              <p className="mt-3 leading-relaxed text-mute text-[#6b645b]">
                You retain all rights to the code and content generated using our platform. We claim no
                ownership over your generated websites. However, we reserve the right to use anonymized
                data to improve our AI models.
              </p>
            </section>

            <section className="py-6 border-b border-line border-[#e4ddd2]">
              <h2 className="font-display font-['Newsreader',serif] text-2xl font-normal">Account Responsibilities</h2>
              <p className="mt-3 leading-relaxed text-mute text-[#6b645b]">
                When creating an account, you agree to:
              </p>
              <ul className="mt-3 space-y-2 leading-relaxed text-mute text-[#6b645b] list-disc pl-5">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Be responsible for all activities under your account</li>
              </ul>
            </section>

            <section className="py-6 border-b border-line border-[#e4ddd2]">
              <h2 className="font-display font-['Newsreader',serif] text-2xl font-normal">Service Availability</h2>
              <p className="mt-3 leading-relaxed text-mute text-[#6b645b]">
                We strive to maintain 99.9% uptime but do not guarantee uninterrupted access to the service.
                We may temporarily suspend the service for maintenance, updates, or other technical reasons.
              </p>
            </section>

            <section className="py-6 border-b border-line border-[#e4ddd2]">
              <h2 className="font-display font-['Newsreader',serif] text-2xl font-normal">Prohibited Activities</h2>
              <p className="mt-3 leading-relaxed text-mute text-[#6b645b]">
                You may not use our service to:
              </p>
              <ul className="mt-3 space-y-2 leading-relaxed text-mute text-[#6b645b] list-disc pl-5">
                <li>Generate malicious code or phishing websites</li>
                <li>Create content that violates intellectual property rights</li>
                <li>Harass, abuse, or harm others</li>
                <li>Distribute malware or viruses</li>
                <li>Engage in any illegal activities</li>
              </ul>
            </section>

            <section className="py-6 border-b border-line border-[#e4ddd2]">
              <h2 className="font-display font-['Newsreader',serif] text-2xl font-normal">Limitation of Liability</h2>
              <p className="mt-3 leading-relaxed text-mute text-[#6b645b]">
                AI Website Builder shall not be liable for any indirect, incidental, special, consequential,
                or punitive damages resulting from your use of or inability to use the service. The generated
                code is provided "as is" without warranties of any kind.
              </p>
            </section>

            <section className="py-6 border-b border-line border-[#e4ddd2]">
              <h2 className="font-display font-['Newsreader',serif] text-2xl font-normal">Termination</h2>
              <p className="mt-3 leading-relaxed text-mute text-[#6b645b]">
                We reserve the right to terminate or suspend your account and access to the service at our
                sole discretion, without notice, for conduct that we believe violates these Terms of Service
                or is harmful to other users, us, or third parties, or for any other reason.
              </p>
            </section>

            <section className="py-6 border-b border-line border-[#e4ddd2]">
              <h2 className="font-display font-['Newsreader',serif] text-2xl font-normal">Changes to Terms</h2>
              <p className="mt-3 leading-relaxed text-mute text-[#6b645b]">
                We reserve the right to modify these terms at any time. We will notify users of any material
                changes via email or through the service. Your continued use of the service after such
                modifications constitutes acceptance of the updated terms.
              </p>
            </section>

            <section className="py-6 border-b border-line border-[#e4ddd2]">
              <h2 className="font-display font-['Newsreader',serif] text-2xl font-normal">Governing Law</h2>
              <p className="mt-3 leading-relaxed text-mute text-[#6b645b]">
                These terms shall be governed by and construed in accordance with applicable laws, without
                regard to its conflict of law provisions.
              </p>
            </section>

            <section className="py-6 border-b border-line border-[#e4ddd2]">
              <h2 className="font-display font-['Newsreader',serif] text-2xl font-normal">Contact Information</h2>
              <p className="mt-3 leading-relaxed text-mute text-[#6b645b]">
                If you have any questions about these Terms of Service, please contact us at support@aibuilder.com
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
