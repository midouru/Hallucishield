import { createContext, useContext, useState, ReactNode } from "react";

type VerificationResult = any;

type VerificationContextType = {
  verificationResult: VerificationResult;
  setVerificationResult: React.Dispatch<React.SetStateAction<VerificationResult>>;
};

const VerificationContext = createContext<VerificationContextType | undefined>(
  undefined
);

export function VerificationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [verificationResult, setVerificationResult] =
    useState<VerificationResult>(null);

  return (
    <VerificationContext.Provider
      value={{
        verificationResult,
        setVerificationResult,
      }}
    >
      {children}
    </VerificationContext.Provider>
  );
}

export function useVerification() {
  const context = useContext(VerificationContext);

  if (!context) {
    throw new Error(
      "useVerification must be used inside VerificationProvider"
    );
  }

  return context;
}