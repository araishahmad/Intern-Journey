import { ENDPOINTS } from '../api/endPoints';
import { BASEURLS } from '../api/baseURLS';

async function getGeocoded(city) {
    const url = `${BASEURLS.GEOCODING}${ENDPOINTS.SEARCH_CITY}?name=${encodeURIComponent(city)}&count=1`;
    const res = await fetch(url);

    if (!res.ok)
        throw new Error('Failed to geocode city');

    const data = await res.json();
    if (!data.results || data.results.length === 0)
        throw new Error(`No city found named ${city}`);

    const { longitude, latitude, name, country } = data.results[0];
    return { longitude, latitude, name, country };
}

async function weatherForecast(longitude, latitude) {
    const params = new URLSearchParams ({
        longitude,
        latitude,
        current: 'temperature_2m,wind_speed_10m',
        hourly: 'temperature_2m,relative_humidity_2m,wind_speed_10m'
    });

    const url = `${BASEURLS.FORECAST}${ENDPOINTS.FORECAST}?${params}`;
    const res = await fetch(url);

    if (!res.ok)
        throw new Error('Failed to forecast weather.');

    return res.json();
}

export async function getCityWeather(city){
    const location = await getGeocoded(city);
    const forecast_weather = await weatherForecast(location.longitude, location.latitude);
    return { location, forecast_weather };
}
