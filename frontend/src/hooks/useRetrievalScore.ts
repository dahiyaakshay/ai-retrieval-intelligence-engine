import { useState, useCallback } from "react";
import { fetchRetrievalScore } from "../api/retrievalApi";
import { RetrievalResponse } from "../types/retrievalTypes";

interface CompareResult {
  url: string;
  result: RetrievalResponse;
}

export function useRetrievalScore() {
  const [data, setData] = useState<RetrievalResponse | null>(null);
  const [compareData, setCompareData] = useState<CompareResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Analyze single URL
   */
  const getScore = useCallback(async (url: string) => {
    if (!url) return;

    try {
      setLoading(true);
      setError(null);
      setCompareData([]);

      const result = await fetchRetrievalScore(url);

      setData(result);
    } catch (err: any) {
      setError("Failed to analyze URL. Please check the link.");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Competitive comparison mode
   */
  const compareUrls = useCallback(async (urls: string[]) => {
    if (!urls || urls.length === 0) return;

    try {
      setLoading(true);
      setError(null);
      setData(null);

      const results = await Promise.all(
        urls.map(async (url) => {
          const result = await fetchRetrievalScore(url);
          return { url, result };
        })
      );

      setCompareData(results);
    } catch (err: any) {
      setError("Comparison failed. One or more URLs could not be processed.");
      setCompareData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Reset state
   */
  const reset = () => {
    setData(null);
    setCompareData([]);
    setError(null);
  };

  return {
    data,
    compareData,
    loading,
    error,
    getScore,
    compareUrls,
    reset
  };
}
