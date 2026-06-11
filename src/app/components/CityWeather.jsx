// components/CityWeather.jsx
"use client";
import { useState, useEffect } from "react";
import styles from './cityweather.module.css';

const CITIES = [
  { name: "Colombo",        lat: 6.9271,  lon: 79.8612, zone: "Wet zone",      elev: "7m" },
  { name: "Kandy",          lat: 7.2906,  lon: 80.6337, zone: "Wet zone",      elev: "488m" },
  { name: "Galle",          lat: 6.0535,  lon: 80.2210, zone: "Wet zone",      elev: "4m" },
  { name: "Bentota",        lat: 6.4211,  lon: 79.9946, zone: "Wet zone",      elev: "2m" },
  { name: "Kalutara",       lat: 6.5854,  lon: 79.9607, zone: "Wet zone",      elev: "3m" },
  { name: "Nuwara Eliya",   lat: 6.9497,  lon: 80.7891, zone: "Mountain zone", elev: "1868m" },
  { name: "Ella",           lat: 6.8667,  lon: 81.0463, zone: "Mountain zone", elev: "1041m" },
  { name: "Haputale",       lat: 6.7667,  lon: 80.9667, zone: "Mountain zone", elev: "1431m" },
  { name: "Bandarawela",    lat: 6.8270,  lon: 81.0700, zone: "Mountain zone", elev: "1222m" },
  { name: "Sigiriya",       lat: 7.9553,  lon: 80.7597, zone: "Dry zone",      elev: "165m" },
  { name: "Anuradhapura",   lat: 8.3114,  lon: 80.4037, zone: "Dry zone",      elev: "81m" },
  { name: "Polonnaruwa",    lat: 7.9403,  lon: 81.0188, zone: "Dry zone",      elev: "59m" },
  { name: "Trincomalee",    lat: 8.5874,  lon: 81.2152, zone: "Dry zone",      elev: "3m" },
  { name: "Pasikuda",       lat: 7.9167,  lon: 81.5500, zone: "Dry zone",      elev: "1m" },
  { name: "Arugam Bay",     lat: 6.8405,  lon: 81.8368, zone: "Dry zone",      elev: "1m" },
  { name: "Yala (Tissamaharama)", lat: 6.2866, lon: 81.2830, zone: "Dry zone", elev: "10m" },
  { name: "Jaffna",         lat: 9.6615,  lon: 80.0255, zone: "Dry zone",      elev: "5m" },
];

const WMO_CONDITIONS = {
  0:  { label: "Clear sky",        icon: "☀️" },
  1:  { label: "Mainly clear",     icon: "🌤️" },
  2:  { label: "Partly cloudy",    icon: "⛅" },
  3:  { label: "Overcast",         icon: "☁️" },
  45: { label: "Foggy",            icon: "🌫️" },
  51: { label: "Light drizzle",    icon: "🌦️" },
  61: { label: "Light rain",       icon: "🌧️" },
  63: { label: "Moderate rain",    icon: "🌧️" },
  65: { label: "Heavy rain",       icon: "🌧️" },
  80: { label: "Rain showers",     icon: "⛈️" },
  95: { label: "Thunderstorm",     icon: "⛈️" },
};

function getCondition(code) {
  return WMO_CONDITIONS[code] || { label: "Variable", icon: "🌡️" };
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CityWeather() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [weather, setWeather]         = useState(null);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(false);

  useEffect(() => {
    const city = CITIES[selectedIdx];
    setLoading(true);
    setError(false);
    setWeather(null);

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}`
      + `&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,precipitation`
      + `&daily=weather_code,temperature_2m_max,temperature_2m_min`
      + `&timezone=Asia%2FColombo&forecast_days=7`;

    fetch(url)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(data => { setWeather(data); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, [selectedIdx]);

  const city = CITIES[selectedIdx];

  return (
    <div className={styles.container}>
        <div><h4>Weather Forcast</h4></div>
      <div className={styles.selectRow}>
        <label htmlFor="city-picker">Select a city</label>
        <select
          id="city-picker"
          value={selectedIdx}
          onChange={e => setSelectedIdx(Number(e.target.value))}
        >
          {CITIES.map((c, i) => (
            <option key={i} value={i}>{c.name}</option>
          ))}
        </select>
      </div>

      {loading && <p className={styles.status}>Loading weather for {city.name}…</p>}
      {error   && <p className={styles.error}>Could not load weather data. Please try again.</p>}

      {weather && !loading && (() => {
        const cur   = weather.current;
        const daily = weather.daily;
        const cond  = getCondition(cur.weather_code);
        return (
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <h3 className={styles.cityName}>{city.name}</h3>
                <span className={styles.zoneBadge}>{city.zone} · {city.elev}</span>
              </div>
              <div className={styles.tempBlock}>
                <span className={styles.tempBig}>{Math.round(cur.temperature_2m)}°C</span>
                <span className={styles.feelsLike}>Feels like {Math.round(cur.apparent_temperature)}°C</span>
              </div>
            </div>

            <div className={styles.conditionBar}>
              <span className={styles.condIcon}>{cond.icon}</span>
              <span className={styles.condLabel}>{cond.label}</span>
            </div>

            <div className={styles.metricsGrid}>
              <div className={styles.metric}>
                <span className={styles.metricLabel}>Humidity</span>
                <span className={styles.metricValue}>{Math.round(cur.relative_humidity_2m)}%</span>
              </div>
              <div className={styles.metric}>
                <span className={styles.metricLabel}>Wind</span>
                <span className={styles.metricValue}>{Math.round(cur.wind_speed_10m)} km/h</span>
              </div>
              <div className={styles.metric}>
                <span className={styles.metricLabel}>Precipitation</span>
                <span className={styles.metricValue}>{cur.precipitation.toFixed(1)} mm</span>
              </div>
              <div className={styles.metric}>
                <span className={styles.metricLabel}>High / Low</span>
                <span className={styles.metricValue}>
                  {Math.round(daily.temperature_2m_max[0])}° / {Math.round(daily.temperature_2m_min[0])}°
                </span>
              </div>
            </div>

            <p className={styles.forecastLabel}>6-day forecast</p>
            <div className={styles.forecastRow}>
              {daily.time.slice(1, 7).map((t, i) => {
                const date = new Date(t);
                return (
                  <div key={i} className={styles.forecastDay}>
                    <span className={styles.forecastDayName}>{DAYS[date.getDay()]}</span>
                    <span className={styles.forecastIcon}>{getCondition(daily.weather_code[i + 1]).icon}</span>
                    <span className={styles.forecastMax}>{Math.round(daily.temperature_2m_max[i + 1])}°</span>
                    <span className={styles.forecastMin}>{Math.round(daily.temperature_2m_min[i + 1])}°</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}
    </div>
  );
}