import React from 'react';
import { ResultCard } from './ResultCard';

import {ReactComponent as SearchIcon} from '../icons/magnifying-glass-9-svgrepo-com.svg';
import {ReactComponent as AlertIcon} from '../icons/checkbox-blank-circle-svgrepo-com.svg'

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
      <div className="w-full max-w-4xl mx-auto mt-8">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Searching...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center">
            <AlertIcon className="h-6 w-6 text-red-600 mr-3" />
            <div>
              <h3 className="text-lg font-medium text-red-800">Search Error</h3>
              <p className="text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (hasSearched && results.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8">
        <div className="text-center py-12">
          <SearchIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-500 mb-2">
            No results found
          </h3>
          <p className="text-gray-400">
            Try adjusting your search terms or filters
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="mb-6">
        <p className="text-lg font-medium text-gray-700">
          Found {results.length} result{results.length !== 1 ? 's' : ''}
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
        {results.map((result) => (
          <ResultCard key={result.id} result={result} />
        ))}
      </div>
    </div>
  );
};