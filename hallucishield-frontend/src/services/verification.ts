import API from "./api";

export interface VerificationResponse {
  success: boolean;
  response: string;
  hallucinationScore: number;
  verifiedClaims: number;
  totalClaims: number;
  claims: any[];
}

export async function verifyQuery(prompt: string) {
  const { data } = await API.post<VerificationResponse>("/generate", {
    prompt,
  });

  return data;
}