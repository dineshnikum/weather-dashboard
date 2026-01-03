import { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'

// Fix for default marker icons in Leaflet with webpack/vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Component to update map center when props change
function MapUpdater({ lat, lon }) {
  const map = useMap()
  
  useEffect(() => {
    map.setView([lat, lon], map.getZoom())
  }, [lat, lon, map])
  
  return null
}

function WeatherMap({ lat, lon, cityName }) {
  const [mapLayer, setMapLayer] = useState('temp')
  
  const layers = {
    temp: {
      name: 'Temperature',
      icon: '🌡️',
      url: 'https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=demo',
    },
    clouds: {
      name: 'Clouds',
      icon: '☁️',
      url: 'https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=demo',
    },
    precipitation: {
      name: 'Precipitation',
      icon: '🌧️',
      url: 'https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=demo',
    },
    wind: {
      name: 'Wind',
      icon: '💨',
      url: 'https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=demo',
    },
  }

  return (
    <div className="weather-map">
      <div className="map-header">
        <h3 className="section-title">
          <span className="title-icon">🗺️</span>
          Interactive Weather Map
        </h3>
        
        <div className="map-controls">
          {Object.entries(layers).map(([key, layer]) => (
            <button
              key={key}
              className={`map-layer-btn ${mapLayer === key ? 'active' : ''}`}
              onClick={() => setMapLayer(key)}
              title={layer.name}
            >
              <span>{layer.icon}</span>
              <span className="layer-name">{layer.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="map-container">
        <MapContainer
          center={[lat, lon]}
          zoom={8}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          
          <Marker position={[lat, lon]}>
            <Popup>
              <div className="map-popup">
                <strong>{cityName}</strong>
                <br />
                📍 {lat.toFixed(2)}°, {lon.toFixed(2)}°
              </div>
            </Popup>
          </Marker>
          
          <MapUpdater lat={lat} lon={lon} />
        </MapContainer>
      </div>
      
      <div className="map-legend">
        <span className="legend-item">
          <span className="legend-dot cold"></span> Cold
        </span>
        <span className="legend-item">
          <span className="legend-dot mild"></span> Mild
        </span>
        <span className="legend-item">
          <span className="legend-dot warm"></span> Warm
        </span>
        <span className="legend-item">
          <span className="legend-dot hot"></span> Hot
        </span>
      </div>
    </div>
  )
}

export default WeatherMap

