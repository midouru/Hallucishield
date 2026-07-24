import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function CTA() {
    const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden py-32">
      {/* Background Glow */}

      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/15 blur-[150px]" />
      </div>

      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-[32px] border border-white/10 bg-slate-900/70 p-12 text-center backdrop-blur-xl"
        >
          <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
            Ready to Build?
          </span>

          <h2 className="mt-6 text-4xl font-bold md:text-6xl">
            Build AI That
            <span className="block bg-gradient-to-r from-indigo-400 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
              People Can Trust
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Detect hallucinations, verify responses with trusted evidence,
            and deploy AI applications with confidence.
          </p>

          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
            <button
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 font-semibold transition-all duration-300 hover:bg-indigo-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]"
                onClick={() => navigate("/dashboard")}
                >
                Go to HalluciShield

                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>

            <button
            onClick={() =>
            window.open(
            "https://github.com/midouru/Hallucishield",
            "_blank",
      
            "noopener,noreferrer"
            )
            }
         className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-semibold backdrop-blur transition-all duration-300 hover:border-indigo-500/40 hover:bg-white/10"
            >
        <Github className="h-5 w-5" />

        View GitHub
        </button>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <span>✓ Open Source</span>
            <span>✓ API Ready</span>
            <span>✓ TypeScript</span>
            <span>✓ React</span>
            <span>✓ Production Ready</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}