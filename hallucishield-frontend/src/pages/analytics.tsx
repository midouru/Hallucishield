import {
  Activity,
  AlertTriangle,
  BarChart3,
  PanelLeft,
   
} from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  activity,
  stats,
} from "../data/mock";


function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Analytics() {
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

export function StatsGrid() {
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