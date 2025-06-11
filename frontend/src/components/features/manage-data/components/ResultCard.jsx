import React, { useState } from 'react';
import {ReactComponent as PinIcon} from '../icons/pin-sharp-circle-625-svgrepo-com.svg';
import { ReactComponent as MailIcon } from '../icons/email-1-svgrepo-com.svg';
import { ReactComponent as PhoneIcon } from '../icons/phone-svgrepo-com.svg';
import { ReactComponent as UserIcon } from '../icons/person-svgrepo-com.svg';
import { ReactComponent as HomeIcon } from '../icons/home-1-svgrepo-com.svg';
import {ReactComponent as CalenderIcon} from '../icons/calender-svgrepo-com.svg';
import { ReactComponent as EditIcon } from '../icons/edit-pen-2-line-svgrepo-com.svg';
import { ReactComponent as ChevronIcon } from '../icons/chevron-down-svgrepo-com.svg';

/**
 * @param {Object} props
 * @param {import('../types/index.js').SearchResult} props.result
 */

export const ResultCard = ({ result }) => {
  const [isJobsOpen, setIsJobsOpen] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getTypeIcon = () => {
    return result.type === 'person' ? (
      <UserIcon className="h-5 w-5 text-blue-600" />
    ) : (
      <HomeIcon className="h-5 w-5 text-green-600" />
    );
  };

  const getTypeColor = () => {
    return result.type === 'person'
      ? 'bg-blue-50 text-blue-700 border-blue-200'
      : 'bg-green-50 text-green-700 border-green-200';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 relative group">
      {/* Edit Icon */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200">
          <EditIcon className="h-4 w-4 text-gray-600 hover:text-blue-600 transition-colors" />
        </button>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4 pr-12">
          <div className="flex items-center space-x-3">
            {getTypeIcon()}
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {result.name}
              </h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getTypeColor()}`}>
                {result.type === 'person' ? 'Person' : 'Business'}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <PinIcon className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div className="text-gray-600">
              <p className="font-medium">{result.address.street}</p>
              <p>
                {result.address.city}, {result.address.state} {result.address.zipCode}
              </p>
              <p>{result.address.country}</p>
            </div>
          </div>

          {result.email && (
            <div className="flex items-center space-x-3">
              <MailIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
              <a
                href={`mailto:${result.email}`}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                {result.email}
              </a>
            </div>
          )}

          {result.phone && (
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <a
                  href={`tel:${result.phone}`}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {result.phone}
                </a>
              </div>
              
              {/* Jobs Dropdown */}
              <div className="ml-8">
                <button
                  onClick={() => setIsJobsOpen(!isJobsOpen)}
                  className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <span className="font-medium">Jobs</span>
                  <ChevronIcon 
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isJobsOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                {isJobsOpen && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-500 italic">No jobs available</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex items-center space-x-3 pt-2 border-t border-gray-100">
            <CalenderIcon className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-500">
              Last updated: {formatDate(result.lastUpdated)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};