import React from 'react';

const SearchHistory = ({ history, onSelect, theme }) => {
  if (history.length === 0) return null;

  return (
    <div className="mb-4 text-center">
      <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'
        }`}>
        Recent Searches:
      </h3>
      <div className="flex flex-wrap justify-center gap-2">
        {history.map((city, index) => (
          <button
            key={index}
            onClick={() => onSelect(city)}
            className={`px-3 py-1 rounded transition-colors duration-200 ${theme === 'dark'
                ? 'bg-blue-700 hover:bg-blue-600 text-blue-100'
                : 'bg-blue-200 hover:bg-blue-300 text-blue-800'
              }`}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
