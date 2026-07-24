import { knowledgeStats, sources } from "../data/mock";
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

export function Knowledge() {
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

export function UploadArea() {
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