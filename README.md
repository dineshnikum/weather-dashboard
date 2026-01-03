# Weather Dashboard

A responsive weather application with location-based forecasts, interactive maps, and detailed weather analytics.

![Weather Dashboard](./public/weather-icon.svg)

## Features

- **Location-based Forecasts** - Automatic weather detection using geolocation
- **Interactive Maps** - Explore weather patterns with Leaflet-powered maps
- **Weather Analytics** - Beautiful charts showing temperature, humidity, precipitation, and wind trends
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Real-time Updates** - Live clock and current weather conditions

## Technologies

- **React** - Modern UI with hooks and functional components
- **CSS3** - Custom properties, animations, and glassmorphism design
- **Weather API** - OpenWeatherMap integration with demo fallback
- **Chart.js** - Interactive weather analytics charts
- **Leaflet** - Interactive weather maps

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/weather-dashboard.git
cd weather-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

### API Configuration

The app includes demo data that works out of the box. To use real weather data:

1. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Open `src/hooks/useWeather.js`
3. Replace `'demo'` with your API key:

```javascript
const API_KEY = 'your-api-key-here'
```

## Project Structure

```
weather-dashboard/
├── public/
│   └── weather-icon.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── SearchBar.jsx
│   │   ├── CurrentWeather.jsx
│   │   ├── HourlyForecast.jsx
│   │   ├── WeeklyForecast.jsx
│   │   ├── WeatherDetails.jsx
│   │   ├── WeatherMap.jsx
│   │   └── WeatherCharts.jsx
│   ├── hooks/
│   │   ├── useWeather.js
│   │   └── useGeolocation.js
│   ├── styles/
│   │   └── index.css
│   ├── utils/
│   │   └── weatherIcons.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Screenshots

The dashboard includes:
- Current weather with animated icons
- Hourly forecast scroll view
- 7-day forecast with temperature bars
- Interactive weather map
- Analytics charts for temperature, humidity, precipitation, and wind

## License

MIT License - feel free to use this project for your own purposes.

