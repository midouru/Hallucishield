import { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Search,
  Database,
  Bot,
  FileCheck,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";

const steps = [
  {
    title: "User Query",
    icon: MessageSquare,
    description: "The user submits a prompt to the AI application.",
    tech: ["User Prompt"],
  },
  {
    title: "Query Expansion",
    icon: Search,
    description:
      "Expand the prompt to improve retrieval quality and capture user intent.",
    tech: ["Semantic Expansion"],
  },
  {
    title: "Hybrid Retrieval",
    icon: Database,
    description:
      "Retrieve evidence using both ChromaDB vector search and live web search.",
    tech: ["ChromaDB", "Tavily", "Jina AI"],
  },
  {
    title: "Grounded Answer",
    icon: Bot,
    description:
      "Generate an answer using the retrieved evidence instead of raw model memory.",
    tech: ["Groq", "Llama 3.3"],
  },
  {
    title: "Claim Extraction",
    icon: FileCheck,
    description:
      "Extract every factual claim from the generated response for verification.",
    tech: ["LLM Parser"],
  },
  {
    title: "Verification",
    icon: ShieldCheck,
    description:
      "Cross-check each extracted claim against the retrieved evidence.",
    tech: ["Evidence Matching"],
  },
  {
    title: "Trust Score",
    icon: BadgeCheck,
    description:
      "Return confidence score, supporting sources, and hallucination analysis.",
    tech: ["Confidence Engine"],
  },
];

export default function Pipeline() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="pipeline"
      className="mx-auto max-w-7xl px-6 py-32"
    >
      {/* Heading */}

      <div className="text-center">

        <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
          Verification Pipeline
        </span>

        <h2 className="mt-6 text-4xl font-bold md:text-5xl">
          How HalluciShield Works
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-400">
          Every AI response passes through multiple verification stages before
          reaching the user.
        </p>

      </div>

      {/* Timeline */}

      <div className="mt-24 overflow-x-auto lg:overflow-visible">

        <div className="flex min-w-max items-center justify-center">

          {steps.map((step, index) => {

            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="flex items-center"
              >

                <button
                  onMouseEnter={() => setActive(index)}
                  className="group flex flex-col items-center"
                >

                  <motion.div
                    animate={{
                      scale: active === index ? 1.15 : 1,
                    }}
                    transition={{ duration: 0.25 }}
                    className={`flex h-16 w-16 items-center justify-center rounded-full border transition-all duration-300 ${
                      active === index
                        ? "border-indigo-500 bg-indigo-500/20 shadow-[0_0_35px_rgba(99,102,241,0.45)]"
                        : "border-white/10 bg-slate-900"
                    }`}
                  >
                    <Icon className="h-7 w-7 text-indigo-300" />
                  </motion.div>

                  <span className="mt-4 w-24 text-center text-sm font-medium text-slate-300">
                    {step.title}
                  </span>

                </button>

                {index !== steps.length - 1 && (
                  <div className="mx-4 hidden h-[2px] w-16 bg-slate-700 lg:block" />
                )}

              </div>
            );
          })}

        </div>

      </div>

      {/* Active Card */}

      <motion.div
        key={active}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mx-auto mt-20 max-w-2xl rounded-3xl border border-white/10 bg-slate-900/70 p-8 backdrop-blur-xl"
      >

        <h3 className="text-2xl font-semibold">
          {steps[active].title}
        </h3>

        <p className="mt-5 leading-8 text-slate-400">
          {steps[active].description}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">

          {steps[active].tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300"
            >
              {tech}
            </span>
          ))}

        </div>

      </motion.div>

    </section>
  );
}