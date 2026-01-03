import { getWeatherIcon } from '../utils/weatherIcons'

function WeeklyForecast({ forecast }) {
  const dailyData = forecast.daily?.slice(0, 7) || []

  const formatDay = (timestamp) => {
    const date = new Date(timestamp * 1000)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow'
    }
    return date.toLocaleDateString('en-US', { weekday: 'short' })
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const formatTemp = (temp) => Math.round(temp)

  return (
    <div className="weekly-forecast">
      <h3 className="section-title">
        <span className="title-icon">📅</span>
        7-Day Forecast
      </h3>
      
      <div className="weekly-list">
        {dailyData.map((day, index) => (
          <div 
            key={day.dt} 
            className={`weekly-item ${index === 0 ? 'today' : ''}`}
          >
            <div className="day-info">
              <span className="day-name">{formatDay(day.dt)}</span>
              <span className="day-date">{formatDate(day.dt)}</span>
            </div>
            
            <span className="day-icon">
              {getWeatherIcon(day.weather[0].id, day.weather[0].icon)}
            </span>
            
            <div className="day-condition">
              {day.weather[0].main}
            </div>
            
            <div className="day-temps">
              <span className="day-high">{formatTemp(day.temp.max)}°</span>
              <div className="temp-bar">
                <div 
                  className="temp-bar-fill"
                  style={{ 
                    width: `${((day.temp.max - day.temp.min) / 20) * 100}%`,
                    marginLeft: `${((day.temp.min + 10) / 40) * 100}%`
                  }}
                ></div>
              </div>
              <span className="day-low">{formatTemp(day.temp.min)}°</span>
            </div>

            {day.pop > 0 && (
              <div className="day-rain">
                💧 {Math.round(day.pop * 100)}%
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default WeeklyForecast

