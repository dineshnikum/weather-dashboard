// Weather condition icons based on OpenWeatherMap condition codes
export function getWeatherIcon(conditionId, iconCode) {
  const isNight = iconCode?.includes('n')
  
  // Thunderstorm (200-299)
  if (conditionId >= 200 && conditionId < 300) {
    return '⛈️'
  }
  
  // Drizzle (300-399)
  if (conditionId >= 300 && conditionId < 400) {
    return '🌧️'
  }
  
  // Rain (500-599)
  if (conditionId >= 500 && conditionId < 600) {
    if (conditionId === 511) return '🌨️' // Freezing rain
    if (conditionId >= 520) return '🌧️' // Shower rain
    return '🌧️'
  }
  
  // Snow (600-699)
  if (conditionId >= 600 && conditionId < 700) {
    return '❄️'
  }
  
  // Atmosphere (700-799) - Mist, Smoke, Haze, Fog, etc.
  if (conditionId >= 700 && conditionId < 800) {
    if (conditionId === 781) return '🌪️' // Tornado
    return '🌫️'
  }
  
  // Clear (800)
  if (conditionId === 800) {
    return isNight ? '🌙' : '☀️'
  }
  
  // Clouds (801-804)
  if (conditionId === 801) {
    return isNight ? '🌙' : '🌤️' // Few clouds
  }
  if (conditionId === 802) {
    return '⛅' // Scattered clouds
  }
  if (conditionId === 803 || conditionId === 804) {
    return '☁️' // Broken/Overcast clouds
  }
  
  return '🌡️'
}

// Get background class based on weather condition
export function getWeatherBackground(conditionId) {
  if (conditionId >= 200 && conditionId < 300) return 'bg-storm'
  if (conditionId >= 300 && conditionId < 600) return 'bg-rain'
  if (conditionId >= 600 && conditionId < 700) return 'bg-snow'
  if (conditionId >= 700 && conditionId < 800) return 'bg-fog'
  if (conditionId === 800) return 'bg-clear'
  if (conditionId > 800) return 'bg-clouds'
  return 'bg-default'
}

// Format temperature with unit
export function formatTemperature(temp, unit = 'C') {
  const rounded = Math.round(temp)
  return `${rounded}°${unit}`
}

// Get wind direction from degrees
export function getWindDirection(deg) {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 
                      'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
  return directions[Math.round(deg / 22.5) % 16]
}

// Format visibility
export function formatVisibility(meters) {
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(1)} km`
  }
  return `${meters} m`
}

// Get comfort level based on conditions
export function getComfortLevel(temp, humidity) {
  // Heat index calculation (simplified)
  if (temp > 27 && humidity > 40) {
    const heatIndex = temp + (humidity * 0.1)
    if (heatIndex > 40) return 'Dangerous'
    if (heatIndex > 35) return 'Very Hot'
    if (heatIndex > 30) return 'Hot'
  }
  
  if (temp < 0) return 'Freezing'
  if (temp < 10) return 'Cold'
  if (temp < 18) return 'Cool'
  if (temp < 24) return 'Comfortable'
  if (temp < 30) return 'Warm'
  return 'Hot'
}

