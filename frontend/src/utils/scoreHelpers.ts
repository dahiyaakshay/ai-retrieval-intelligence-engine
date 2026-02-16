import { RetrievalResponse } from "../types/retrievalTypes";

/* --------------------------------------------------------
   Score Color Utility
--------------------------------------------------------- */

export function getScoreColor(score: number): string {
  if (score >= 80) return "score-high";
  if (score >= 60) return "score-mid";
  return "score-low";
}

/* --------------------------------------------------------
   Executive Summary Generator (Single URL)
--------------------------------------------------------- */

export function generateExecutiveSummary(
  data: RetrievalResponse
): string {
  const { final_score, breakdown, sections } = data;

  const weakSections = sections.filter(
    (s) => s.informational_score < 40
  );

  const strongSections = sections.filter(
    (s) => s.informational_score >= 70
  );

  let summaryParts: string[] = [];

  // Overall score interpretation
  if (final_score >= 85) {
    summaryParts.push(
      "This page demonstrates strong citation readiness and structural maturity."
    );
  } else if (final_score >= 65) {
    summaryParts.push(
      "This page shows moderate retrieval strength with clear optimization opportunities."
    );
  } else {
    summaryParts.push(
      "This page presents structural and informational weaknesses that may limit AI citation visibility."
    );
  }

  // Structural insight
  summaryParts.push(
    `DOM (${breakdown.dom}) and heading hierarchy (${breakdown.headings}) indicate ${
      breakdown.dom >= 80 && breakdown.headings >= 80
        ? "strong segmentation quality."
        : "room for structural refinement."
    }`
  );

  // Informational insight
  summaryParts.push(
    `Fact density is ${breakdown.fact_density}, suggesting ${
      breakdown.fact_density >= 70
        ? "high informational clarity."
        : "moderate informational density."
    }`
  );

  // Section-level warnings
  if (weakSections.length > 0) {
    summaryParts.push(
      `${weakSections.length} sections fall below optimal informational thresholds and may reduce citation likelihood.`
    );
  }

  if (strongSections.length > 0) {
    summaryParts.push(
      `${strongSections.length} sections demonstrate high citation-ready content strength.`
    );
  }

  return summaryParts.join(" ");
}

/* --------------------------------------------------------
   Comparison Summary Generator (Multi URL)
--------------------------------------------------------- */

interface CompareItem {
  url: string;
  result: RetrievalResponse;
}

export function generateComparisonSummary(
  results: CompareItem[]
): string {
  if (!results || results.length < 2) return "";

  const sorted = [...results].sort(
    (a, b) => b.result.final_score - a.result.final_score
  );

  const best = sorted[0];
  const worst = sorted[sorted.length - 1];

  const scoreDiff =
    best.result.final_score - worst.result.final_score;

  return `${
    best.url
  } leads with a retrieval score of ${
    best.result.final_score
  }, outperforming ${
    worst.url
  } by ${scoreDiff.toFixed(
    2
  )} points. Structural segmentation and informational density appear to be the primary differentiators.`;
}

/* --------------------------------------------------------
   Determine Winning URL
--------------------------------------------------------- */

export function getWinner(
  results: CompareItem[]
): CompareItem | null {
  if (!results || results.length === 0) return null;

  return results.reduce((prev, current) =>
    prev.result.final_score > current.result.final_score
      ? prev
      : current
  );
}

/* --------------------------------------------------------
   Weak Section Detector
--------------------------------------------------------- */

export function getWeakSections(
  data: RetrievalResponse
) {
  return data.sections.filter(
    (s) => s.informational_score < 40
  );
}

/* --------------------------------------------------------
   Strong Section Detector
--------------------------------------------------------- */

export function getStrongSections(
  data: RetrievalResponse
) {
  return data.sections.filter(
    (s) => s.informational_score >= 70
  );
}
