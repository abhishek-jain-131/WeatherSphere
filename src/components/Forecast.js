import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Forecast = ({ city, theme }) => {
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

    const fetchForecast = async () => {
      try {
        const apiKey = '50b940b396c99c1c33b6ea3f97c37c62';
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) {
          throw new Error('Error fetching forecast data.');
        }
        const data = await response.json();
        setForecastData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchForecast();
  }, [city]);

  if (!city) return null;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!forecastData) return <p>Loading forecast...</p>;

  const chartData = forecastData.list
    .filter((item, idx) => idx % 2 === 0)
    .map((item) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      temp: Math.round(item.main.temp),
    }));

  const dailyForecasts = forecastData.list.filter(item => item.dt_txt.includes('12:00:00'));

  return (
    <div className={`mt-8 ${theme === 'dark' ? 'text-blue-200' : 'text-blue-800'
      }`}>
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
        5-Day Forecast
      </h2>
      <div className="bg-blue-50 dark:bg-gray-700 rounded-lg p-4">
        {/* Temperature Line Chart */}
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <XAxis dataKey="time" stroke="#555" />
            <YAxis stroke="#555" />
            <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '5px' }} />
            <Line type="monotone" dataKey="temp" stroke={theme === 'dark' ? '#93C5FD' : '#1D4ED8'} strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>

        {/* Daily Forecast */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-6">
          {dailyForecasts.map((forecast, index) => (
            <div key={index} className="text-center text-gray-600 dark:text-gray-300">
              <p className="font-medium">
                {new Date(forecast.dt * 1000).toLocaleDateString('en-US', {
                  weekday: 'short',
                })}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                alt={forecast.weather[0].description}
                className="mx-auto w-12 h-12"
              />
              <p className="font-semibold">{Math.round(forecast.main.temp)}°C</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Forecast;
