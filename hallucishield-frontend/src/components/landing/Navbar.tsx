import { Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

        {/* Logo */}

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-indigo-500/10 p-2">

            <Shield className="h-6 w-6 text-indigo-300" />

          </div>

          <h1 className="text-xl font-bold tracking-tight">

            HalluciShield

          </h1>

        </div>

        {/* Navigation */}

        <nav className="hidden items-center gap-10 text-sm text-slate-300 md:flex">

          <a href="#platform" className="hover:text-white transition">
            Platform
          </a>

          <a href="#solutions" className="hover:text-white transition">
            Solutions
          </a>

          <a href="#pipeline" className="hover:text-white transition">
            Developers
          </a>

          <a href="#pricing" className="hover:text-white transition">
            Pricing
          </a>

        </nav>

        {/* Buttons */}

        <div className="flex items-center gap-4">

          <button className="hidden text-slate-300 transition hover:text-white lg:block">

            Sign In

          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="
            rounded-xl
            bg-indigo-600
            px-5
            py-2.5
            font-semibold
            transition
            hover:bg-indigo-500
            "
          >

            Start Verifying

          </button>

        </div>

      </div>

    </header>
  );
}