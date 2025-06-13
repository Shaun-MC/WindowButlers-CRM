// Enhanced useSearch hook with comprehensive debugging
// frontend/src/components/hooks/useSearch.js
import React from "react";
import { useState, useCallback } from "react";

const API_BASE_URL = "http://localhost:8080/api";

// Debug utility function
const debugLog = (category, message, data = null) => {
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    
    console.group(`🔍 [${timestamp}] ${category} - iOS:${isIOS} Safari:${isSafari}`);
    console.log(message);
    if (data) {
        console.log('Data:', data);
    }
    console.trace();
    console.groupEnd();
};

export const useSearch = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);

    debugLog('HOOK_INIT', 'useSearch hook initialized');

    const searchApi = useCallback(async (query, filters) => {
        debugLog('SEARCH_START', 'searchApi called', { 
            query, 
            filters, 
            currentLoading: loading,
            queryType: typeof query,
            queryLength: query?.length,
            trimmedQuery: query?.trim(),
            trimmedLength: query?.trim()?.length
        });

        // Prevent multiple simultaneous searches
        if (loading) {
            debugLog('SEARCH_BLOCKED', 'Search blocked - already loading');
            return;
        }

        try {
            debugLog('SEARCH_STATE_UPDATE', 'Setting loading state');
            setLoading(true);
            setError(null);
            setHasSearched(true);

            const trimmedQuery = query.trim();
            debugLog('SEARCH_PARAMS', 'Building search parameters', {
                originalQuery: query,
                trimmedQuery,
                filters,
                API_BASE_URL
            });

            const params = new URLSearchParams({
                q: trimmedQuery,
                type: filters.type,
            });

            if (filters.location) {
                params.append("location", filters.location);
            }

            const searchUrl = `${API_BASE_URL}/search?${params}`;
            debugLog('SEARCH_URL', 'Final search URL', { searchUrl });

            // Use AbortController for better request handling
            const controller = new AbortController();
            const timeoutId = setTimeout(() => {
                debugLog('SEARCH_TIMEOUT', 'Request timeout triggered');
                controller.abort();
            }, 10000);

            debugLog('SEARCH_FETCH_START', 'Starting fetch request');

            const response = await fetch(searchUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                signal: controller.signal,
            });

            clearTimeout(timeoutId);
            
            debugLog('SEARCH_RESPONSE', 'Fetch response received', {
                status: response.status,
                statusText: response.statusText,
                ok: response.ok,
                headers: Array.from(response.headers.entries())
            });

            if (!response.ok) {
                throw new Error(`Search failed: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            debugLog('SEARCH_DATA', 'Response data parsed', {
                dataType: typeof data,
                isArray: Array.isArray(data),
                length: data?.length,
                data: data
            });

            // Use functional update to ensure state consistency
            setResults(prevResults => {
                debugLog('SEARCH_RESULTS_UPDATE', 'Updating results state', {
                    prevResults,
                    newData: data,
                    prevLength: prevResults?.length,
                    newLength: data?.length
                });
                return data;
            });
            
            debugLog('SEARCH_SUCCESS', 'Search completed successfully');
            
        } catch (err) {
            debugLog('SEARCH_ERROR', 'Search error occurred', {
                errorName: err.name,
                errorMessage: err.message,
                errorStack: err.stack,
                isAbortError: err.name === 'AbortError',
                isFetchError: err.message.includes("fetch") || err.message.includes("Failed to fetch"),
                isNetworkError: err instanceof TypeError && err.message.includes('fetch')
            });

            if (err.name === 'AbortError') {
                setError("Search timed out. Please try again.");
                debugLog('SEARCH_TIMEOUT_ERROR', 'Setting timeout error');
            } else {
                const errorMsg = err instanceof Error ? err.message : "An unexpected error occurred";
                setError(errorMsg);
                debugLog('SEARCH_GENERAL_ERROR', 'Setting general error', { errorMsg });
            }

            // For demo purposes, return mock data when API is not available
            const shouldUseMock = err instanceof Error && (
                err.message.includes("fetch") || 
                err.message.includes("Failed to fetch") ||
                err.message.includes("NetworkError") ||
                err.message.includes("net::ERR_") ||
                err.name === 'TypeError'
            );

            if (shouldUseMock) {
                debugLog('SEARCH_MOCK_FALLBACK', 'Using mock data fallback');
                setError(null);
                const mockResults = getMockResults(query);
                debugLog('SEARCH_MOCK_DATA', 'Generated mock results', {
                    mockResultsLength: mockResults.length,
                    mockResults
                });
                setResults(mockResults);
            }
        } finally {
            debugLog('SEARCH_FINALLY', 'Setting loading to false');
            setLoading(false);
        }
    }, [loading]);

    // Optimized clear function with immediate state updates
    const resetSearch = useCallback(() => {
        debugLog('SEARCH_RESET', 'Resetting search state');
        setResults([]);
        setHasSearched(false);
        setError(null);
        setLoading(false);
    }, []);

    // Debug current state whenever it changes
    React.useEffect(() => {
        debugLog('SEARCH_STATE_CHANGE', 'Search state updated', {
            resultsLength: results.length,
            loading,
            error,
            hasSearched,
            results: results.slice(0, 2) // Only log first 2 results to avoid spam
        });
    }, [results, loading, error, hasSearched]);

    return {
        results,
        loading,
        error,
        hasSearched,
        searchApi,
        resetSearch,
    };
};

// Mock data function with debugging
const getMockResults = (query) => {
    debugLog('MOCK_DATA_START', 'Generating mock data', { query });
    
    const mockResults = [
        {
            id: "1",
            name: "Shaun Cushman",
            address: {
                street: "123 Main Street",
                city: "Bothell",
                state: "WA",
                zipCode: "12345",
                country: "United States",
            },
            email: "test@email.com",
            phone: "+1 (111) 111-1111",
            type: "person",
            lastUpdated: "2025-06-13T10:30:00Z",
            generalNotes: "test",
        },
        {
            id: "2",
            name: "Shauna Cashman",
            address: {
                street: "321 NE Test St",
                city: "Maple Valey",
                state: "WA",
                zipCode: "54321",
                country: "United States",
            },
            email: "shaunacashman@email.com",
            phone: "+1 (123) 456-7890",
            type: "person",
            lastUpdated: "2024-09-24T09:15:00Z",
            generalNotes: "test",
        },
    ];

    const filteredResults = mockResults.filter(
        (result) =>
            result.name.toLowerCase().includes(query.toLowerCase()) ||
            (result.address &&
                Object.values(result.address).some((value) =>
                    value.toLowerCase().includes(query.toLowerCase())
                ))
    );

    debugLog('MOCK_DATA_FILTERED', 'Mock data filtered', {
        originalCount: mockResults.length,
        filteredCount: filteredResults.length,
        query: query.toLowerCase(),
        filteredResults
    });

    return filteredResults;
};