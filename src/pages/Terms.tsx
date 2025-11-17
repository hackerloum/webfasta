import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Terms of Service
            </h1>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <Card className="p-8 bg-card border-border">
            <div className="prose prose-invert max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3">Agreement to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing or using AI Website Builder, you agree to be bound by these Terms of Service 
                  and all applicable laws and regulations. If you do not agree with any of these terms, you 
                  are prohibited from using this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3">Use License</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Permission is granted to use AI Website Builder for personal or commercial purposes, subject 
                  to the following restrictions:
                </p>
                <ul className="space-y-2 text-muted-foreground ml-6">
                  <li className="list-disc">You must not reverse engineer or attempt to extract the source code</li>
                  <li className="list-disc">You must not use the service for any illegal purposes</li>
                  <li className="list-disc">You must not attempt to overload or disrupt our servers</li>
                  <li className="list-disc">You must not impersonate others or provide false information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3">Generated Content Ownership</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You retain all rights to the code and content generated using our platform. We claim no 
                  ownership over your generated websites. However, we reserve the right to use anonymized 
                  data to improve our AI models.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3">Account Responsibilities</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  When creating an account, you agree to:
                </p>
                <ul className="space-y-2 text-muted-foreground ml-6">
                  <li className="list-disc">Provide accurate and complete information</li>
                  <li className="list-disc">Maintain the security of your account credentials</li>
                  <li className="list-disc">Notify us immediately of any unauthorized access</li>
                  <li className="list-disc">Be responsible for all activities under your account</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3">Service Availability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We strive to maintain 99.9% uptime but do not guarantee uninterrupted access to the service. 
                  We may temporarily suspend the service for maintenance, updates, or other technical reasons.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3">Prohibited Activities</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You may not use our service to:
                </p>
                <ul className="space-y-2 text-muted-foreground ml-6">
                  <li className="list-disc">Generate malicious code or phishing websites</li>
                  <li className="list-disc">Create content that violates intellectual property rights</li>
                  <li className="list-disc">Harass, abuse, or harm others</li>
                  <li className="list-disc">Distribute malware or viruses</li>
                  <li className="list-disc">Engage in any illegal activities</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3">Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  AI Website Builder shall not be liable for any indirect, incidental, special, consequential, 
                  or punitive damages resulting from your use of or inability to use the service. The generated 
                  code is provided "as is" without warranties of any kind.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3">Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to terminate or suspend your account and access to the service at our 
                  sole discretion, without notice, for conduct that we believe violates these Terms of Service 
                  or is harmful to other users, us, or third parties, or for any other reason.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3">Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these terms at any time. We will notify users of any material 
                  changes via email or through the service. Your continued use of the service after such 
                  modifications constitutes acceptance of the updated terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3">Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These terms shall be governed by and construed in accordance with applicable laws, without 
                  regard to its conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3">Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at support@aibuilder.com
                </p>
              </section>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;
