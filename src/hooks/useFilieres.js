import { getFormations } from "../api/educationService";
import { useQuery } from '@tanstack/react-query';
import { educationQueries } from '../api/queries';

/**
 * Custom hook to fetch formations for a specific year
 * @param {number|string} yearId - ID of the year
 * @returns {Object} { formations, loading, error }
 */
export function useFilieres(yearId) {
    const {
        data: filieres = [],
        isLoading: loading,
        error
    } = useQuery(educationQueries.formations(yearId));

    return { Filieres: filieres, loading, error: error ? error.message : null };
}
