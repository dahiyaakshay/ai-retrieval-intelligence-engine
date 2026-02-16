export interface SectionScore {
  heading: string;
  fact_density: number;
  topic_reinforcement: number;
  informational_score: number;
}

export interface RetrievalBreakdown {
  dom: number;
  headings: number;
  fact_density: number;
  entity_clarity: number;
  tone_neutrality: number;
}

export interface RetrievalResponse {
  final_score: number;
  breakdown: RetrievalBreakdown;
  sections: SectionScore[];
}
