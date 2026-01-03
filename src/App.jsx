import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import WeeklyForecast from "./components/WeeklyForecast";
import WeatherMap from "./components/WeatherMap";
import WeatherCharts from "./components/WeatherCharts";
import WeatherDetails from "./components/WeatherDetails";
import { useWeather } from "./hooks/useWeather";
import { useGeolocation } from "./hooks/useGeolocation";

function App() {
    const [searchQuery, setSearchQuery] = useState("");
    const {
        coords,
        error: geoError,
        loading: geoLoading,
        requestLocation,
    } = useGeolocation();
    const {
        weather,
        forecast,
        loading,
        error,
        fetchWeatherByCity,
        fetchWeatherByCoords,
    } = useWeather();

    // Fetch weather on location change
    useEffect(() => {
        if (coords) {
            console.log("Coordinates received, fetching weather:", coords);
            fetchWeatherByCoords(coords.lat, coords.lon);
        }
    }, [coords]);

    // Auto-request location on mount
    useEffect(() => {
        requestLocation();
    }, []);

    const handleSearch = (city) => {
        setSearchQuery(city);
        fetchWeatherByCity(city);
    };

    const handleLocationRequest = () => {
        console.log("Location button clicked");
        requestLocation();
    };

    return (
        <div className="app">
            <div className="app-background">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
            </div>

            <div className="app-container">
                <Header />

                <SearchBar
                    onSearch={handleSearch}
                    onLocationRequest={handleLocationRequest}
                    loading={geoLoading}
                />

                {error && (
                    <div className="error-message">
                        <span className="error-icon">⚠️</span>
                        {error}
                    </div>
                )}

                {geoError && !loading && !weather && (
                    <div className="info-message">
                        <span className="info-icon">ℹ️</span>
                        {geoError}
                    </div>
                )}

                {(loading || geoLoading) && (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>
                            {geoLoading
                                ? "Getting your location..."
                                : "Fetching weather data..."}
                        </p>
                    </div>
                )}

                {weather && forecast && (
                    <div className="dashboard-grid">
                        <div className="main-section">
                            <CurrentWeather weather={weather} />
                            <HourlyForecast forecast={forecast} />
                        </div>

                        <div className="side-section">
                            <WeatherDetails weather={weather} />
                            <WeeklyForecast forecast={forecast} />
                        </div>

                        <div className="full-width-section">
                            <WeatherMap
                                lat={weather.coord.lat}
                                lon={weather.coord.lon}
                                cityName={weather.name}
                            />
                        </div>

                        <div className="full-width-section">
                            <WeatherCharts forecast={forecast} />
                        </div>
                    </div>
                )}

                {!weather && !loading && !error && (
                    <div className="welcome-message">
                        <div className="welcome-icon">🌤️</div>
                        <h2>Welcome to Weather Dashboard</h2>
                        <p>
                            Search for a city or allow location access to see
                            the weather
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
