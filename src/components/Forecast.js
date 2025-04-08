// components/Forecast.js
import React, { useEffect, useState } from 'react';

const Forecast = ({ city }) => {
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

    const fetchForecast = async () => {
      try {
        const apiKey = '50b940b396c99c1c33b6ea3f97c37c62'; // Replace with your API key
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

  // The forecast API returns weather data in 3-hour increments.
  // Here we’ll pick one forecast per day (e.g., at 12:00 PM)
  const dailyForecasts = forecastData.list.filter(item => item.dt_txt.includes("12:00:00"));

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">5-Day Forecast</h2>
      <div className="flex overflow-x-auto gap-4">
        {dailyForecasts.map((forecast, index) => (
          <div key={index} className="flex-shrink-0 bg-gray-100 p-4 rounded">
            <p className="font-medium">{new Date(forecast.dt * 1000).toLocaleDateString()}</p>
            <img
              src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
              alt={forecast.weather[0].description}
              className="w-16 h-16"
            />
            <p className="text-center">{Math.round(forecast.main.temp)}°C</p>
            <p className="capitalize text-center">{forecast.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
