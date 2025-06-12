// frontend/src/components/search/SearchResults.jsx
import React from 'react';
import ResultCard from './ManageDataResultCard.jsx';
import { ReactComponent as SearchIcon } from '../../icons/magnifying-glass.svg';
import { ReactComponent as AlertIcon } from '../../icons/checkbox-alert.svg';
import './SearchResults.css';

/**
 * @param {Object} props
 * @param {import('../types/index.js').SearchResult[]} props.results
 * @param {boolean} props.loading
 * @param {string|null} props.error
 * @param {boolean} props.hasSearched
 */
export const SearchResults = ({
  results,
  loading,
  error,
  hasSearched,
}) => {
  if (loading) {
    return (
      <div className="search-results-container">
        <div className="search-results-loading">
          <div className="search-results-spinner"></div>
          <p className="search-results-loading-text">Searching...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="search-results-container">
        <div className="search-results-error">
          <div className="search-results-error-content">
            <AlertIcon className="search-results-error-icon" />
            <div>
              <h3 className="search-results-error-title">Search Error</h3>
              <p className="search-results-error-message">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (hasSearched && results.length === 0) {
    return (
      <div className="search-results-container">
        <div className="search-results-empty">
          <SearchIcon className="search-results-empty-icon" />
          <div className="search-results-empty-content">
            <h3 className="search-results-empty-title">
              No results found
            </h3>
            <p className="search-results-empty-subtitle">
              Try adjusting your search terms or filters
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="search-results-container">
      {hasSearched && (
        <div className="search-results-header">
          <p className="search-results-count">
            Found {results.length} result{results.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
      <div className="search-results-grid">
        {results.map((result) => (
          <ResultCard key={result.id} result={result} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;