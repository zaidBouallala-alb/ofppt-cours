import { getYears } from "../api/educationService";
import { useFetch } from "./useFetch";

/**
 * Custom hook to fetch and manage education years data
 * Uses generic useFetch with caching
 * @returns {Object} { years, loading, error }
 */
export const useYears = () => {
  const { data, loading, error } = useFetch(getYears, [], 'years');

  // Sort by order safely
  const years = data ? [...data].sort((a, b) => a.order - b.order) : [];

  return { years, loading, error };
};
