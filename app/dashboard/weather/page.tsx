'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, Gauge } from 'lucide-react';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  icon: string;
}

export default function WeatherPage() {
  const [city, setCity] = useState('London');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (searchCity: string) => {
    setLoading(true);
    setError('');
    try {
      // Using Open-Meteo free API (no key required)
      const geocodingRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${searchCity}&count=1&language=en&format=json`
      );
      const geoData = await geocodingRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError('City not found');
        setLoading(false);
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,visibility&timezone=auto`
      );
      const weatherData = await weatherRes.json();

      const current = weatherData.current;
      const code = current.weather_code;

      let condition = 'Clear';
      if (code === 0) condition = 'Clear sky';
      else if (code === 1 || code === 2) condition = 'Partly cloudy';
      else if (code === 3) condition = 'Overcast';
      else if (code === 45 || code === 48) condition = 'Foggy';
      else if (code >= 51 && code <= 67) condition = 'Drizzle';
      else if (code >= 80 && code <= 82) condition = 'Rain showers';
      else if (code >= 85 && code <= 86) condition = 'Snow showers';

      setWeather({
        location: `${name}, ${country}`,
        temperature: Math.round(current.temperature_2m),
        condition,
        humidity: current.relative_humidity_2m,
        windSpeed: Math.round(current.wind_speed_10m),
        visibility: Math.round(current.visibility / 1000),
        pressure: 1013,
        icon: code < 3 ? 'sun' : code < 45 ? 'cloud' : 'rain',
      });
    } catch (err) {
      setError('Failed to fetch weather data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">Weather</h1>

        {/* Search */}
        <Card className="bg-card border-primary/30 p-6 mb-6">
          <div className="flex gap-2">
            <Input
              placeholder="Enter city name..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="bg-secondary border-primary/30 text-foreground placeholder:text-muted-foreground"
            />
            <Button
              onClick={handleSearch}
              disabled={loading}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {loading ? 'Loading...' : 'Search'}
            </Button>
          </div>
        </Card>

        {error && (
          <Card className="bg-destructive/10 border-destructive p-4 mb-6">
            <p className="text-destructive">{error}</p>
          </Card>
        )}

        {weather && (
          <div className="space-y-6">
            {/* Main Weather Card */}
            <Card className="bg-gradient-to-br from-card to-secondary border-primary/50 p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-foreground">{weather.location}</h2>
                  <p className="text-muted-foreground mt-1">{weather.condition}</p>
                </div>
                <div className="text-right">
                  {weather.icon === 'sun' && <Sun className="w-16 h-16 text-yellow-400" />}
                  {weather.icon === 'cloud' && <Cloud className="w-16 h-16 text-blue-400" />}
                  {weather.icon === 'rain' && <CloudRain className="w-16 h-16 text-cyan-400" />}
                </div>
              </div>

              <div className="text-6xl font-bold text-primary mb-4">
                {weather.temperature}°C
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-background/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Humidity</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{weather.humidity}%</p>
                </div>

                <div className="bg-background/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Wind className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Wind Speed</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{weather.windSpeed} km/h</p>
                </div>

                <div className="bg-background/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Visibility</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{weather.visibility} km</p>
                </div>

                <div className="bg-background/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Gauge className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Pressure</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{weather.pressure} mb</p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
