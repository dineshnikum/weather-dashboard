import { useState } from "react";

function SearchBar({ onSearch, onLocationRequest, loading }) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    const popularCities = ["London", "Tokyo", "Delhi", "Paris", "Mumbai"];

    return (
        <div className="search-container">
            <form className="search-bar" onSubmit={handleSubmit}>
                <div className="search-input-wrapper">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for a city..."
                        className="search-input"
                    />
                </div>

                <button type="submit" className="search-btn">
                    Search
                </button>

                <button
                    type="button"
                    className="location-btn"
                    onClick={onLocationRequest}
                    disabled={loading}
                    title="Use my location"
                >
                    {loading ? (
                        <span className="btn-spinner"></span>
                    ) : (
                        <span>📍</span>
                    )}
                </button>
            </form>

            <div className="popular-cities">
                <span className="popular-label">Popular:</span>
                {popularCities.map((city) => (
                    <button
                        key={city}
                        className="city-chip"
                        onClick={() => onSearch(city)}
                    >
                        {city}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default SearchBar;
