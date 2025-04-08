import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import SearchHistory from './components/SearchHistory';
import Forecast from './components/Forecast';
import { DarkMode, LightMode } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
import Cached from '@mui/icons-material/Cached';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [theme, setTheme] = useState('dark');
  const [cityInput, setCityInput] = useState('');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const apiKey = '50b940b396c99c1c33b6ea3f97c37c62';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error('City not found or error fetching weather data.');
      }
      const data = await response.json();
      setWeatherData(data);
      setSearchHistory(prevHistory => {
        const newHistory = [city, ...prevHistory.filter(item => item.toLowerCase() !== city.toLowerCase())];
        return newHistory.slice(0, 5);
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (city) => {
    handleSearch(city);
    setCityInput('');
  };

  const handleHistoryClick = (city) => {
    setCityInput(city);
    handleSearch(city);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark'
        ? 'bg-deep-navy'
        : 'bg-eggshell'
      }`}>
      <div className="flex items-center justify-center p-6">
        <div className={`rounded-xl p-6 w-full max-w-4xl shadow-lg transition-all duration-300 ${theme === 'dark'
            ? 'bg-charcoal text-off-white'
            : 'bg-off-white text-deep-navy'
          }`}>
          {/* New Heading Section */}
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300 bg-clip-text text-transparent mb-2 pb-8 pt-4">
              WeatherSphere
            </h1>
          </div>

          {/* Top Controls */}
          <div className="flex justify-between mb-4">
            <Tooltip title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
              <button
                onClick={toggleTheme}
                className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded-full hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors duration-200"
                aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              >
                {theme === 'light' ? (
                  <DarkMode className="w-6 h-6" />
                ) : (
                  <LightMode className="w-6 h-6" />
                )}
              </button>
            </Tooltip>
            {weatherData && (
              <Tooltip title="Refresh current weather">
                <button
                  onClick={() => handleSearch(weatherData.name)}
                  className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors duration-200"
                >
                  <Cached className={`w-6 h-6 ${loading ? 'animate-rotate' : ''}`} />
                </button>
              </Tooltip>
            )}
          </div>

          {/* Search and Recent History Section */}
          <div className="border border-gray-200 dark:border-gray-600 p-4 rounded-lg mb-4">
            <SearchBar
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              onSearch={handleSubmit}
              theme={theme} // Add this prop
            />
            <SearchHistory history={searchHistory} onSelect={handleHistoryClick} />
          </div>

          {loading && (
            <div className="flex justify-center mt-4">
              <div className="spinner"></div>
            </div>
          )}
          {error && <p className="text-center mt-4 text-red-500">{error}</p>}

          {weatherData && (
            <div className="border border-gray-200 dark:border-gray-600 p-4 rounded-lg mb-4">
              <h2 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-gray-200">
                Weather in {weatherData.name}
              </h2>
              <WeatherCard data={weatherData} />
            </div>
          )}

          {weatherData && (
            <div className="border border-gray-200 dark:border-gray-600 p-4 rounded-lg">
              <Forecast city={weatherData.name} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;