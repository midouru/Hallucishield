import { NavLink } from "react-router-dom";

import {
  Shield,
  FileSearch,
  Database,
  BarChart3,
  CircleDot,
  ShieldCheck,
} from "lucide-react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
export function Sidebar() {
  const pageItems = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: Shield,
  },
  {
    path: "/dashboard/verification",
    label: "Verification",
    icon: FileSearch,
  },
  {
    path: "/dashboard/knowledge",
    label: "Knowledge",
    icon: Database,
  },
  {
    path: "/dashboard/analytics",
    label: "Analytics",
    icon: BarChart3,
  },
];

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
            <NavLink
  key={item.label}
  to={item.path}
  className={({ isActive }) =>
    `group flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
      isActive
        ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 shadow-lg"
        : "text-slate-400 hover:bg-white/5 hover:text-white"
    }`
  }
>
  <item.icon className="h-5 w-5 shrink-0" />
  <span className="text-sm font-medium">{item.label}</span>
</NavLink>
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