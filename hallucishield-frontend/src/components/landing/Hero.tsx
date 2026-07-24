import  HeroCard from "./HeroCard";


export default function Hero() {
  return (
    <section className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-32">

      <div className="grid w-full items-center gap-16 lg:grid-cols-2">

        {/* Left Side */}

        <div>

          <span className="inline-flex items-center rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
            AI Trust Infrastructure
          </span>

          <h1 className="mt-8 text-5xl font-bold leading-tight md:text-7xl">

            Detect

            <span className="block text-indigo-400">

              LLM Hallucinations

            </span>

            Before They Reach Users.

          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">

            HalluciShield verifies AI-generated responses using Retrieval
            Augmented Generation, hybrid search, claim extraction, and evidence
            scoring—helping developers build trustworthy AI applications.

          </p>

          <div className="mt-10 flex flex-wrap gap-5">

            <button className="rounded-xl bg-indigo-600 px-7 py-4 font-semibold transition hover:bg-indigo-500">

              Start Verifying

            </button>

            <button className="rounded-xl border border-white/10 px-7 py-4 font-semibold hover:border-indigo-400">

              View Demo

            </button>

          </div>

        </div>

        {/* Right Side */}

        <HeroCard />

      </div>

    </section>
  );
}