import axios from "axios";

export async function fetchRetrievalScore(url: string) {
  const response = await axios.get(
    `http://localhost:8000/api/score?url=${encodeURIComponent(url)}`
  );
  return response.data;
}