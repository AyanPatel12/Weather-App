// WeatherCard.js
import React from 'react';
import './card.css'

function WeatherCard({ day, temp, feelsLike, humidity, wind, description }) {
    const date = new Date(day);

    // Increment the date by one day
    date.setDate(date.getDate() + 1);
  
    // Get the day name for the next day
    const nextDayName = date.toLocaleDateString('en-US', { weekday: 'long' });
  return (

    <div className="weather-card">
    
      <h3>{nextDayName}</h3>
      <p>{description}</p>
      <p>Temp: {temp.toFixed(2)}ºC</p>
      <p>Feels Like: {feelsLike.toFixed(2)}ºC</p>
      <p>Humidity: {humidity}%</p>
      <p>Wind: {wind} MPH</p>
    </div>
  );
}

export default WeatherCard;