import { getFormations } from "../api/educationService";
import { useFetch } from "./useFetch";
import { useCallback } from "react";

/**
 * Custom hook to fetch formations for a specific year
 * @param {number|string} yearId - ID of the year
 * @returns {Object} { formations, loading, error }
 */
export const useFilieres = (yearId) => {
    // Wrap fetch function
    const fetchFormations = useCallback(() => {
        if (!yearId) return Promise.resolve([]);
        return getFormations(yearId);
    }, [yearId]);

    const { data: formations, loading, error } = useFetch(
        fetchFormations,
        [yearId],
        yearId ? `formations-${yearId}` : null
    );

    return { formations: formations || [], loading, error };
};
