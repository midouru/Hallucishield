import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  CircleDot,
  Database,
  FileCheck2,
  FileSearch,
  Gauge,
  Layers3,
  PanelLeft,
  Search,
  Shield,
  ShieldCheck,
  SlidersHorizontal,
  UploadCloud,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  activity,
  claims,
  knowledgeStats,
  pipeline,
  recentRuns,
  sources,
  stats,
} from "./data/mock";
import type { Claim, ClaimStatus, Page } from "./types";

const pageItems: Array<{ id: Page; label: string; icon: typeof Shield }> = [
  { id: "dashboard", label: "Dashboard", icon: Shield },
  { id: "verification", label: "Verification", icon: FileSearch },
  { id: "knowledge", label: "Knowledge", icon: Database },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
];

const pageTitles: Record<Page, { title: string; kicker: string }> = {
  dashboard: {
    title: "AI verification command center",
    kicker: "Audit generated answers against trusted evidence.",
  },
  verification: {
    title: "Verification report",
    kicker: "Every claim is scored, sourced, and inspectable.",
  },
  knowledge: {
    title: "Knowledge base",
    kicker: "Manage the trusted corpus used to ground verification.",
  },
  analytics: {
    title: "Analytics",
    kicker: "Monitor trust quality, risk trends, and source performance.",
  },
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function App() {
  const [page, setPage] = useState<Page>("dashboard");

  return (
    <div className="min-h-screen overflow-hidden bg-ink text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(135deg,rgba(79,70,229,0.16),transparent_32%),linear-gradient(220deg,rgba(8,145,178,0.12),transparent_30%)]" />
      <div className="relative flex min-h-screen">
        <Sidebar page={page} setPage={setPage} />
        <main className="flex min-w-0 flex-1 flex-col pb-20 lg:pb-0">
          <TopBar page={page} />
          <div className="mx-auto w-full max-w-[1480px] px-4 py-4 sm:px-6 lg:px-8 lg:py-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                {page === "dashboard" && <Dashboard setPage={setPage} />}
                {page === "verification" && <Verification />}
                {page === "knowledge" && <Knowledge />}
                {page === "analytics" && <Analytics />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
        <MobileNav page={page} setPage={setPage} />
      </div>
    </div>
  );
}

function Sidebar({
  page,
  setPage,
}: {
  page: Page;
  setPage: (page: Page) => void;
}) {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-slate-950/64 px-4 py-5 backdrop-blur-xl lg:block">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-400/30 bg-indigo-500/15">
          <ShieldCheck className="h-5 w-5 text-indigo-200" />
        </div>
        <div>
          <div className="text-base font-semibold tracking-tight">HalluciShield</div>
          <div className="text-xs text-slate-500">Verification layer</div>
        </div>
      </div>

      <nav className="space-y-1">
        {pageItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                page === item.id
                  ? "bg-white/10 text-white shadow-lg shadow-black/10"
                  : "text-slate-400 hover:bg-white/6 hover:text-slate-100",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-8 rounded-2xl border border-emerald-400/15 bg-emerald-400/8 p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-emerald-200">
          <CircleDot className="h-4 w-4" />
          System healthy
        </div>
        <div className="space-y-2 text-xs text-slate-400">
          <div className="flex justify-between">
            <span>Retrieval</span>
            <span className="text-emerald-300">99.98%</span>
          </div>
          <div className="flex justify-between">
            <span>Embedding index</span>
            <span className="text-emerald-300">Synced</span>
          </div>
          <div className="flex justify-between">
            <span>Verifier</span>
            <span className="text-emerald-300">Online</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

function TopBar({ page }: { page: Page }) {
  const title = pageTitles[page];

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-ink/76 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-[1480px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs text-slate-500 lg:hidden">
            <ShieldCheck className="h-4 w-4 text-indigo-300" />
            HalluciShield
          </div>
          <h1 className="truncate text-base font-semibold tracking-tight text-white sm:text-lg">
            {title.title}
          </h1>
          <p className="hidden text-xs text-slate-500 sm:block">{title.kicker}</p>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300">
            <Search className="h-4 w-4" />
            Search runs
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300">
            <SlidersHorizontal className="h-4 w-4" />
            Strict mode
          </button>
        </div>
      </div>
    </header>
  );
}

function MobileNav({
  page,
  setPage,
}: {
  page: Page;
  setPage: (page: Page) => void;
}) {
  return (
    <nav className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-4 rounded-2xl border border-white/10 bg-slate-950/88 p-1 shadow-premium backdrop-blur-xl lg:hidden">
      {pageItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            className={cn(
              "flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] transition",
              page === item.id ? "bg-white/10 text-white" : "text-slate-500",
            )}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}

function Dashboard({ setPage }: { setPage: (page: Page) => void }) {
  return (
    <div className="space-y-5">
      <section className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <VerificationComposer onVerify={() => setPage("verification")} />
        <ScoreSpotlight />
      </section>
      <StatsGrid />
      <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <RecentRuns setPage={setPage} />
        <StatusPanel />
      </section>
    </div>
  );
}

function VerificationComposer({ onVerify }: { onVerify: () => void }) {
  return (
    <div className="panel-gradient rounded-[28px] border border-white/10 p-5 shadow-premium sm:p-7">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-sm font-medium text-indigo-200">Submit for verification</div>
          <h2 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Ground answers before they reach production.
          </h2>
        </div>
        <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
          Live corpus synced
        </div>
      </div>
      <div className="glass rounded-2xl p-3">
        <textarea
          className="min-h-36 w-full resize-none rounded-xl border border-white/10 bg-slate-950/70 p-4 text-sm leading-6 text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-indigo-300/40"
          defaultValue="What are the benefits of vector databases for RAG systems?"
          aria-label="Verification query"
        />
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {["Internal docs", "Strict mode", "Deep evidence"].map((item) => (
              <button
                key={item}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-300"
              >
                {item}
                <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
              </button>
            ))}
          </div>
          <button
            onClick={onVerify}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-950/40 transition hover:bg-indigo-400"
          >
            Verify
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ScoreSpotlight() {
  return (
    <div className="glass rounded-[28px] p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-slate-300">Latest risk profile</div>
          <div className="text-xs text-slate-500">Vector database answer audit</div>
        </div>
        <Gauge className="h-5 w-5 text-indigo-300" />
      </div>
      <HallucinationGauge score={12} />
      <div className="mt-6 grid grid-cols-3 gap-2 text-center">
        <MiniMetric label="Verified" value="7" tone="text-emerald-300" />
        <MiniMetric label="Uncertain" value="1" tone="text-amber-300" />
        <MiniMetric label="Failed" value="1" tone="text-red-300" />
      </div>
    </div>
  );
}

function StatsGrid() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            className="glass rounded-2xl p-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/6 text-indigo-200">
                <Icon className="h-5 w-5" />
              </div>
              <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-xs font-medium text-emerald-300">
                {stat.delta}
              </span>
            </div>
            <div className="text-2xl font-semibold tracking-tight text-white">{stat.value}</div>
            <div className="mt-1 text-sm text-slate-500">{stat.label}</div>
          </motion.div>
        );
      })}
    </section>
  );
}

function RecentRuns({ setPage }: { setPage: (page: Page) => void }) {
  return (
    <section className="glass rounded-[24px] p-5">
      <SectionHeader icon={FileCheck2} title="Recent verifications" action="Open report" />
      <div className="mt-4 space-y-3">
        {recentRuns.map((run) => (
          <button
            key={run.title}
            onClick={() => setPage("verification")}
            className="flex w-full items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-left transition hover:bg-white/[0.06]"
          >
            <div className="min-w-0">
              <div className="truncate text-sm font-medium text-white">{run.title}</div>
              <div className="mt-1 text-xs text-slate-500">{run.claims} claims checked</div>
            </div>
            <RiskPill score={run.score} label={run.state} />
          </button>
        ))}
      </div>
    </section>
  );
}

function StatusPanel() {
  return (
    <section className="glass rounded-[24px] p-5">
      <SectionHeader icon={Activity} title="System status" action="Last 5 min" />
      <div className="mt-5 space-y-4">
        {[
          ["Retrieval service", 99, "Operational"],
          ["Embedding index", 96, "Synced"],
          ["Claim extractor", 92, "Healthy"],
          ["Evidence ranker", 88, "Stable"],
        ].map(([label, value, state]) => (
          <div key={label} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">{label}</span>
              <span className="text-slate-500">{state}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400"
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Verification() {
  return (
    <div className="space-y-5">
      <section className="glass rounded-[24px] p-5">
        <div className="mb-2 text-xs uppercase tracking-[0.18em] text-slate-500">Question</div>
        <div className="text-lg font-medium text-white">
          What are the benefits of vector databases for RAG systems?
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <AnswerPanel />
        <div className="glass rounded-[24px] p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white">Hallucination score</div>
              <div className="text-xs text-slate-500">Low risk verification result</div>
            </div>
            <ShieldCheck className="h-5 w-5 text-emerald-300" />
          </div>
          <HallucinationGauge score={12} />
          <div className="mt-5 grid grid-cols-2 gap-3">
            <MiniMetric label="Evidence coverage" value="92%" tone="text-emerald-300" />
            <MiniMetric label="Avg confidence" value="88%" tone="text-indigo-200" />
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_380px]">
        <ClaimsList />
        <PipelineTimeline />
      </section>
    </div>
  );
}

function AnswerPanel() {
  return (
    <div className="glass rounded-[24px] p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-sm font-medium text-white">Verified answer</div>
          <div className="text-xs text-slate-500">Synthesized from 12 trusted source passages</div>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Evidence backed
        </div>
      </div>
      <p className="text-base leading-8 text-slate-200">
        Vector databases improve RAG systems by retrieving semantically relevant
        passages from embedded source material. They help match user intent even
        when the query and source text use different wording, which can improve
        context quality before generation.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <MiniMetric label="Claims extracted" value="9" tone="text-white" />
        <MiniMetric label="Sources matched" value="12" tone="text-white" />
        <MiniMetric label="Unsupported" value="1" tone="text-amber-300" />
      </div>
    </div>
  );
}

function HallucinationGauge({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 74;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="mx-auto flex max-w-[260px] flex-col items-center">
      <div className="relative h-52 w-52">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 180 180">
          <circle
            cx="90"
            cy="90"
            r="74"
            fill="none"
            stroke="rgba(51,65,85,0.78)"
            strokeWidth="14"
          />
          <motion.circle
            cx="90"
            cy="90"
            r="74"
            fill="none"
            stroke="url(#riskGradient)"
            strokeLinecap="round"
            strokeWidth="14"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="riskGradient" x1="0" x2="1" y1="0" y2="1">
              <stop stopColor="#10B981" />
              <stop offset="0.75" stopColor="#6366F1" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="text-5xl font-semibold tracking-tight text-white">{score}%</div>
          <div className="mt-2 text-sm font-medium text-emerald-300">Low risk</div>
          <div className="mt-1 text-xs text-slate-500">hallucination score</div>
        </div>
      </div>
    </div>
  );
}

function ClaimsList() {
  return (
    <section className="glass rounded-[24px] p-5">
      <SectionHeader icon={FileSearch} title="Verified claims" action="9 extracted" />
      <div className="mt-4 space-y-3">
        {claims.map((claim, index) => (
          <ClaimCard key={claim.id} claim={claim} index={index} />
        ))}
      </div>
    </section>
  );
}

function ClaimCard({ claim, index }: { claim: Claim; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const config = claimConfig[claim.status];
  const Icon = config.icon;

  return (
    <motion.article
      className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <button
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-start justify-between gap-4 text-left"
      >
        <div className="flex min-w-0 gap-3">
          <div className={cn("mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl", config.bg)}>
            <Icon className={cn("h-4 w-4", config.text)} />
          </div>
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", config.pill)}>
                {config.label}
              </span>
              <span className="text-xs text-slate-500">{claim.confidence}% confidence</span>
            </div>
            <p className="text-sm leading-6 text-slate-200">{claim.text}</p>
          </div>
        </div>
        <ChevronDown className={cn("h-4 w-4 shrink-0 text-slate-500 transition", open && "rotate-180")} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/55 p-4">
              <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-400">
                <FileCheck2 className="h-3.5 w-3.5" />
                {claim.source}
              </div>
              <p className="text-sm leading-6 text-slate-300">{claim.evidence}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

const claimConfig: Record<
  ClaimStatus,
  {
    label: string;
    icon: typeof CheckCircle2;
    bg: string;
    text: string;
    pill: string;
  }
> = {
  verified: {
    label: "Verified",
    icon: CheckCircle2,
    bg: "bg-emerald-400/10",
    text: "text-emerald-300",
    pill: "bg-emerald-400/10 text-emerald-300",
  },
  uncertain: {
    label: "Uncertain",
    icon: AlertTriangle,
    bg: "bg-amber-400/10",
    text: "text-amber-300",
    pill: "bg-amber-400/10 text-amber-300",
  },
  failed: {
    label: "Failed",
    icon: XCircle,
    bg: "bg-red-400/10",
    text: "text-red-300",
    pill: "bg-red-400/10 text-red-300",
  },
};

function PipelineTimeline() {
  return (
    <section className="glass rounded-[24px] p-5">
      <SectionHeader icon={Layers3} title="Pipeline" action="2.9s" />
      <div className="mt-5 space-y-3">
        {pipeline.map((step, index) => (
          <motion.div
            key={step.label}
            className="relative flex gap-3"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.04 }}
          >
            <div className="flex flex-col items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-indigo-300/20 bg-indigo-400/10">
                <CheckCircle2 className="h-4 w-4 text-indigo-200" />
              </div>
              {index < pipeline.length - 1 && <div className="h-8 w-px bg-white/10" />}
            </div>
            <div className="min-w-0 flex-1 pb-3">
              <div className="flex items-center justify-between gap-3">
                <div className="truncate text-sm font-medium text-white">{step.label}</div>
                <div className="text-xs text-slate-500">{step.duration}</div>
              </div>
              <div className="mt-1 text-xs text-slate-500">{step.value}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Knowledge() {
  return (
    <div className="space-y-5">
      <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <UploadArea />
        <div className="grid gap-4 sm:grid-cols-3">
          {knowledgeStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="glass rounded-[22px] p-5">
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-200">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-2xl font-semibold tracking-tight">{stat.value}</div>
                <div className="mt-1 text-sm text-slate-500">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="glass rounded-[24px] p-5">
        <SectionHeader icon={Database} title="Trusted sources" action="42 connected" />
        <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
          <div className="grid grid-cols-[1.4fr_0.7fr_0.8fr_0.8fr_0.8fr] bg-white/[0.035] px-4 py-3 text-xs font-medium text-slate-500 max-md:hidden">
            <span>Name</span>
            <span>Type</span>
            <span>Chunks</span>
            <span>Embeddings</span>
            <span>Status</span>
          </div>
          {sources.map((source) => (
            <div
              key={source.name}
              className="grid gap-2 border-t border-white/10 px-4 py-4 text-sm md:grid-cols-[1.4fr_0.7fr_0.8fr_0.8fr_0.8fr]"
            >
              <span className="font-medium text-white">{source.name}</span>
              <span className="text-slate-400">{source.type}</span>
              <span className="text-slate-400">{source.chunks}</span>
              <span className="text-slate-400">{source.embeddings}</span>
              <span className="w-fit rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
                {source.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function UploadArea() {
  return (
    <section className="glass rounded-[24px] p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-white">Upload evidence</div>
          <div className="text-xs text-slate-500">PDF, DOCX, Markdown, URL, or official docs</div>
        </div>
        <UploadCloud className="h-5 w-5 text-indigo-300" />
      </div>
      <div className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-600 bg-slate-950/44 p-6 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-400/10 text-indigo-200">
          <UploadCloud className="h-6 w-6" />
        </div>
        <div className="text-sm font-medium text-white">Drop trusted documents here</div>
        <div className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
          Uploaded sources are chunked, embedded, scored for freshness, and made available for verification.
        </div>
      </div>
    </section>
  );
}

function Analytics() {
  const bars = useMemo(() => [44, 61, 52, 78, 68, 84, 91, 73, 88, 96, 82, 89], []);

  return (
    <div className="space-y-5">
      <StatsGrid />
      <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="glass rounded-[24px] p-5">
          <SectionHeader icon={BarChart3} title="Verification volume" action="12 months" />
          <div className="mt-8 flex h-72 items-end gap-2">
            {bars.map((bar, index) => (
              <motion.div
                key={`${bar}-${index}`}
                className="flex flex-1 rounded-t-xl bg-gradient-to-t from-indigo-500/70 to-cyan-300/80"
                initial={{ height: 0 }}
                animate={{ height: `${bar}%` }}
                transition={{ delay: index * 0.03, duration: 0.5 }}
              />
            ))}
          </div>
        </div>
        <div className="glass rounded-[24px] p-5">
          <SectionHeader icon={AlertTriangle} title="Risk distribution" action="Current" />
          <div className="mt-6 space-y-4">
            <Distribution label="Low risk" value={72} color="bg-emerald-400" />
            <Distribution label="Moderate" value={21} color="bg-amber-400" />
            <Distribution label="High risk" value={7} color="bg-red-400" />
          </div>
        </div>
      </section>
      <section className="glass rounded-[24px] p-5">
        <SectionHeader icon={Activity} title="Recent activity" action="Live" />
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {activity.map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "h-2.5 w-2.5 rounded-full",
                    item.level === "success" && "bg-emerald-400",
                    item.level === "warning" && "bg-amber-400",
                    item.level === "danger" && "bg-red-400",
                    item.level === "info" && "bg-indigo-400",
                  )}
                />
                <span className="text-sm text-slate-300">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Distribution({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="text-slate-300">{label}</span>
        <span className="text-slate-500">{value}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-800">
        <motion.div
          className={cn("h-full rounded-full", color)}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.7 }}
        />
      </div>
    </div>
  );
}

function MiniMetric({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-3">
      <div className={cn("text-lg font-semibold tracking-tight", tone)}>{value}</div>
      <div className="mt-1 text-xs text-slate-500">{label}</div>
    </div>
  );
}

function RiskPill({ score, label }: { score: number; label: string }) {
  const tone =
    score < 25
      ? "bg-emerald-400/10 text-emerald-300"
      : score < 60
        ? "bg-amber-400/10 text-amber-300"
        : "bg-red-400/10 text-red-300";

  return (
    <span className={cn("shrink-0 rounded-full px-3 py-1 text-xs font-semibold", tone)}>
      {score}% {label}
    </span>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  action,
}: {
  icon: typeof PanelLeft;
  title: string;
  action: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-indigo-300" />
        <h2 className="text-sm font-semibold text-white">{title}</h2>
      </div>
      <span className="text-xs text-slate-500">{action}</span>
    </div>
  );
}
