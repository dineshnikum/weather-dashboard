import { useState, useCallback } from "react";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Transform the 5-day/3-hour forecast to hourly and daily format
const transformForecastData = (forecastList) => {
    const hourlyData = [];
    const dailyMap = new Map();

    // Process forecast list (every 3 hours)
    forecastList.forEach((item, index) => {
        // Use first 8 items for hourly (24 hours, every 3 hours)
        if (index < 8) {
            hourlyData.push({
                dt: item.dt,
                main: {
                    temp: item.main.temp,
                    feels_like: item.main.feels_like,
                    humidity: item.main.humidity,
                },
                weather: item.weather,
                wind: item.wind,
                pop: item.pop || 0,
            });
        }

        // Group by day for daily forecast
        const date = new Date(item.dt * 1000).toDateString();
        if (!dailyMap.has(date)) {
            dailyMap.set(date, {
                dt: item.dt,
                temps: [],
                weather: item.weather[0],
                humidity: item.main.humidity,
                wind_speed: item.wind.speed,
                pop: item.pop || 0,
            });
        }
        dailyMap.get(date).temps.push(item.main.temp);
        // Update pop to max precipitation chance for the day
        if ((item.pop || 0) > dailyMap.get(date).pop) {
            dailyMap.get(date).pop = item.pop;
        }
    });

    // Convert daily map to array with min/max temps
    const dailyData = Array.from(dailyMap.values())
        .slice(0, 7)
        .map((day) => ({
            dt: day.dt,
            temp: {
                day: Math.round(
                    day.temps.reduce((a, b) => a + b, 0) / day.temps.length
                ),
                min: Math.round(Math.min(...day.temps)),
                max: Math.round(Math.max(...day.temps)),
                night: Math.round(Math.min(...day.temps)),
            },
            weather: [day.weather],
            humidity: day.humidity,
            wind_speed: day.wind_speed,
            pop: day.pop,
        }));

    return { hourly: hourlyData, daily: dailyData };
};

export function useWeather() {
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWeatherByCity = useCallback(async (city) => {
        setLoading(true);
        setError(null);

        try {
            console.log(`Fetching weather for city: ${city}`);

            // Fetch current weather
            const weatherRes = await fetch(
                `${BASE_URL}/weather?q=${encodeURIComponent(
                    city
                )}&units=metric&appid=${API_KEY}`
            );

            if (!weatherRes.ok) {
                const errorData = await weatherRes.json();
                console.error("Weather API Error:", errorData);

                // Handle specific error codes
                if (errorData.cod === 401) {
                    throw new Error(
                        "API key not activated yet. Please wait up to 2 hours after creating your API key."
                    );
                }
                throw new Error(errorData.message || "City not found");
            }

            const weatherData = await weatherRes.json();
            console.log("Weather data received:", weatherData);
            setWeather(weatherData);

            // Fetch 5-day forecast
            const forecastRes = await fetch(
                `${BASE_URL}/forecast?q=${encodeURIComponent(
                    city
                )}&units=metric&appid=${API_KEY}`
            );

            if (forecastRes.ok) {
                const forecastData = await forecastRes.json();
                console.log("Forecast data received");
                const transformedForecast = transformForecastData(
                    forecastData.list
                );
                setForecast(transformedForecast);
            } else {
                console.warn("Forecast fetch failed, using minimal forecast");
                // Set minimal forecast if fetch fails
                setForecast({ hourly: [], daily: [] });
            }
        } catch (err) {
            console.error("Error fetching weather:", err);
            setError(err.message || "Failed to fetch weather data");
            setWeather(null);
            setForecast(null);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchWeatherByCoords = useCallback(async (lat, lon) => {
        setLoading(true);
        setError(null);

        try {
            console.log(`Fetching weather for coordinates: ${lat}, ${lon}`);

            // Fetch current weather
            const weatherRes = await fetch(
                `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
            );

            if (!weatherRes.ok) {
                const errorData = await weatherRes.json();
                console.error("Weather API Error:", errorData);

                if (errorData.cod === 401) {
                    throw new Error(
                        "API key not activated yet. Please wait up to 2 hours after creating your API key."
                    );
                }
                throw new Error(
                    errorData.message ||
                        "Unable to fetch weather for this location"
                );
            }

            const weatherData = await weatherRes.json();
            console.log("Weather data received:", weatherData);
            setWeather(weatherData);

            // Fetch 5-day forecast
            const forecastRes = await fetch(
                `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
            );

            if (forecastRes.ok) {
                const forecastData = await forecastRes.json();
                console.log("Forecast data received");
                const transformedForecast = transformForecastData(
                    forecastData.list
                );
                setForecast(transformedForecast);
            } else {
                console.warn("Forecast fetch failed, using minimal forecast");
                setForecast({ hourly: [], daily: [] });
            }
        } catch (err) {
            console.error("Error fetching weather:", err);
            setError(err.message || "Failed to fetch weather data");
            setWeather(null);
            setForecast(null);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        weather,
        forecast,
        loading,
        error,
        fetchWeatherByCity,
        fetchWeatherByCoords,
    };
}
