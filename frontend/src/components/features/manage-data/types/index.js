// Type definitions converted to JSDoc comments for better IDE support

/**
 * @typedef {Object} Address
 * @property {string} street
 * @property {string} city
 * @property {string} state
 * @property {string} zipCode
 * @property {string} country
 */

/**
 * @typedef {Object} SearchResult
 * @property {string} id
 * @property {string} name
 * @property {Address} address
 * @property {string} [email]
 * @property {string} [phone]
 * @property {'person' | 'business'} type
 * @property {string} lastUpdated
 */

/**
 * @typedef {Object} SearchFilters
 * @property {'all' | 'person' | 'business'} type
 * @property {string} [location]
 */

// Export empty object to make this a module
export {};