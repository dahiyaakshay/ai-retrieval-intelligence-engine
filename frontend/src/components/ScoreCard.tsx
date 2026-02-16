import { useEffect, useState } from "react";

interface Props {
  score: number;
}

export default function ScoreCard({ score }: Props) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      start += 2;
      if (start >= score) {
        setDisplay(score);
        clearInterval(interval);
      } else {
        setDisplay(start);
      }
    }, 15);
  }, [score]);

  return (
    <div className="card">
      <h3>AI Retrieval Score</h3>
      <div className="score-number orange">
        {display.toFixed(2)}
      </div>
      <p>
        Overall citation readiness based on structure,
        informational density, and topic reinforcement.
      </p>
    </div>
  );
}
