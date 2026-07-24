import { Page } from "../types";
import { useLocation } from "react-router-dom";
import { CircleDot, Search, ShieldCheck, SlidersHorizontal } from "lucide-react";

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

export function TopBar() {
  const location = useLocation();
const pageInfo: Record<
  string,
  { title: string; kicker: string }
> = {
  "/dashboard": {
    title: "Dashboard",
    kicker: "Overview",
  },
  "/dashboard/verification": {
    title: "Verification",
    kicker: "Analyze responses",
  },
  "/dashboard/knowledge": {
    title: "Knowledge Base",
    kicker: "Manage documents",
  },
  "/dashboard/analytics": {
    title: "Analytics",
    kicker: "Insights & metrics",
  },
};

const currentPage =
  pageInfo[location.pathname] ?? pageInfo["/dashboard"];
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-ink/76 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-[1480px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs text-slate-500 lg:hidden">
            <ShieldCheck className="h-4 w-4 text-indigo-300" />
            HalluciShield
          </div>
          <h1 className="truncate text-base font-semibold tracking-tight text-white sm:text-lg">
            {currentPage.title}
          </h1>
          <p className="hidden text-xs text-slate-500 sm:block">{currentPage.kicker}</p>
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