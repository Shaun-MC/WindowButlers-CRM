import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SearchBar } from '../search/SearchBar';
import { SearchFilters } from '../search/SearchFilters';
import { SearchResults } from '../search/SearchResults';
import { useSearch } from '../hooks/useSearch';
import { ManageDataResultCard } from '../search/ManageDataResultCard.jsx';
import './ManageData.css';

const ManageDataPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({ type: 'all' });

    // Ref to track the debounce timer
    const debounceTimerRef = useRef(null);
    const lastSearchRef = useRef('');

    // Use the hook's state
    const { results, loading, error, hasSearched, searchApi, resetSearch } = useSearch();

    // Debounced search function
    const debouncedSearch = useCallback((query, currentFilters) => {
        // Clear any existing timer
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        // Only set up debounced search if there's a query and it's different from last search
        const trimmedQuery = query.trim();
        if (trimmedQuery.length >= 2 && trimmedQuery !== lastSearchRef.current) {
            debounceTimerRef.current = setTimeout(() => {
                lastSearchRef.current = trimmedQuery;
                searchApi(trimmedQuery, currentFilters);
            }, 500);
        }
    }, [searchApi]);

    // Auto-search when query changes (debounced)
    useEffect(() => {
        debouncedSearch(searchQuery, filters);

        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, [searchQuery, filters, debouncedSearch]);

    const handleSearchSubmit = useCallback(() => {
        // Clear any pending debounced search
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        const trimmedQuery = searchQuery.trim();
        if (trimmedQuery) {
            lastSearchRef.current = trimmedQuery;
            searchApi(trimmedQuery, filters);
        }
    }, [searchQuery, filters, searchApi]);

    const handleToggleFilters = useCallback(() => {
        setShowFilters(prev => !prev);
    }, []);

    const handleClearSearch = useCallback(() => {
        // Clear any pending debounced search immediately
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        // Reset search state IMMEDIATELY (synchronous)
        resetSearch();
        lastSearchRef.current = '';

        // Then update the input and filters
        setSearchQuery('');
        setShowFilters(false);
    }, [resetSearch]);

    // Handle search query changes
    const handleSearchChange = useCallback((newQuery) => {
        setSearchQuery(newQuery);

        // If the query is manually cleared, immediately reset
        if (newQuery.trim() === '') {
            // Clear any pending search
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
            resetSearch();
            lastSearchRef.current = '';
        }
    }, [resetSearch]);

    // Handle filter changes
    const handleFiltersChange = useCallback((newFilters) => {
        setFilters(newFilters);
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, []);

    return (
        <div className="manage-data-page">
            {/* Subheader */}
            <div className="manage-data-subheader">
                <div className="manage-data-container">
                    <div className="manage-data-header">
                        <div className="manage-data-header-content">
                            <h1 className="manage-data-title">
                                View and Edit Client & Business Records
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="manage-data-main">
                <div className="manage-data-content">
                    <SearchBar
                        searchQuery={searchQuery}
                        onSearchChange={handleSearchChange}
                        onSearchSubmit={handleSearchSubmit}
                        isLoading={loading}
                        showFilters={showFilters}
                        onToggleFilters={handleToggleFilters}
                        onClear={handleClearSearch}
                        placeholder="Input a name or address"
                    />

                    <SearchFilters
                        filters={filters}
                        onFiltersChange={handleFiltersChange}
                        isVisible={showFilters}
                    />

                    <SearchResults
                        results={results}
                        loading={loading}
                        error={error}
                        hasSearched={hasSearched}
                        cardComponent={ManageDataResultCard}
                    />
                </div>
            </div>
        </div>
    );
};

export default ManageDataPage;