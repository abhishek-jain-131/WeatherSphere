import React from 'react';

const WeatherCard = ({ data, theme }) => {
  const { name, main, weather, wind, dt } = data;
  const weatherInfo = weather[0];
  const date = new Date(dt * 1000).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className={`border ${theme === 'dark' ? 'border-blue-800' : 'border-blue-200'
      } p-4 rounded-lg mb-4`}>
      <div className="flex justify-center">
        <div className="grid grid-cols-2 gap-6 w-full max-w-md">
          <div className="col-span-2">
            <p className="text-center text-gray-600 dark:text-gray-300 mb-2">{date}</p>
          </div>
          <div className="flex items-center justify-center mb-4 col-span-2">
            <img
              src={`https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`}
              alt={weatherInfo.description}
              className="w-20 h-20"
            />
            <div className="ml-4">
              <p className="text-5xl font-bold text-gray-800 dark:text-gray-200">{Math.round(main.temp)}°C</p>
              <p className="text-xl font-semibold capitalize text-gray-700 dark:text-gray-300">{weatherInfo.main}</p>
            </div>
          </div>
          <div className="flex justify-around w-full text-gray-700 dark:text-gray-300 text-sm col-span-2">
            <div>
              <p className="block font-semibold text-lg">{main.humidity}%</p>
              <span>Humidity</span>
            </div>
            <div>
              <p className="block font-semibold text-lg">{wind.speed} km/h</p>
              <span>Wind speed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
