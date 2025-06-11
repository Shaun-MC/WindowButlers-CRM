import React, { useState } from 'react';
import { SearchBar } from '../search/SearchBar';
import { SearchFilters } from '../search/SearchFilters';
import { SearchResults } from '../search/SearchResults';
import { useSearch } from '../hooks/useSearch';
import './ManageData.css';

const ManageDataPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({ type: 'all' });

    const { results, loading, error, hasSearched, searchApi } = useSearch();

    const handleSearchSubmit = () => {
        if (searchQuery.trim()) {
            searchApi(searchQuery, filters);
        }
    };

    const handleToggleFilters = () => {
        setShowFilters(!showFilters);
    };

    return (
        <div className="manage-data-page">
            <div className="manage-data-spacer"></div>

            {/* Subheader */}
            <div className="manage-data-subheader">
                <div className="manage-data-container">
                    <div className="manage-data-header">
                        <div className="manage-data-header-content">
                            <h1 className="manage-data-title">
                                Add, View, and Edit Client and Business Data
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
                        onSearchChange={setSearchQuery}
                        onSearchSubmit={handleSearchSubmit}
                        isLoading={loading}
                        showFilters={showFilters}
                        onToggleFilters={handleToggleFilters}
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
                    />
                </div>
            </div>
        </div>
    );
};

export default ManageDataPage;