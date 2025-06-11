import React, { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { SearchFilters } from './components/SearchFilters';
import { SearchResults } from './components/SearchResults';
import { useSearch } from './hooks/useSearch';
import { useDebounce } from './hooks/useDebounce';

const ManageDataPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ type: 'all' });

  const { results, loading, error, hasSearched, searchApi } = useSearch();
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    if (debouncedSearchQuery.trim().length >= 2) {
      searchApi(debouncedSearchQuery, filters);
    }
  }, [debouncedSearchQuery, filters, searchApi]);

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      searchApi(searchQuery, filters);
    }
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br white">

      <div className="h-16"></div>
      
      {/* Subheader */}
      <div className="bg-white/80 backdrop-blur-sm pt-20">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Add, View, and Edit Client and Business Data
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Search Bar */}
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearchSubmit={handleSearchSubmit}
            isLoading={loading}
            showFilters={showFilters}
            onToggleFilters={handleToggleFilters}
          />

          {/* Search Filters */}
          <SearchFilters
            filters={filters}
            onFiltersChange={setFilters}
            isVisible={showFilters}
          />

          {/* Search Results */}
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