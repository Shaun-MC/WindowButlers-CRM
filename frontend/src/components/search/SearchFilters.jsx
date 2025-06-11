// frontend/src/components/features/manage-data/components/SearchFilters.jsx
import React from 'react';
import './SearchFilters.css';

/**
 * @param {Object} props
 * @param {import('../types/index.js').SearchFilters} props.filters
 * @param {function} props.onFiltersChange
 * @param {boolean} props.isVisible
 */
export const SearchFilters = ({
  filters,
  onFiltersChange,
  isVisible,
}) => {
  if (!isVisible) return null;

  const handleTypeChange = (type) => {
    onFiltersChange({ ...filters, type });
  };

  const handleLocationChange = (location) => {
    onFiltersChange({ ...filters, location: location || undefined });
  };

  return (
    <div className="search-filters-container">
      <div className="search-filters-content">
        <div className="search-filters-field">
          <label className="search-filters-label">
            Search Type
          </label>
          <select
            value={filters.type}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="search-filters-select"
          >
            <option value="all">All Results</option>
            <option value="person">People</option>
            <option value="business">Businesses</option>
          </select>
        </div>

        <div className="search-filters-field">
          <label className="search-filters-label">
            Location Filter
          </label>
          <input
            type="text"
            value={filters.location || ''}
            onChange={(e) => handleLocationChange(e.target.value)}
            placeholder="City, State, or ZIP code"
            className="search-filters-input"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;