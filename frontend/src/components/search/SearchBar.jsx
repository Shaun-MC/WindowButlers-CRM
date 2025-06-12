// frontend/src/components/search/SearchBar.jsx
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
 * @param {function} props.onClear
 * @param {string} [props.placeholder=""] 
 */
export const SearchBar = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  isLoading,
  showFilters,
  onToggleFilters,
  onClear,
  placeholder = "", 
}) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit();
  };

  const handleClear = () => {
    // Call the onClear callback which will handle clearing both input and results
    if (onClear) {
      onClear();
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onSearchChange(newValue);
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
            onChange={handleInputChange}
            placeholder={placeholder} // Use the prop here
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
                title="Clear search"
              >
                <ClearIcon />
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
              title="Toggle filters"
            >
              <FilterIcon className="search-bar-icon" />
            </button>

            <button
              type="submit"
              disabled={isLoading || !searchQuery.trim()}
              className="search-bar-submit-button"
              title="Search"
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