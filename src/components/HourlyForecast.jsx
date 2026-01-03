import { getWeatherIcon } from '../utils/weatherIcons'

function HourlyForecast({ forecast }) {
  const hourlyData = forecast.hourly?.slice(0, 12) || []

  const formatHour = (timestamp) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })
  }

  const formatTemp = (temp) => Math.round(temp)

  return (
    <div className="hourly-forecast">
      <h3 className="section-title">
        <span className="title-icon">🕐</span>
        Hourly Forecast
      </h3>
      
      <div className="hourly-scroll">
        {hourlyData.map((hour, index) => (
          <div 
            key={hour.dt} 
            className={`hourly-item ${index === 0 ? 'current-hour' : ''}`}
          >
            <span className="hour-time">
              {index === 0 ? 'Now' : formatHour(hour.dt)}
            </span>
            <span className="hour-icon">
              {getWeatherIcon(hour.weather[0].id, hour.weather[0].icon)}
            </span>
            <span className="hour-temp">{formatTemp(hour.main.temp)}°</span>
            {hour.pop > 0 && (
              <span className="hour-rain">
                💧 {Math.round(hour.pop * 100)}%
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default HourlyForecast

