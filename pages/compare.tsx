import { useState } from "react";
import Head from "next/head";
import { ComparisonProvider } from "../lib/comparison-context";
import QuantumComparator from "../components/quantum-comparator";

export default function ComparePage() {
  return (
    <>
      <Head>
        <title>Quantum Comparator - AI Vault</title>
        <meta name="description" content="AI-powered tool comparison with decision intelligence" />
      </Head>
      
      <ComparisonProvider>
        <QuantumComparator />
      </ComparisonProvider>
    </>
  );
} 