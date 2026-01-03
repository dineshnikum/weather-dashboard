import { useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

function WeatherCharts({ forecast }) {
  const [activeChart, setActiveChart] = useState('temperature')
  
  const hourlyData = forecast.hourly?.slice(0, 24) || []
  const dailyData = forecast.daily || []

  const formatHour = (timestamp) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })
  }

  const formatDay = (timestamp) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleDateString('en-US', { weekday: 'short' })
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(12, 25, 41, 0.95)',
        titleColor: '#f0f9ff',
        bodyColor: '#bae6fd',
        borderColor: 'rgba(56, 189, 248, 0.3)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        },
        ticks: {
          color: '#94a3b8',
          font: {
            family: 'JetBrains Mono',
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        },
        ticks: {
          color: '#94a3b8',
          font: {
            family: 'JetBrains Mono',
            size: 11,
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  }

  const temperatureData = {
    labels: hourlyData.map((h) => formatHour(h.dt)),
    datasets: [
      {
        label: 'Temperature',
        data: hourlyData.map((h) => Math.round(h.main.temp)),
        fill: true,
        backgroundColor: 'rgba(251, 146, 60, 0.2)',
        borderColor: '#fb923c',
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#fb923c',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 6,
      },
    ],
  }

  const humidityData = {
    labels: hourlyData.map((h) => formatHour(h.dt)),
    datasets: [
      {
        label: 'Humidity',
        data: hourlyData.map((h) => Math.round(h.main.humidity)),
        fill: true,
        backgroundColor: 'rgba(56, 189, 248, 0.2)',
        borderColor: '#38bdf8',
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#38bdf8',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 6,
      },
    ],
  }

  const precipitationData = {
    labels: dailyData.map((d) => formatDay(d.dt)),
    datasets: [
      {
        label: 'Precipitation Chance',
        data: dailyData.map((d) => Math.round(d.pop * 100)),
        backgroundColor: 'rgba(14, 165, 233, 0.7)',
        borderColor: '#0ea5e9',
        borderWidth: 2,
        borderRadius: 8,
        barThickness: 30,
      },
    ],
  }

  const windData = {
    labels: hourlyData.map((h) => formatHour(h.dt)),
    datasets: [
      {
        label: 'Wind Speed',
        data: hourlyData.map((h) => h.wind.speed.toFixed(1)),
        fill: true,
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        borderColor: '#22c55e',
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#22c55e',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 6,
      },
    ],
  }

  const charts = {
    temperature: {
      name: 'Temperature',
      icon: '🌡️',
      component: <Line data={temperatureData} options={{
        ...chartOptions,
        scales: {
          ...chartOptions.scales,
          y: {
            ...chartOptions.scales.y,
            ticks: {
              ...chartOptions.scales.y.ticks,
              callback: (value) => `${value}°C`,
            },
          },
        },
      }} />,
    },
    humidity: {
      name: 'Humidity',
      icon: '💧',
      component: <Line data={humidityData} options={{
        ...chartOptions,
        scales: {
          ...chartOptions.scales,
          y: {
            ...chartOptions.scales.y,
            min: 0,
            max: 100,
            ticks: {
              ...chartOptions.scales.y.ticks,
              callback: (value) => `${value}%`,
            },
          },
        },
      }} />,
    },
    precipitation: {
      name: 'Precipitation',
      icon: '🌧️',
      component: <Bar data={precipitationData} options={{
        ...chartOptions,
        scales: {
          ...chartOptions.scales,
          y: {
            ...chartOptions.scales.y,
            min: 0,
            max: 100,
            ticks: {
              ...chartOptions.scales.y.ticks,
              callback: (value) => `${value}%`,
            },
          },
        },
      }} />,
    },
    wind: {
      name: 'Wind Speed',
      icon: '💨',
      component: <Line data={windData} options={{
        ...chartOptions,
        scales: {
          ...chartOptions.scales,
          y: {
            ...chartOptions.scales.y,
            ticks: {
              ...chartOptions.scales.y.ticks,
              callback: (value) => `${value} m/s`,
            },
          },
        },
      }} />,
    },
  }

  return (
    <div className="weather-charts">
      <div className="charts-header">
        <h3 className="section-title">
          <span className="title-icon">📈</span>
          Weather Analytics
        </h3>
        
        <div className="chart-tabs">
          {Object.entries(charts).map(([key, chart]) => (
            <button
              key={key}
              className={`chart-tab ${activeChart === key ? 'active' : ''}`}
              onClick={() => setActiveChart(key)}
            >
              <span className="tab-icon">{chart.icon}</span>
              <span className="tab-name">{chart.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="chart-container">
        {charts[activeChart].component}
      </div>
    </div>
  )
}

export default WeatherCharts

