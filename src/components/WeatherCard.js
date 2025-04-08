import React from 'react';
import { motion } from 'framer-motion';

const WeatherCard = ({ data }) => {
  const { name, main, weather, wind } = data;
  const weatherInfo = weather[0];

  return (
    <motion.div className="bg-white rounded-md shadow-md p-4" initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}>
      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-xl">{main.temp} °C</p>
      <p className="capitalize">{weatherInfo.main}</p>
      <p className="capitalize">{weatherInfo.description}</p>
      <div className="flex items-center mt-4">
        <img
          src={`https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`}
          alt={weatherInfo.description}
          className="w-16 h-16"
        />
        <div className="ml-4">
          <p>Humidity: {main.humidity}%</p>
          <p>Wind Speed: {wind.speed} km/h</p>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;
