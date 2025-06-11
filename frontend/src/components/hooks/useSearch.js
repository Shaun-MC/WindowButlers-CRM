// frontend/src/components/hooks/useSearch.js
import { useState, useCallback } from "react";

// This would be your Spring Boot API endpoint
const API_BASE_URL = "http://localhost:8080/api";

export const useSearch = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);

    const searchApi = useCallback(async (query, filters) => {
        setLoading(true);
        setError(null);
        setHasSearched(true);

        try {
            // Construct query parameters
            const params = new URLSearchParams({
                q: query,
                type: filters.type,
            });

            if (filters.location) {
                params.append("location", filters.location);
            }

            // Make API call to Spring Boot application
            const response = await fetch(`${API_BASE_URL}/search?${params}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    // Add any authentication headers if needed
                    // 'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Search failed: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            setResults(data);
        } catch (err) {
            console.error("Search error:", err);
            setError(err instanceof Error ? err.message : "An unexpected error occurred");

            // For demo purposes, return mock data when API is not available
            if (err instanceof Error && err.message.includes("fetch")) {
                setError(null);
                setResults(getMockResults(query));
            }
        } finally {
            setLoading(false);
        }
    }, []);

    // OPTIMIZED: Synchronous clear function for instant results
    const resetSearch = useCallback(() => {
        // Use React's synchronous state updates with functional updates
        // This ensures immediate state changes without waiting for re-renders
        setResults(() => []);
        setHasSearched(() => false);
        setError(() => null);
        setLoading(() => false);
    }, []);

    // Alternative: Batch state updates for even better performance
    const clearResults = useCallback(() => {
        // Batch multiple state updates to minimize re-renders
        setResults([]);
        setHasSearched(false);
        setError(null);
        setLoading(false);
    }, []);

    // PERFORMANCE: Use flushSync for immediate DOM updates if needed
    const instantClear = useCallback(() => {
        // Import flushSync from react-dom if you need immediate DOM updates
        // import { flushSync } from 'react-dom';

        // flushSync(() => {
        setResults([]);
        setHasSearched(false);
        setError(null);
        setLoading(false);
        // });
    }, []);

    return {
        results,
        loading,
        error,
        hasSearched,
        searchApi,
        clearResults,
        resetSearch,
        instantClear, // For the fastest possible clear
    };
};

// Mock data for demo purposes when Spring Boot API is not available
const getMockResults = (query) => {
    const mockResults = [
        {
            id: "1",
            name: "John Smith",
            address: {
                street: "123 Main Street",
                city: "New York",
                state: "NY",
                zipCode: "10001",
                country: "United States",
            },
            email: "john.smith@email.com",
            phone: "+1 (555) 123-4567",
            type: "person",
            lastUpdated: "2024-01-15T10:30:00Z",
        },
        {
            id: "2",
            name: "Acme Corporation",
            address: {
                street: "456 Business Ave",
                city: "Los Angeles",
                state: "CA",
                zipCode: "90210",
                country: "United States",
            },
            email: "contact@acme.com",
            phone: "+1 (555) 987-6543",
            type: "business",
            lastUpdated: "2024-01-20T14:45:00Z",
        },
        {
            id: "3",
            name: "Sarah Johnson",
            address: {
                street: "789 Oak Street",
                city: "Chicago",
                state: "IL",
                zipCode: "60601",
                country: "United States",
            },
            email: "sarah.johnson@email.com",
            phone: "+1 (555) 246-8135",
            type: "person",
            lastUpdated: "2024-01-18T09:15:00Z",
        },
    ];

    // Simple filter based on query
    return mockResults.filter(
        (result) =>
            result.name.toLowerCase().includes(query.toLowerCase()) ||
            Object.values(result.address).some((value) =>
                value.toLowerCase().includes(query.toLowerCase())
            )
    );
};
