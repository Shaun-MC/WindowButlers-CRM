import React, { useCallback, useRef, useEffect } from 'react';
//import { ReactComponent as SearchIcon } from '../../icons/magnifying-glass.svg';
import { ReactComponent as FilterIcon } from '../../icons/filter.svg';
import { ReactComponent as ClearIcon } from '../../icons/x.svg';
import './SearchBar.css';

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
  const inputRef = useRef(null);
  const formRef = useRef(null);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    // Blur input on iOS Safari to hide keyboard
    if (inputRef.current) {
      inputRef.current.blur();
    }

    onSearchSubmit();
  }, [onSearchSubmit]);

  const handleClear = useCallback(() => {
    // Call the onClear callback which will handle clearing both input and results
    if (onClear) {
      onClear();
    }

    // Focus input after clearing (but don't zoom on iOS)
    if (inputRef.current) {
      // Small delay to ensure state is updated
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [onClear]);

  const handleInputChange = useCallback((e) => {
    const newValue = e.target.value;
    onSearchChange(newValue);
  }, [onSearchChange]);

  // Handle iOS Safari specific input behaviors
  const handleInputFocus = useCallback((e) => {
    // Prevent iOS Safari zoom by ensuring font-size is maintained
    const input = e.target;
    input.style.fontSize = '16px';
    input.style.webkitTextSizeAdjust = '100%';
  }, []);

  const handleInputBlur = useCallback((e) => {
    // Additional cleanup on blur if needed
    const input = e.target;
    input.style.fontSize = '16px';
  }, []);

  // Handle touch events for better iOS Safari experience
  const handleInputTouchStart = useCallback((e) => {
    // Prevent double-tap zoom
    e.currentTarget.style.touchAction = 'manipulation';
  }, []);

  // Prevent form submission on Enter key for better mobile experience
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  }, [handleSubmit]);

  // Enhanced button handlers for iOS Safari
  const handleFilterToggle = useCallback((e) => {
    e.preventDefault();
    onToggleFilters();
  }, [onToggleFilters]);

  // Ensure proper cleanup
  useEffect(() => {
    const currentInput = inputRef.current;

    if (currentInput) {
      // Additional iOS Safari fixes
      currentInput.setAttribute('autocomplete', 'off');
      currentInput.setAttribute('autocorrect', 'off');
      currentInput.setAttribute('autocapitalize', 'off');
      currentInput.setAttribute('spellcheck', 'false');
    }

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="search-bar-container">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="search-bar-form"
        noValidate
      >
        <div className="search-bar-input-wrapper">

          <input
            ref={inputRef}
            type="search" // Use search type for better mobile experience
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onTouchStart={handleInputTouchStart}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="search-bar-input"
            disabled={isLoading}
            // iOS Safari specific attributes
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            inputMode="search"
            // Prevent zoom
            style={{
              fontSize: '16px',
              WebkitTextSizeAdjust: '100%',
              touchAction: 'manipulation'
            }}
          />

          <div className="search-bar-controls">
            {searchQuery && (
              <button
                type="button"
                onClick={handleClear}
                className="search-bar-clear-button"
                aria-label="Clear search"
                title="Clear search"
                // iOS Safari touch optimizations
                onTouchEnd={(e) => {
                  e.preventDefault();
                  handleClear();
                }}
              >
                <ClearIcon />
              </button>
            )}

            <button
              type="button"
              onClick={handleFilterToggle}
              className={`search-bar-filter-button ${showFilters
                ? 'search-bar-filter-button--active'
                : 'search-bar-filter-button--inactive'
                }`}
              aria-label="Toggle filters"
              title="Toggle filters"
              // iOS Safari touch optimizations
              onTouchEnd={(e) => {
                e.preventDefault();
                handleFilterToggle(e);
              }}
            >
              <FilterIcon className="search-bar-icon" />
            </button>

            <button
              type="submit"
              disabled={isLoading || !searchQuery.trim()}
              className="search-bar-submit-button"
              title="Search"
              // iOS Safari touch optimizations
              onTouchEnd={(e) => {
                if (!isLoading && searchQuery.trim()) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
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