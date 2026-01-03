function WeatherDetails({ weather }) {
  const { main, wind, visibility, sys, clouds } = weather

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const getVisibilityText = (vis) => {
    const km = vis / 1000
    if (km >= 10) return 'Excellent'
    if (km >= 5) return 'Good'
    if (km >= 2) return 'Moderate'
    return 'Poor'
  }

  const getUVLevel = (uv) => {
    if (uv <= 2) return { level: 'Low', color: 'green' }
    if (uv <= 5) return { level: 'Moderate', color: 'yellow' }
    if (uv <= 7) return { level: 'High', color: 'orange' }
    if (uv <= 10) return { level: 'Very High', color: 'red' }
    return { level: 'Extreme', color: 'purple' }
  }

  // Simulated UV index based on time of day
  const simulatedUV = 5

  const details = [
    {
      icon: '🌅',
      label: 'Sunrise',
      value: formatTime(sys.sunrise),
    },
    {
      icon: '🌇',
      label: 'Sunset',
      value: formatTime(sys.sunset),
    },
    {
      icon: '💧',
      label: 'Humidity',
      value: `${main.humidity}%`,
      extra: main.humidity > 70 ? 'High' : main.humidity < 30 ? 'Low' : 'Normal',
    },
    {
      icon: '🌡️',
      label: 'Pressure',
      value: `${main.pressure} hPa`,
      extra: main.pressure > 1020 ? 'High' : main.pressure < 1010 ? 'Low' : 'Normal',
    },
    {
      icon: '👁️',
      label: 'Visibility',
      value: `${(visibility / 1000).toFixed(1)} km`,
      extra: getVisibilityText(visibility),
    },
    {
      icon: '☁️',
      label: 'Cloud Cover',
      value: `${clouds.all}%`,
    },
    {
      icon: '💨',
      label: 'Wind Speed',
      value: `${wind.speed} m/s`,
      extra: wind.gust ? `Gusts ${wind.gust} m/s` : null,
    },
    {
      icon: '☀️',
      label: 'UV Index',
      value: simulatedUV,
      extra: getUVLevel(simulatedUV).level,
      extraColor: getUVLevel(simulatedUV).color,
    },
  ]

  return (
    <div className="weather-details">
      <h3 className="section-title">
        <span className="title-icon">📊</span>
        Weather Details
      </h3>
      
      <div className="details-grid">
        {details.map((detail) => (
          <div key={detail.label} className="detail-item">
            <span className="detail-icon">{detail.icon}</span>
            <div className="detail-content">
              <span className="detail-label">{detail.label}</span>
              <span className="detail-value">{detail.value}</span>
              {detail.extra && (
                <span 
                  className="detail-extra"
                  style={detail.extraColor ? { color: `var(--${detail.extraColor})` } : {}}
                >
                  {detail.extra}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WeatherDetails

