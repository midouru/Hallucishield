import { AnimatePresence, motion } from "framer-motion";

import {
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  FileSearch,
  Layers3,
  PanelLeft,
  ShieldCheck,
  XCircle,
} from "lucide-react";

import { pipeline } from "../data/mock";

import { getSourceName } from "../helpers/sourceformatter";

import type { Claim, ClaimStatus } from "../types";
import { useState } from "react";
import { useVerification } from "../context/VerificationContext";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Verification() {
    
    const { verificationResult } = useVerification();
    if (!verificationResult) {
  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-white">
        No verification found
      </h2>

      <p className="mt-2 text-slate-400">
        Submit a query from the Dashboard first.
      </p>
    </div>
  );
}
 
  // Backend returns:
  //   claims        → Claim[]  (the array to map over)
  //   verifiedClaims → number  (count only, NOT an array)
  const uiClaims =
  verificationResult?.claims?.map((c: any, i: number) => ({
    id: i,
    text: c.claim,
    confidence: Math.round(c.confidence),
    status: c.verified ? "verified" : "failed",
    evidence: c.evidence ?? [],
  })) ?? [];
  return (
    <div className="space-y-5">
      <section className="glass rounded-[24px] p-5">
        <div className="mb-2 text-xs uppercase tracking-[0.18em] text-slate-500">Question</div>
        <div className="text-lg font-medium text-white">
          {verificationResult?.query}
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <AnswerPanel response={verificationResult?.response} />
        <div className="glass rounded-[24px] p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white">Hallucination score</div>
              <div className="text-xs text-slate-500">Low risk verification result</div>
            </div>
            <ShieldCheck className="h-5 w-5 text-emerald-300" />
          </div>
          <HallucinationGauge score={verificationResult?.hallucinationScore ?? 0} />
          <div className="mt-5 grid grid-cols-2 gap-3">
            <MiniMetric label="Evidence coverage" value="92%" tone="text-emerald-300" />
            <MiniMetric label="Avg confidence" value="88%" tone="text-indigo-200" />
          </div>
        </div>
      </section>
    
      <section className="grid gap-5 xl:grid-cols-[1fr_380px]">
        <ClaimsList claims={uiClaims}/>
        <PipelineTimeline />
      </section>
    </div>
  );
}

function AnswerPanel({ response }: { response?: any }) {
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
        {response ?? "No verification yet."}
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

function ClaimsList({claims}:{claims:any[]}) {
  return (
    <section className="glass rounded-[24px] p-5">
      <SectionHeader icon={FileSearch} title="Verified claims" action={`${claims.length} extracted`} />
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
            <div className="mt-4 space-y-3">

{Array.isArray(claim.evidence) ? claim.evidence.map((item:any,index:number)=>(

<div key={index} className="rounded-xl border border-white/10 bg-slate-950/55 p-4">

    <div className="mb-2 text-xs text-slate-400">

        {getSourceName(item.source)}
        <a href={item.source} target="_blank" rel="noreferrer" className="text-xs text-indigo-400 hover:underline">
          Open Source ↗ </a>

    </div>

    <p className="text-sm leading-6 text-slate-300">

        {item.fact}

    </p>

</div>

)) : null}

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