import { motion } from "framer-motion";
import {
  ShieldCheck,
  BadgeCheck,
  FileSearch,
  Workflow,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Source Attribution",
    description:
      "Every verified claim is linked back to supporting evidence, ensuring transparency and traceability.",
  },
  {
    icon: FileSearch,
    title: "Complete Audit Trail",
    description:
      "Every verification step is logged, making debugging, compliance, and monitoring effortless.",
  },
  {
    icon: BadgeCheck,
    title: "Confidence Scoring",
    description:
      "Each response receives a confidence score so developers can decide whether to trust, review, or reject it.",
  },
  {
    icon: Workflow,
    title: "API-First Design",
    description:
      "Integrate HalluciShield into any AI workflow with a lightweight REST API and minimal configuration.",
  },
];

export default function Security() {
  return (
    <section
      id="security"
      className="relative mx-auto max-w-7xl px-6 py-32"
    >
      {/* Background Glow */}

      <div className="absolute inset-0 -z-10">

        <div className="absolute left-1/2 top-24 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[140px]" />

      </div>

      {/* Heading */}

      <div className="text-center">

        <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
          Built for Production
        </span>

        <h2 className="mt-6 text-4xl font-bold md:text-5xl">
          Enterprise-Grade
          <span className="block text-indigo-400">
            Trust & Transparency
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400">
          HalluciShield doesn't just generate responses—it provides
          explainability, traceability, and confidence so AI systems can be
          trusted in production.
        </p>

      </div>

      {/* Cards */}

      <div className="mt-20 grid gap-8 md:grid-cols-2">

        {features.map((feature, index) => {

          const Icon = feature.icon;

          return (
            <motion.div
              key={feature.title}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="
              group
              rounded-3xl
              border
              border-white/10
              bg-slate-900/70
              p-8
              backdrop-blur-xl
              transition-all
              duration-300
              hover:-translate-y-2
              hover:border-indigo-500/40
              hover:shadow-[0_0_40px_rgba(99,102,241,0.2)]
              "
            >

              <div className="inline-flex rounded-2xl bg-indigo-500/10 p-4">

                <Icon className="h-8 w-8 text-indigo-400" />

              </div>

              <h3 className="mt-6 text-2xl font-semibold">
                {feature.title}
              </h3>

              <p className="mt-4 leading-8 text-slate-400">
                {feature.description}
              </p>

            </motion.div>
          );
        })}

      </div>
    </section>
  );
}