import UrlInput from "../components/UrlInput";
import ScoreCard from "../components/ScoreCard";
import RadarChart from "../components/RadarChart";
import SectionTable from "../components/SectionTable";
import ExecutiveSummary from "../components/ExecutiveSummary";
import ScoreBreakdown from "../components/ScoreBreakdown";
import ComparePanel from "../components/ComparePanel";
import { useRetrievalScore } from "../hooks/useRetrievalScore";

export default function RetrievalDashboard() {
  const { data, compareData, loading, getScore } = useRetrievalScore();

  return (
    <div className="container">
      <div className="header">
        <h1 className="orange">AI Retrieval Intelligence Engine</h1>
      </div>

      <UrlInput onSubmit={getScore} />

      {loading && <p>Analyzing...</p>}

      {data && (
        <>
          <div className="top-grid">
            <ScoreCard score={data.final_score} />
            <RadarChart breakdown={data.breakdown} />
          </div>

          <div className="middle-grid">
            <ScoreBreakdown breakdown={data.breakdown} />
            <ExecutiveSummary data={data} />
          </div>

          <SectionTable sections={data.sections} />
        </>
      )}

      {compareData.length > 0 && (
        <ComparePanel results={compareData} />
      )}
    </div>
  );
}
