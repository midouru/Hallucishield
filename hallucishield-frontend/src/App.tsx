import { Routes, Route } from "react-router-dom";


import Landing from "./pages/landing";

import DashboardLayout from "./layouts/dashboardlayout";

import { Dashboard } from "./pages/dashboardhome";
import { Verification } from "./pages/verification";
import { Knowledge } from "./pages/knowledgebase";
import { Analytics } from "./pages/analytics";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="verification" element={<Verification />} />
        <Route path="knowledge" element={<Knowledge />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>
    </Routes>
  );
}