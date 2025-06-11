import React from 'react';

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
    <div className="w-full max-w-4xl mx-auto mt-4 p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg">
      <div className="flex flex-wrap gap-6">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Type
          </label>
          <select
            value={filters.type}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Results</option>
            <option value="person">People</option>
            <option value="business">Businesses</option>
          </select>
        </div>
        
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location Filter
          </label>
          <input
            type="text"
            value={filters.location || ''}
            onChange={(e) => handleLocationChange(e.target.value)}
            placeholder="City, State, or ZIP code"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};