import { useState, useCallback } from "react";

export function useGeolocation() {
    const [coords, setCoords] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const requestLocation = useCallback(() => {
        if (!navigator.geolocation) {
            console.error("Geolocation not supported");
            setError("Geolocation is not supported by your browser");
            return;
        }

        console.log("Requesting geolocation...");
        setLoading(true);
        setError(null);
        setCoords(null); // Clear previous coordinates

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const newCoords = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                };
                console.log("Geolocation success:", newCoords);
                setCoords(newCoords);
                setError(null);
                setLoading(false);
            },
            (err) => {
                console.error("Geolocation error:", err);
                let errorMessage = "Unable to retrieve your location";

                switch (err.code) {
                    case err.PERMISSION_DENIED:
                        errorMessage =
                            "Location permission denied. Please enable location access or search for a city manually.";
                        break;
                    case err.POSITION_UNAVAILABLE:
                        errorMessage =
                            "Location information is unavailable. Please search for a city manually.";
                        break;
                    case err.TIMEOUT:
                        errorMessage =
                            "Location request timed out. Please search for a city manually.";
                        break;
                }

                setError(errorMessage);
                setCoords(null);
                setLoading(false);
            },
            {
                enableHighAccuracy: false,
                timeout: 30000,
                maximumAge: 60000,
            }
        );
    }, []);

    return { coords, error, loading, requestLocation };
}
