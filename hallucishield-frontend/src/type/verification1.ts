export interface Evidence {
  fact: string;
  source: string;
}

export interface Claim {
  claim: string;
  normalizedClaim: string;
  type: string;
  verified: boolean;
  confidence: number;
  evidence: Evidence[];
}

export interface VerificationResponse {
  success: boolean;
  response: string;
  claims: Claim[];
  hallucinationScore: number;
  verifiedClaims: number;
  totalClaims: number;
}