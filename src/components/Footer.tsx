import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-paper border-t border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-2">
            <Link to="/" className="font-display text-2xl text-ink">
              Webfasta
            </Link>

            <p className="mt-4 text-sm text-mute max-w-md leading-relaxed">
              Websites for shops and services in Tanzania. Describe the business, edit the page, pay with mobile money.
            </p>

            <div className="mt-6">
              <p className="text-sm text-ink mb-2">Notes on new plans</p>
              <div className="flex gap-2 max-w-md">
                <Input
                  type="email"
                  placeholder="Email address"
                  className="bg-card border-line rounded-sm shadow-none"
                />
                <Button type="button" variant="outline">
                  Send
                </Button>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <a
                href="#"
                className="w-9 h-9 border border-line flex items-center justify-center text-mute hover:text-ink"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 border border-line flex items-center justify-center text-mute hover:text-ink"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 border border-line flex items-center justify-center text-mute hover:text-ink"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-sans text-sm font-medium text-ink mb-4">Product</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/features" className="text-sm text-mute hover:text-ink">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-mute hover:text-ink">
                  About
                </Link>
              </li>
              <li>
                <Link to="/builder" className="text-sm text-mute hover:text-ink">
                  Builder
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-mute hover:text-ink">
                  Pricing
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-mute hover:text-ink">
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-sm font-medium text-ink mb-4">Legal</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/privacy" className="text-sm text-mute hover:text-ink">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-mute hover:text-ink">
                  Terms
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-mute hover:text-ink">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-mute hover:text-ink">
                  Licenses
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-line pt-6">
          <p className="text-sm text-mute">
            © {new Date().getFullYear()} Webfasta. Dar es Salaam. Prices in TSH.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
