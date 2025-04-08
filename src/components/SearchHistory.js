// components/SearchHistory.js
import React from 'react';

const SearchHistory = ({ history, onSelect }) => {
  if (history.length === 0) return null;

  return (
    <div className="mb-4">
      <h3 className="text-lg font-medium mb-2">Recent Searches:</h3>
      <div className="flex flex-wrap gap-2">
        {history.map((city, index) => (
          <button
            key={index}
            onClick={() => onSelect(city)}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
