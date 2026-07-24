import { useState } from "react";

import {
  Activity,
  ChevronDown,
  FileCheck2,
  Gauge,
  PanelLeft
} from "lucide-react";
import {
  recentRuns
} from "../data/mock";
import { verifyQuery } from "../services/verification";
import { stats } from "../data/mock";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useVerification } from "../context/VerificationContext";




function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Dashboard() {
  const { setVerificationResult } = useVerification();
  const navigate = useNavigate();
  return (
    
    <div className="space-y-5">
      <section className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <VerificationComposer
  navigate={navigate}
  setVerificationResult={setVerificationResult}
/>
        <ScoreSpotlight />
      </section>
      <StatsGrid />
      <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <RecentRuns />
        <StatusPanel />
      </section>
    </div>
  );
}

function VerificationComposer({
  navigate,
  setVerificationResult,
}: {
  navigate: ReturnType<typeof useNavigate>;
  setVerificationResult: (data: any) => void;
}) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
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
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask anything..."
        rows={4}
        className="
          w-full
          resize-none
          rounded-xl
          border border-slate-700/60
          bg-[#0B1020]
          px-5
          py-4
          text-sm
          text-slate-200
          placeholder:text-slate-500
          outline-none
          transition
          focus:border-indigo-500
          focus:ring-2
          focus:ring-indigo-500/20
        "
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
            onClick={async () => {
              if (!query.trim()) return;

              setLoading(true);

              try {
                const result = await verifyQuery(query);
                // Merge the original user query into the result so
                // the Verification page can display it (backend does not echo it back)
                setVerificationResult({ ...result, query });
                navigate("/dashboard/verification");
              } catch (err) {
                console.error("Verification failed:", err);
                alert("Backend connection failed.");
              } finally {
                setLoading(false);
              }
    }}
    className="
    rounded-xl
    bg-gradient-to-r
    from-indigo-500
    to-violet-500
    px-8
    py-3
    font-medium
    text-white
    transition-all
    hover:scale-[1.02]
    hover:shadow-lg
    hover:shadow-indigo-500/20
    disabled:cursor-not-allowed
    disabled:opacity-60
  "
>
    {loading ? "Verifying..." : "Verify"}
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

function RecentRuns() {
  const navigate = useNavigate();
  return (
    <section className="glass rounded-[24px] p-5">
      <SectionHeader icon={FileCheck2} title="Recent verifications" action="Open report" />
      <div className="mt-4 space-y-3">
        {recentRuns.map((run) => (
          <button
            key={run.title}
            onClick={() => navigate("/dashboard/verification")}
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


function HallucinationGauge({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 74;
  const offset = circumference - (score / 100) * circumference;
function getRisk(score:number){

if(score<=20)
return{
label:"Very Low",
color:"text-emerald-300"
};

if(score<=40)
return{
label:"Low",
color:"text-emerald-300"
};

if(score<=60)
return{
label:"Medium",
color:"text-yellow-300"
};

if(score<=80)
return{
label:"High",
color:"text-orange-300"
};

return{
label:"Critical",
color:"text-red-300"
};

}
const risk=getRisk(score);

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
          
          <div className={risk.color}>
            {risk.label}
          </div>
          <div className="mt-1 text-xs text-slate-500">hallucination score</div>
        </div>
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