import { useState, useCallback } from "react";

// Using OpenWeatherMap API - Users should replace with their own API key
const API_KEY = "3968f6fc97692f73742601715a4c6817";
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
            // Fetch current weather
            const weatherRes = await fetch(
                `${BASE_URL}/weather?q=${encodeURIComponent(
                    city
                )}&units=metric&appid=${API_KEY}`
            );

            if (!weatherRes.ok) {
                const errorData = await weatherRes.json();
                throw new Error(errorData.message || "City not found");
            }

            const weatherData = await weatherRes.json();
            setWeather(weatherData);

            // Fetch 5-day forecast (free API)
            const forecastRes = await fetch(
                `${BASE_URL}/forecast?q=${encodeURIComponent(
                    city
                )}&units=metric&appid=${API_KEY}`
            );

            if (forecastRes.ok) {
                const forecastData = await forecastRes.json();
                const transformedForecast = transformForecastData(
                    forecastData.list
                );
                setForecast(transformedForecast);
            } else {
                // Set minimal forecast if fetch fails
                setForecast({ hourly: [], daily: [] });
            }
        } catch (err) {
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
            // Fetch current weather
            const weatherRes = await fetch(
                `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
            );

            if (!weatherRes.ok) {
                const errorData = await weatherRes.json();
                throw new Error(
                    errorData.message ||
                        "Unable to fetch weather for this location"
                );
            }

            const weatherData = await weatherRes.json();
            setWeather(weatherData);

            // Fetch 5-day forecast (free API)
            const forecastRes = await fetch(
                `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
            );

            if (forecastRes.ok) {
                const forecastData = await forecastRes.json();
                const transformedForecast = transformForecastData(
                    forecastData.list
                );
                setForecast(transformedForecast);
            } else {
                setForecast({ hourly: [], daily: [] });
            }
        } catch (err) {
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
