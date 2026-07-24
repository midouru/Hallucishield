import { Sidebar } from "../components/Sidebar";
import { TopBar } from "../components/TopBar";
import { MobileNav } from "../components/mobilenav";
import { Outlet } from "react-router-dom";

export default function DashboardPage() {
 


  return (
    <div className="min-h-screen overflow-hidden bg-ink text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(135deg,rgba(79,70,229,0.16),transparent_32%),linear-gradient(220deg,rgba(8,145,178,0.12),transparent_30%)]" />
      <div className="relative flex min-h-screen">
        <Sidebar />
        <main className="flex min-w-0 flex-1 flex-col pb-20 lg:pb-0">
          <TopBar />
          <div className="mx-auto w-full max-w-[1480px] px-4 py-4 sm:px-6 lg:px-8 lg:py-7">
            <Outlet />
          </div>
        </main>
        <MobileNav />
      </div>
    </div>
  );
}

