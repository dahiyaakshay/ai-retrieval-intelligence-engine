import { RetrievalResponse } from "../types/retrievalTypes";
import { generateExecutiveSummary } from "../utils/scoreHelpers";

interface Props {
  data: RetrievalResponse;
}

export default function ExecutiveSummary({ data }: Props) {
  const summary = generateExecutiveSummary(data);

  return (
    <div className="card full-width">
      <h3>Executive Summary</h3>
      <p>{summary}</p>
    </div>
  );
}
