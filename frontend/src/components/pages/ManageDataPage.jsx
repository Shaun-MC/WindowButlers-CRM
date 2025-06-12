import React, { useState, useEffect, useRef } from 'react';
import { SearchBar } from '../search/SearchBar';
import { SearchFilters } from '../search/SearchFilters';
import { SearchResults } from '../search/SearchResults';
import { useSearch } from '../hooks/useSearch';
import { ManageDataResultCard } from '../search/ManageDataResultCard';
import './ManageData.css';

const ManageDataPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({ type: 'all' });

    // Ref to track the debounce timer
    const debounceTimerRef = useRef(null);

    // Use the hook's state instead of duplicating it
    const { results, loading, error, hasSearched, searchApi, resetSearch } = useSearch();

    // Auto-search when query changes (debounced)
    useEffect(() => {
        // Clear any existing timer
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        // Only set up debounced search if there's a query
        if (searchQuery.trim().length >= 2) {
            debounceTimerRef.current = setTimeout(() => {
                searchApi(searchQuery, filters);
            }, 500);
        }

        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, [searchQuery, filters, searchApi]);

    const handleSearchSubmit = () => {
        // Clear any pending debounced search
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        if (searchQuery.trim()) {
            searchApi(searchQuery, filters);
        }
    };

    const handleToggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const handleClearSearch = () => {
        // Clear any pending debounced search immediately
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        // Reset search state IMMEDIATELY (synchronous)
        resetSearch();

        // Then update the input and filters
        setSearchQuery('');
        setShowFilters(false);
    };

    // Handle search query changes
    const handleSearchChange = (newQuery) => {
        setSearchQuery(newQuery);

        // If the query is manually cleared (backspace/delete), immediately reset
        if (newQuery.trim() === '') {
            // Clear any pending search
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
            resetSearch();
        }
    };

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
                        onFiltersChange={setFilters}
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