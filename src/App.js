// App.js
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import SearchHistory from './components/SearchHistory'; import Forecast from './components/Forecast';


function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);
    try {
      const apiKey = '50b940b396c99c1c33b6ea3f97c37c62'; // Replace with your API key
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error('City not found or error fetching weather data.');
      }
      const data = await response.json();
      setWeatherData(data);

      // Update search history – limit to 5 items. Remove duplicates.
      setSearchHistory((prevHistory) => {
        const newHistory = [city, ...prevHistory.filter(item => item.toLowerCase() !== city.toLowerCase())];
        return newHistory.slice(0, 5);
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleHistoryClick = (city) => {
    handleSearch(city);
  };

  return (
    // Apply the theme class on the root element
    <div className={`${theme === 'dark' ? 'dark' : ''} min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center p-4`}>
      <div className="w-full max-w-md">
        <button
          onClick={toggleTheme}
          className="mb-4 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded"
        >
          Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
        <SearchBar onSearch={handleSearch} />
        <SearchHistory history={searchHistory} onSelect={handleHistoryClick} />
        {loading && (
          <div className="flex justify-center mt-4">
            <div className="spinner"></div>
          </div>
        )}
        {error && <p className="text-center mt-4 text-red-500">{error}</p>}
        {weatherData && <WeatherCard data={weatherData} />}
        {weatherData && (
          <div className="text-center mt-4">
            <button
              onClick={() => handleSearch(weatherData.name)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Refresh Weather
            </button>
          </div>
        )}
        {weatherData && <Forecast city={weatherData.name} />}
      </div>
    </div>
  );
}

export default App;
