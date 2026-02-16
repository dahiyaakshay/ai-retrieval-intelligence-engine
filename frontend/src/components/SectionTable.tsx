import { useState } from "react";
import { SectionScore } from "../types/retrievalTypes";
import { getScoreColor } from "../utils/scoreHelpers";

interface Props {
  sections: SectionScore[];
}

export default function SectionTable({ sections }: Props) {
  const [sortKey, setSortKey] = useState<"informational_score" | "fact_density">("informational_score");
  const [expanded, setExpanded] = useState<string | null>(null);

  const sorted = [...sections].sort(
    (a, b) => b[sortKey] - a[sortKey]
  );

  return (
    <div className="card full-width">
      <h3>Section Analysis</h3>

      <div style={{ marginBottom: "16px" }}>
        <button onClick={() => setSortKey("informational_score")}>
          Sort by Informational Score
        </button>
        <button
          onClick={() => setSortKey("fact_density")}
          style={{ marginLeft: "10px" }}
        >
          Sort by Fact Density
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Heading</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((section, index) => (
            <>
              <tr
                key={index}
                onClick={() =>
                  setExpanded(expanded === section.heading ? null : section.heading)
                }
                style={{ cursor: "pointer" }}
              >
                <td>{section.heading}</td>
                <td className={getScoreColor(section.informational_score)}>
                  {section.informational_score}
                </td>
              </tr>

              {expanded === section.heading && (
                <tr>
                  <td colSpan={2} style={{ padding: "10px 0 20px 0", color: "#aaa" }}>
                    Fact Density: {section.fact_density} | Topic Reinforcement: {section.topic_reinforcement}
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
