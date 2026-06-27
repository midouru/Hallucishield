import type { LucideIcon } from "lucide-react";

export type Page = "dashboard" | "verification" | "knowledge" | "analytics";

export type ClaimStatus = "verified" | "uncertain" | "failed";

export type Claim = {
  id: number;
  status: ClaimStatus;
  confidence: number;
  text: string;
  source: string;
  evidence: string;
};

export type Stat = {
  label: string;
  value: string;
  delta: string;
  icon: LucideIcon;
};
