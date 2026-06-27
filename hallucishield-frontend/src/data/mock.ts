import {
  Activity,
  AlertTriangle,
  Database,
  FileCheck2,
  ShieldCheck,
} from "lucide-react";
import type { Claim, Stat } from "../types";

export const stats: Stat[] = [
  { label: "Queries verified", value: "12,842", delta: "+18.4%", icon: ShieldCheck },
  { label: "Claims audited", value: "89,203", delta: "+24.1%", icon: FileCheck2 },
  { label: "Avg confidence", value: "94.2%", delta: "+3.7%", icon: Activity },
  { label: "Risks detected", value: "317", delta: "-8.2%", icon: AlertTriangle },
];

export const recentRuns = [
  { title: "Vector database answer audit", score: 12, claims: 9, state: "Low risk" },
  { title: "Pricing policy summary", score: 34, claims: 14, state: "Moderate" },
  { title: "Clinical trial overview", score: 67, claims: 21, state: "High risk" },
  { title: "API migration guidance", score: 18, claims: 11, state: "Low risk" },
];

export const claims: Claim[] = [
  {
    id: 1,
    status: "verified",
    confidence: 97,
    text: "Vector databases store embeddings and retrieve nearby items using similarity search.",
    source: "Pinecone Docs",
    evidence:
      "The source describes vector databases as systems designed to store vectors and perform similarity queries over embedded content.",
  },
  {
    id: 2,
    status: "verified",
    confidence: 94,
    text: "Semantic retrieval can find relevant passages even when queries do not share exact keywords.",
    source: "Elastic Search Labs",
    evidence:
      "The retrieved passage explains that semantic search compares meaning through embeddings instead of relying only on lexical overlap.",
  },
  {
    id: 3,
    status: "uncertain",
    confidence: 62,
    text: "Vector databases always outperform keyword search in production RAG systems.",
    source: "Hybrid Retrieval Benchmark",
    evidence:
      "Benchmark evidence supports hybrid retrieval for many workloads and does not support an unconditional performance claim.",
  },
  {
    id: 4,
    status: "failed",
    confidence: 41,
    text: "Embedding indexes remove the need for source document quality controls.",
    source: "Internal RAG Guidelines",
    evidence:
      "The source explicitly recommends document governance, freshness checks, and chunk quality review before indexing.",
  },
];

export const pipeline = [
  { label: "Query expansion", value: "4 variants", duration: "82ms" },
  { label: "Retrieval", value: "38 passages", duration: "410ms" },
  { label: "Grounded context", value: "12 sources", duration: "164ms" },
  { label: "LLM synthesis", value: "1 answer", duration: "1.1s" },
  { label: "Claim extraction", value: "9 claims", duration: "220ms" },
  { label: "Normalization", value: "9 normalized", duration: "106ms" },
  { label: "Verification", value: "7 supported", duration: "780ms" },
  { label: "Risk scoring", value: "12% score", duration: "56ms" },
];

export const sources = [
  { name: "Product Documentation", type: "PDF", chunks: "1,204", embeddings: "86k", status: "Synced" },
  { name: "API Reference", type: "URL", chunks: "923", embeddings: "54k", status: "Active" },
  { name: "RAG Research Library", type: "DOCX", chunks: "3,481", embeddings: "213k", status: "Synced" },
  { name: "Official Web Sources", type: "Web", chunks: "7,884", embeddings: "486k", status: "Updating" },
];

export const activity = [
  { label: "Unsupported claim detected in pricing summary", level: "warning" },
  { label: "API Reference re-indexed successfully", level: "success" },
  { label: "Retrieval latency improved by 18%", level: "info" },
  { label: "Clinical source produced conflicting evidence", level: "danger" },
];

export const knowledgeStats = [
  { label: "Indexed chunks", value: "24,120", icon: Database },
  { label: "Embeddings", value: "1.8M", icon: Activity },
  { label: "Trusted sources", value: "42", icon: ShieldCheck },
];
