import { Page } from "../types";
import { NavLink } from "react-router-dom";
import { BarChart3, CircleDot, Database, FileSearch, Search, Shield, ShieldCheck, SlidersHorizontal } from "lucide-react";


const pageItems: Array<{
  path: string;
  label: string;
  icon: typeof Shield;
}> = [
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
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
export function MobileNav() {
  return (
    <nav className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-4 rounded-2xl border border-white/10 bg-slate-950/88 p-1 shadow-premium backdrop-blur-xl lg:hidden">
      {pageItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
    to={item.path}
    className={({ isActive }) =>
        isActive
            ? "YOUR ACTIVE CLASSES"
            : "YOUR NORMAL CLASSES"
    }
>
            <Icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  );
}