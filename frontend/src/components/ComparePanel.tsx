import { RetrievalResponse } from "../types/retrievalTypes";
import RadarChart from "./RadarChart";

interface Props {
  results: { url: string; result: RetrievalResponse }[];
}

export default function ComparePanel({ results }: Props) {
  const winner = results.reduce((prev, current) =>
    prev.result.final_score > current.result.final_score ? prev : current
  );

  return (
    <div className="card full-width">
      <h3>Competitive Comparison</h3>

      {results.map((item, index) => (
        <div key={index} style={{ marginBottom: "40px" }}>
          <h4>
            {item.url}
            {winner.url === item.url && (
              <span className="winner-badge">Winner</span>
            )}
          </h4>

          <p>Score: {item.result.final_score}</p>

          <RadarChart breakdown={item.result.breakdown} />
        </div>
      ))}
    </div>
  );
}
