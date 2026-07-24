import {
  Search,
  BrainCircuit,
  ShieldCheck,
  Database,
  FileCheck,
  Workflow,
} from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "Claim Extraction",
    description:
      "Automatically extracts factual claims from LLM responses before verification begins.",
  },
  {
    icon: Search,
    title: "Hybrid Retrieval",
    description:
      "Combines local RAG with web retrieval to gather the most relevant evidence.",
  },
  {
    icon: ShieldCheck,
    title: "Confidence Scoring",
    description:
      "Generates a trust score using retrieved evidence and LLM verification.",
  },
  {
    icon: Database,
    title: "Source Attribution",
    description:
      "Links every verified claim back to the evidence used during verification.",
  },
  {
    icon: FileCheck,
    title: "Audit Trail",
    description:
      "Stores complete verification history for transparency and debugging.",
  },
  {
    icon: Workflow,
    title: "Developer API",
    description:
      "Integrate HalluciShield into any AI application through a lightweight API.",
  },
];

export default function FeatureGrid() {
  return (
    <section
      id="platform"
      className="mx-auto max-w-7xl px-6 py-32"
    >
      <div className="text-center">

        <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
          Platform Features
        </span>

        <h2 className="mt-6 text-4xl font-bold md:text-5xl">
          Everything You Need to Build
          <span className="block text-indigo-400">
            Trustworthy AI
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
          HalluciShield combines retrieval, verification, scoring,
          and source attribution into one seamless verification layer.
        </p>

      </div>

      <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
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
              hover:shadow-[0_0_40px_rgba(99,102,241,0.15)]
              "
            >

              <div className="inline-flex rounded-2xl bg-indigo-500/10 p-4">

                <Icon className="h-8 w-8 text-indigo-400" />

              </div>

              <h3 className="mt-8 text-2xl font-semibold">

                {feature.title}

              </h3>

              <p className="mt-4 leading-7 text-slate-400">

                {feature.description}

              </p>

            </div>
          );
        })}

      </div>
    </section>
  );
}