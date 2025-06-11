import React from 'react';

import {ReactComponent as SearchIcon} from '../icons/magnifying-glass-9-svgrepo-com.svg';
import {ReactComponent as FilterIcon} from '../icons/filter-svgrepo-com.svg';
import {ReactComponent as ClearIcon} from '../icons/x-symbol-svgrepo-com.svg';

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
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit();
  };

  const handleClear = () => {
    onSearchChange('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search for names, addresses, or businesses..."
            className="w-full pl-12 pr-20 py-4 text-lg border-0 rounded-2xl shadow-lg bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 placeholder-gray-500"
            disabled={isLoading}
          />
          
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            {searchQuery && (
              <button
                type="button"
                onClick={handleClear}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ClearIcon className="h-5 w-5" />
              </button>
            )}
            
            <button
              type="button"
              onClick={onToggleFilters}
              className={`p-2 ml-1 rounded-lg transition-colors ${
                showFilters
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <FilterIcon className="h-5 w-5" />
            </button>
            
            <button
              type="submit"
              disabled={isLoading || !searchQuery.trim()}
              className="ml-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};