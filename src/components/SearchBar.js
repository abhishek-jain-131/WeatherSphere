import React from 'react';

const SearchBar = ({ value, onChange, onSearch, theme }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() && typeof onSearch === 'function') {
      onSearch(value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center mb-6" role="search">
      <label
        htmlFor="city"
        className={`mb-2 text-lg font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
          }`}
      >
        Your city
      </label>
      <input
        id="city"
        type="text"
        value={value}
        onChange={onChange}
        placeholder="e.g. London"
        className={`border rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-300 w-64 text-center transition-colors duration-200 ${theme === 'dark'
            ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400'
            : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
          }`}
      />
    </form>
  );
};

export default SearchBar;