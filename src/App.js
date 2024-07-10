import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './card';

function App() {
  const [data, setData] = useState({});
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState('');
  const [feels, setFeels] = useState('');
  const [celsius, setCelsius] = useState(0);
  const apiKey = 'apikey';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url)
        .then((response) => {
          setData(response.data);
          convertToCelsius(response.data.main.temp, response.data.main.feels_like);
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
        });

      axios.get(forecastUrl)
        .then((response) => {
          const dailyData = response.data.list.filter(reading => reading.dt_txt.includes("18:00:00"));
          setForecast(dailyData);
        })
        .catch((error) => {
          console.error('Error fetching forecast data:', error);
        });
    }
  };

  const convertToCelsius = (temp, feelsLike) => {
    const celsiusValue = temp - 273.15;
    const feelsCelsius = feelsLike - 273.15;
    setFeels(feelsCelsius);
    setCelsius(celsiusValue);
  };

  return (
    <div className="app">
      <div className="container">
        <div className="search">
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={searchLocation}
          />
        </div>
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{celsius.toFixed(2)}ºC</h1> : null}
          </div>
          <div className='description'>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            <p>Feels Like</p>
            {data.main ? <p className='bold'>{feels.toFixed(2)}ºC</p> : null}
          </div>
          <div className="humidity">
            <p>Humidity</p>
            {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
          </div>
          <div className='wind'>
            <p>Winds</p>
            {data.wind ? <p className='bold'>{data.wind.speed} MPH</p> : null}
          </div>
        </div>
        
      </div>
      <div className="forecast">
          {forecast.map((day, index) => (
            <WeatherCard
              key={index}
              day={day.dt_txt}
              temp={day.main.temp - 273.15}
              feelsLike={day.main.feels_like - 273.15}
              humidity={day.main.humidity}
              wind={day.wind.speed}
              description={day.weather[0].main}
            />
          ))}
        </div>
    </div>
  );
}

export default App;
