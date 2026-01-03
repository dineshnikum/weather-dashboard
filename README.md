<div align="center">
  <img src="public/weather-icon.svg" alt="Weather Dashboard Logo" width="80" height="80">
  
  # ☁️ Weather Dashboard
  
  <p>A beautiful, responsive weather application with location-based forecasts, interactive maps, and detailed weather analytics.</p>
  
  ![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)
  ![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?style=flat-square&logo=vite)
  ![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
</div>

---

## ✨ Features

-   🌍 **Location-based Forecasts** - Automatic weather detection using geolocation API
-   🗺️ **Interactive Maps** - Explore weather patterns with Leaflet-powered maps
-   📊 **Weather Analytics** - Beautiful Chart.js visualizations for temperature, humidity, precipitation, and wind
-   📱 **Responsive Design** - Seamlessly adapts to desktop, tablet, and mobile devices
-   🎨 **Modern UI** - Light blue theme with glassmorphism effects and smooth animations
-   ⏰ **Real-time Updates** - Live clock and current weather conditions
-   🔄 **Auto-refresh** - Automatically fetches weather for your location on app load

## 🛠️ Technologies

| Technology             | Purpose                                                 |
| ---------------------- | ------------------------------------------------------- |
| **React 18**           | Modern UI with hooks and functional components          |
| **Vite**               | Lightning-fast build tool and dev server                |
| **CSS3**               | Custom properties, animations, and glassmorphism design |
| **OpenWeatherMap API** | Real-time weather data                                  |
| **Chart.js**           | Interactive weather analytics charts                    |
| **React-ChartJS-2**    | React wrapper for Chart.js                              |
| **Leaflet**            | Interactive weather maps                                |
| **React-Leaflet**      | React components for Leaflet maps                       |

## 🚀 Getting Started

### Prerequisites

-   Node.js 18+
-   npm or yarn
-   OpenWeatherMap API key (free tier available)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/weather-dashboard.git
cd weather-dashboard
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure API Key**

    - Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
    - Open `src/hooks/useWeather.js`
    - Replace the API key:

```javascript
const API_KEY = "your-api-key-here"; // Replace with your actual API key
```

> ⚠️ **Note:** New API keys can take up to 2 hours to activate.

4. **Start the development server**

```bash
npm run dev
```

5. **Open your browser**

Navigate to `http://localhost:3000`

## 📁 Project Structure

```
weather-dashboard/
├── public/
│   └── weather-icon.svg          # App icon
├── src/
│   ├── components/
│   │   ├── Header.jsx             # App header with live clock
│   │   ├── SearchBar.jsx          # City search + location button
│   │   ├── CurrentWeather.jsx     # Main weather display
│   │   ├── HourlyForecast.jsx     # 24-hour forecast scroll
│   │   ├── WeeklyForecast.jsx     # 7-day forecast
│   │   ├── WeatherDetails.jsx     # Detailed metrics grid
│   │   ├── WeatherMap.jsx         # Interactive Leaflet map
│   │   └── WeatherCharts.jsx      # Chart.js analytics
│   ├── hooks/
│   │   ├── useWeather.js          # Weather API integration
│   │   └── useGeolocation.js      # Browser geolocation
│   ├── styles/
│   │   └── index.css              # All styling (light blue theme)
│   ├── utils/
│   │   └── weatherIcons.js        # Weather condition helpers
│   ├── App.jsx                    # Main app component
│   └── main.jsx                   # React entry point
├── index.html                     # HTML template
├── package.json                   # Dependencies
├── vite.config.js                 # Vite configuration
└── README.md
```

## 📸 Features Overview

### 🌡️ Current Weather

-   Large temperature display with weather icon
-   Feels-like temperature
-   High/low temperatures
-   Humidity, wind speed, and pressure at a glance

### ⏰ Hourly Forecast

-   Scrollable 24-hour forecast
-   Temperature and weather condition for each hour
-   Precipitation probability

### 📅 7-Day Forecast

-   Week-long weather outlook
-   Daily high and low temperatures
-   Visual temperature bars
-   Precipitation chances

### 📊 Weather Analytics

-   Interactive charts with multiple views:
    -   Temperature trends
    -   Humidity levels
    -   Precipitation probability
    -   Wind speed patterns

### 🗺️ Interactive Map

-   Location marker on map
-   Multiple weather layers (Temperature, Clouds, Precipitation, Wind)
-   Dark theme map styling

### 📏 Detailed Metrics

-   Sunrise and sunset times
-   Visibility and cloud cover
-   UV index
-   Pressure systems

## 📝 License

MIT License - feel free to use this project for your own purposes.

---
