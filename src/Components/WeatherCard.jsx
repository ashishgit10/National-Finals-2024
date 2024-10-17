import React, { useState, useEffect } from 'react';
import axios from 'axios';
import weather1 from '/card/weather1.webp'
import weather2 from '/card/weather2.webp'

const WeatherCard = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_KEY = '5ba9df89de97533acef292a6b2d75fe8';

    useEffect(() => {
        const fetchWeatherData = async (latitude, longitude) => {
            try {
                const response = await axios.get(` https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric `);
                setWeatherData(response.data);
                console.log(response)
                setLoading(false);
            } catch (error) {
                setError("Failed to fetch weather data");
                setLoading(false);
            }
        };

        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        fetchWeatherData(position.coords.latitude, position.coords.longitude);
                    },
                    () => {
                        setError("Location access denied");
                        setLoading(false);
                    }
                );
            } else {
                setError("Geolocation not supported by this browser");
                setLoading(false);
            }
        };

        getLocation();
    }, []);

    if (loading) return <div className='text-white'>Fetch Weather Data...</div>;
    if (error) return <div className='text-white'>{error}</div>;

    return (
        <div className='relative overflow-hidden ml-4 bg-neutral-900 rounded-3xl'>
            <div className="relative rounded-3xl overflow-hidden max-h-max flex z-[2] items-center flex-col shadow-lg  px-16 py-16  ">
                <div><h1 className='text-white font-bold my-2 text-lg z-30'>Weather Forecast</h1></div>
                <div><img className="w-36  rounded-full" srcSet={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} /></div>
                <div className="font-bold text-xl mt-3 text-white mb-2">
                    {weatherData.name}
                </div>
                <p className="text-white text-center font-bold py-2 text-4xl">
                    {weatherData.main.temp}°C
                </p>

                <p className="text-white pb-2 text-base">
                    <strong>Weather :</strong> {weatherData.weather[0].description}
                </p>
                <p className="text-white text-base">
                    <strong>Humidity :</strong> {weatherData.main.humidity}%
                </p>
            </div>
            <img srcSet={weather1} className='w-96 -left-28 absolute -bottom-20' />
            <img srcSet={weather2} className='w-80 absolute -right-36 -top-20 ' />
        </div>
    );
};

export default WeatherCard;