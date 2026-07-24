import {
  Shield,
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
} from "lucide-react";

const GITHUB_URL = "https://github.com/midouru/Hallucishield";
const LINKEDIN_URL = "https://www.linkedin.com/in/mridul-tripathi-272b9a256/";
const EMAIL = "mailto:mridultripathi869@gmail.com";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/60 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Left */}

          <div>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-indigo-500/10 p-2">
                <Shield className="h-6 w-6 text-indigo-400" />
              </div>

              <h2 className="text-2xl font-bold">
                HalluciShield
              </h2>
            </div>

            <p className="mt-5 max-w-md leading-7 text-slate-400">
              An AI verification middleware that detects hallucinations,
              retrieves supporting evidence, and builds trust through
              explainable AI responses.
            </p>
          </div>

          {/* Right */}

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-white">
                Platform
              </h3>

              <div className="mt-5 space-y-3">
                <a
                  href="#features"
                  className="block text-slate-400 transition hover:text-white"
                >
                  Features
                </a>

                <a
                  href="#verification"
                  className="block text-slate-400 transition hover:text-white"
                >
                  Verification
                </a>

                <a
                  href="#security"
                  className="block text-slate-400 transition hover:text-white"
                >
                  Security
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white">
                Connect
              </h3>

              <div className="mt-5 space-y-3">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-400 transition hover:text-white"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                  <ArrowUpRight className="h-4 w-4" />
                </a>

                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-400 transition hover:text-white"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                  <ArrowUpRight className="h-4 w-4" />
                </a>

                <a
                  href={EMAIL}
                  className="flex items-center gap-2 text-slate-400 transition hover:text-white"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-slate-500 md:flex-row">
          <p>© 2026 HalluciShield. All rights reserved.</p>

          <p>Built with React • TypeScript • Tailwind • Framer Motion</p>
        </div>
      </div>
    </footer>
  );
}