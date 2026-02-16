import {
  Radar,
  RadarChart as ReRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from "recharts";

interface Props {
  breakdown: any;
}

export default function RadarChart({ breakdown }: Props) {
  const data = [
    { subject: "DOM", value: breakdown.dom },
    { subject: "Headings", value: breakdown.headings },
    { subject: "Facts", value: breakdown.fact_density },
    { subject: "Entities", value: breakdown.entity_clarity },
    { subject: "Tone", value: breakdown.tone_neutrality }
  ];

  return (
    <div className="card">
      <h3>Structural Breakdown</h3>
      <ResponsiveContainer width="100%" height={350}>
        <ReRadarChart data={data}>
          <PolarGrid stroke="#444" />
          <PolarAngleAxis dataKey="subject" stroke="#aaa" />
          <PolarRadiusAxis domain={[0, 100]} stroke="#666" />
          <Radar
            dataKey="value"
            stroke="#FF6B35"
            fill="#FF6B35"
            fillOpacity={0.6}
          />
        </ReRadarChart>
      </ResponsiveContainer>
    </div>
  );
}
