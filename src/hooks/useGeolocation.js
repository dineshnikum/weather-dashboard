import { useState, useCallback } from 'react'

export function useGeolocation() {
  const [coords, setCoords] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      return
    }

    setLoading(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        })
        setLoading(false)
      },
      (err) => {
        let errorMessage = 'Unable to retrieve your location'
        
        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = 'Location permission denied. Please enable location access.'
            break
          case err.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.'
            break
          case err.TIMEOUT:
            errorMessage = 'Location request timed out.'
            break
        }
        
        setError(errorMessage)
        setLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // Cache for 5 minutes
      }
    )
  }, [])

  return { coords, error, loading, requestLocation }
}

