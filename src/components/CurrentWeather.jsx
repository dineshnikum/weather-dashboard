import { getWeatherIcon, getWeatherBackground } from '../utils/weatherIcons'

function CurrentWeather({ weather }) {
  const { main, weather: weatherInfo, name, sys, wind } = weather
  const currentWeather = weatherInfo[0]
  
  const formatTemp = (temp) => Math.round(temp)
  
  const getWindDirection = (deg) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
    return directions[Math.round(deg / 45) % 8]
  }

  return (
    <div className={`current-weather ${getWeatherBackground(currentWeather.id)}`}>
      <div className="current-weather-content">
        <div className="location-info">
          <h2 className="city-name">
            {name}
            <span className="country-code">{sys.country}</span>
          </h2>
          <p className="weather-description">{currentWeather.description}</p>
        </div>

        <div className="temperature-display">
          <span className="weather-icon-large">
            {getWeatherIcon(currentWeather.id, currentWeather.icon)}
          </span>
          <div className="temp-info">
            <span className="current-temp">{formatTemp(main.temp)}°</span>
            <div className="temp-details">
              <span className="feels-like">Feels like {formatTemp(main.feels_like)}°</span>
              <div className="temp-range">
                <span className="temp-high">↑ {formatTemp(main.temp_max)}°</span>
                <span className="temp-low">↓ {formatTemp(main.temp_min)}°</span>
              </div>
            </div>
          </div>
        </div>

        <div className="quick-stats">
          <div className="stat">
            <span className="stat-icon">💧</span>
            <span className="stat-value">{main.humidity}%</span>
            <span className="stat-label">Humidity</span>
          </div>
          <div className="stat">
            <span className="stat-icon">💨</span>
            <span className="stat-value">{wind.speed} m/s</span>
            <span className="stat-label">{getWindDirection(wind.deg)}</span>
          </div>
          <div className="stat">
            <span className="stat-icon">🌡️</span>
            <span className="stat-value">{main.pressure}</span>
            <span className="stat-label">hPa</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather

