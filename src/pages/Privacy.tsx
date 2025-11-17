import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <Card className="p-8 bg-card border-border">
            <div className="prose prose-invert max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3">Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  At AI Website Builder, we take your privacy seriously. This Privacy Policy explains how we 
                  collect, use, disclose, and safeguard your information when you use our website building platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3">Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="space-y-2 text-muted-foreground ml-6">
                  <li className="list-disc">Account information (email, username, password)</li>
                  <li className="list-disc">Website content and code you generate</li>
                  <li className="list-disc">Usage data and analytics</li>
                  <li className="list-disc">Communication preferences</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3">How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="space-y-2 text-muted-foreground ml-6">
                  <li className="list-disc">Provide and maintain our services</li>
                  <li className="list-disc">Improve and personalize your experience</li>
                  <li className="list-disc">Generate AI-powered code based on your requests</li>
                  <li className="list-disc">Send you technical notices and support messages</li>
                  <li className="list-disc">Detect and prevent fraud or abuse</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3">Data Storage and Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal 
                  information. Your data is encrypted in transit and at rest. We store your information on 
                  secure servers and limit access to authorized personnel only.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3">Your Generated Code</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The code you generate using our platform belongs to you. We may temporarily store your 
                  generated code to provide the service, but we do not claim ownership or use it for any 
                  purpose other than improving our AI models (in an anonymized way).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3">Cookies and Tracking</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use cookies and similar tracking technologies to track activity on our platform and 
                  store certain information. You can instruct your browser to refuse all cookies or to 
                  indicate when a cookie is being sent.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3">Third-Party Services</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may use third-party services for analytics, hosting, and AI processing. These services 
                  may collect information sent by your browser as part of a web page request, such as cookies 
                  or your IP address.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3">Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="space-y-2 text-muted-foreground ml-6">
                  <li className="list-disc">Access your personal data</li>
                  <li className="list-disc">Correct inaccurate data</li>
                  <li className="list-disc">Request deletion of your data</li>
                  <li className="list-disc">Object to processing of your data</li>
                  <li className="list-disc">Export your data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3">Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our service is not intended for children under 13 years of age. We do not knowingly collect 
                  personal information from children under 13.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3">Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by 
                  posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3">Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at privacy@aibuilder.com
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

export default Privacy;
