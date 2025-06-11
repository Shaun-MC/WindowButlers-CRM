// frontend/src/components/features/manage-data/components/SearchBar.jsx
import React from 'react';
import { ReactComponent as SearchIcon } from '../../icons/magnifying-glass.svg';
import { ReactComponent as FilterIcon } from '../../icons/filter.svg';
import { ReactComponent as ClearIcon } from '../../icons/x.svg';
import './SearchBar.css';

/**
 * @param {Object} props
 * @param {string} props.searchQuery
 * @param {function} props.onSearchChange
 * @param {function} props.onSearchSubmit
 * @param {boolean} props.isLoading
 * @param {boolean} props.showFilters
 * @param {function} props.onToggleFilters
 */
export const SearchBar = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  isLoading,
  showFilters,
  onToggleFilters,
  onClear, // add onClear prop
}) => {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit();
  };

  const handleClear = () => {
    onSearchChange('');
    if (onClear) onClear(); // call onClear if provided
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit} className="search-bar-form">
        <div className="search-bar-input-wrapper">
          <div className="search-bar-icon-left">
            <SearchIcon className="search-bar-icon" />
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search for names, addresses, or businesses..."
            className="search-bar-input"
            disabled={isLoading}
          />

          <div className="search-bar-controls">
            {searchQuery && (
              <button
                type="button"
                onClick={handleClear}
                className="search-bar-clear-button"
                aria-label="Clear search"
              >
                <ClearIcon className="search-bar-icon" />
              </button>
            )}

            <button
              type="button"
              onClick={onToggleFilters}
              className={`search-bar-filter-button ${showFilters
                  ? 'search-bar-filter-button--active'
                  : 'search-bar-filter-button--inactive'
                }`}
              aria-label="Toggle filters"
            >
              <FilterIcon className="search-bar-icon" />
            </button>

            <button
              type="submit"
              disabled={isLoading || !searchQuery.trim()}
              className="search-bar-submit-button"
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;