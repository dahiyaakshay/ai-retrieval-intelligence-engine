import { useEffect, useState } from "react";
import { RetrievalBreakdown } from "../types/retrievalTypes";
import { getScoreColor } from "../utils/scoreHelpers";

interface Props {
  breakdown: RetrievalBreakdown;
}

export default function ScoreBreakdown({ breakdown }: Props) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  const metrics = [
    { label: "DOM", value: breakdown.dom },
    { label: "Headings", value: breakdown.headings },
    { label: "Fact Density", value: breakdown.fact_density },
    { label: "Entity Clarity", value: breakdown.entity_clarity },
    { label: "Tone Neutrality", value: breakdown.tone_neutrality }
  ];

  return (
    <div className="card">
      <h3>Detailed Metrics</h3>
      {metrics.map((metric, index) => (
        <div key={index} style={{ marginBottom: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{metric.label}</span>
            <span>{metric.value}</span>
          </div>
          <div className="metric-bar">
            <div
              className={`metric-fill ${getScoreColor(metric.value)}`}
              style={{
                width: animate ? `${metric.value}%` : "0%"
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
