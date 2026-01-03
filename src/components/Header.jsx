import { useState, useEffect } from 'react'

function Header() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  return (
    <header className="header">
      <div className="header-brand">
        <div className="logo">
          <span className="logo-icon">⛅</span>
          <h1>Weather Dashboard</h1>
        </div>
        <p className="tagline">Real-time weather analytics & forecasts</p>
      </div>
      
      <div className="header-time">
        <div className="current-time">{formatTime(currentTime)}</div>
        <div className="current-date">{formatDate(currentTime)}</div>
      </div>
    </header>
  )
}

export default Header

