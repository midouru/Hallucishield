import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, AlertTriangle } from "lucide-react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
export default function HeroCard() {
  return (
    <motion.div
      initial={{ opacity:0, y:40 }}
      animate={{ opacity:1, y:0 }}
      transition={{
      duration:0.8
      }}
      className="relative"
      >

      {/* Glow */}
      <div className="absolute -inset-4 rounded-3xl bg-indigo-500/20 blur-3xl" />

      {/* Card */}
      <div className="relative rounded-3xl border border-white/10 bg-slate-900/80 p-8 backdrop-blur-xl shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm text-slate-400">
              Verification Report
            </p>

            <h3 className="mt-1 text-xl font-semibold">
              HalluciShield AI
            </h3>
          </div>

          <ShieldCheck className="h-8 w-8 text-indigo-400" />

        </div>

        {/* Score */}

        <div className="mx-auto mt-10 h-44 w-44">

          <CircularProgressbar
  value={92}
  text="92%"
  styles={{
    path: {
      stroke: "#818cf8",
      strokeLinecap: "round",
    },
    trail: {
      stroke: "#1e293b",
    },
    text: {
      fill: "#ffffff",
      fontSize: "16px",
      fontWeight: "bold",
    },
  }}
/>

        </div>

        <p className="mt-4 text-center text-lg font-semibold text-emerald-400">
          Trust Score
        </p>

        {/* Stats */}

        <div className="mt-10 space-y-4">

          <Stat
            icon={<CheckCircle2 className="h-5 w-5 text-emerald-400" />}
            label="Claims Verified"
            value="14 / 15"
          />

          <Stat
            icon={<ShieldCheck className="h-5 w-5 text-cyan-400" />}
            label="Evidence Retrieved"
            value="28 Sources"
          />

          <Stat
            icon={<AlertTriangle className="h-5 w-5 text-yellow-400" />}
            label="Hallucinations"
            value="1 Flagged"
          />

        </div>

      </div>

    </motion.div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">

      <div className="flex items-center gap-3">

        {icon}

        <span className="text-slate-300">
          {label}
        </span>

      </div>

      <span className="font-semibold">
        {value}
      </span>

    </div>
  );
}