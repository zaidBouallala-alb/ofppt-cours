import { useState, useMemo } from 'react';

/**
 * Custom hook for client-side search/filtering.
 * 
 * @param {Array} data - The dataset to filter.
 * @param {Array<string>} keys - The keys in the data objects to search against (e.g., ['name', 'code']).
 * @returns {Object} { searchQuery, setSearchQuery, filteredData }
 */
export function useSearch(data, keys) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredData = useMemo(() => {
        if (!searchQuery) return data;

        const lowerQuery = searchQuery.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        return data.filter(item => {
            return keys.some(key => {
                const value = item[key];
                if (typeof value !== 'string') return false;

                const lowerValue = value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                return lowerValue.includes(lowerQuery);
            });
        });
    }, [data, searchQuery, keys]);

    return {
        searchQuery,
        setSearchQuery,
        filteredData
    };
}
