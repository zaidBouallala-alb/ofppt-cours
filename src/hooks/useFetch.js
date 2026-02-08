import { useState, useEffect, useRef } from 'react';

// Simple in-memory cache
const cache = new Map();

/**
 * Reusable hook for data fetching with caching
 * @param {Function} fetchFunction - Async function to fetch data
 * @param {Array} dependencies - Dependencies to re-fetch
 * @param {string|null} cacheKey - Key to store/retrieve from cache (optional)
 */
export function useFetch(fetchFunction, dependencies = [], cacheKey = null) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        let shouldFetch = true;

        const fetchData = async () => {
            // Check Cache
            if (cacheKey && cache.has(cacheKey)) {
                setData(cache.get(cacheKey));
                setLoading(false);
                shouldFetch = false; // Don't fetch if cached
            }

            if (!shouldFetch) return;

            try {
                setLoading(true);
                setError(null);
                const result = await fetchFunction();

                if (isMounted.current) {
                    setData(result);
                    if (cacheKey) cache.set(cacheKey, result);
                }
            } catch (err) {
                if (isMounted.current) {
                    setError(err.message || 'An error occurred');
                }
            } finally {
                if (isMounted.current) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted.current = false;
        };
    }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

    return { data, loading, error };
}
