import { useState, useEffect } from 'react';
import { getCityWeather } from '../service/weatherService';
import '../App.css';

function Dashboard() {
    const [weather, setWeather] = useState(null);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchWeather(city) {
        try {
            const result = await getCityWeather(city);
            setWeather(result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchWeather('islamabad');
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        if (!search.trim()) return;
        fetchWeather(search);
    }

    if (loading) return <p className="status-message">Loading....!</p>;
    if (error) return <p className="status-message error">Failed due to error: {error.message}</p>;

    return (
        <div className="dashboard">
            <form className="search-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search a city..."
                />
                <button type="submit">Search</button>
            </form>

            <section className="cards-container">
                <div className="cards">
                    <h2>{weather.location.name}, {weather.location.country}</h2>
                    <p>
                        {weather.forecast_weather.current.temperature_2m}
                        {weather.forecast_weather.current_units.temperature_2m}
                    </p>
                    <p>
                        Wind: {weather.forecast_weather.current.wind_speed_10m}{' '}
                        {weather.forecast_weather.current_units.wind_speed_10m}
                    </p>
                </div>
            </section>
        </div>
    );
}

export default Dashboard;