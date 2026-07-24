import { motion } from "framer-motion";
import {
  ArrowDown,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export default function VerificationDemo() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32">
      {/* Heading */}

      <div className="text-center">
        <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
          Live Verification
        </span>

        <h2 className="mt-6 text-4xl font-bold md:text-5xl">
          See HalluciShield
          <span className="block text-indigo-400">
            Detect a Hallucination
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-400">
          Every AI response is verified against trusted evidence before being
          returned to the user.
        </p>
      </div>

      <div className="mt-20 flex flex-col items-center gap-8">
        {/* Prompt */}

        <GlassCard title="User Prompt">
          <p className="text-lg font-medium">
            Who invented Python and in which year?
          </p>
        </GlassCard>

        {/* Arrow */}

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
          }}
        >
          <ArrowDown className="h-8 w-8 text-indigo-400" />
        </motion.div>

        {/* LLM */}

        <GlassCard title="LLM Response">
          <p className="text-lg text-red-300">
            Python was invented by Dennis Ritchie in 1983.
          </p>
        </GlassCard>

        {/* Arrow */}

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
          }}
        >
          <ArrowDown className="h-8 w-8 text-indigo-400" />
        </motion.div>

        {/* Verification */}

        <GlassCard title="HalluciShield Verification">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-red-400" />

            <span className="font-semibold text-red-400">
              Hallucination Detected
            </span>
          </div>

          {/* Claim */}

          <div className="mt-8">
            <p className="text-sm uppercase tracking-wider text-slate-500">
              Claim
            </p>

            <p className="mt-2 text-lg">
              Python was invented by Dennis Ritchie in 1983.
            </p>
          </div>

          {/* Evidence */}

          <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />

              <span className="font-semibold text-emerald-400">
                Verified Evidence
              </span>
            </div>

            <p className="mt-3 text-slate-300">
              Python was created by <b>Guido van Rossum</b> and first released
              in <b>1991</b>.
            </p>
          </div>

          {/* Stats */}

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-500">
                Confidence
              </p>

              <p className="mt-2 text-3xl font-bold text-emerald-400">
                99.8%
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-500">
                Sources
              </p>

              <p className="mt-2 text-3xl font-bold">
                4
              </p>
            </div>
          </div>

          {/* Sources */}

          <div className="mt-8 flex flex-wrap gap-3">
            <SourceBadge label="Python.org" />
            <SourceBadge label="Wikipedia" />
            <SourceBadge label="Britannica" />
            <SourceBadge label="Python Docs" />
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

function GlassCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl rounded-3xl border border-white/10 bg-slate-900/70 p-8 backdrop-blur-xl"
    >
      <p className="mb-6 text-sm font-medium text-slate-400">
        {title}
      </p>

      {children}
    </motion.div>
  );
}

function SourceBadge({
  label,
}: {
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
      <ExternalLink className="h-4 w-4 text-indigo-400" />

      <span>{label}</span>
    </div>
  );
}