const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

// Replace with your OpenWeather API key
const API_KEY = '14bfaa67dd97ad5c6370d652a4ac117d';

app.use(express.static('public'));

app.get('/api/solar', async (req, res) => {
    const city = req.query.city;
    
    if (!city) {
        return res.json({ error: 'City name is required' });
    }

    try {
        // Fetch coordinates based on city name
        const weatherResponse = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        const weatherData = await weatherResponse.json();

        if (weatherData.cod !== 200) {
            return res.json({ error: weatherData.message });
        }

        const { coord } = weatherData;
        const lat = coord.lat;
        const lon = coord.lon;

        // Fetch UV Index as a proxy for solar radiation
        const uvResponse = await fetch(`http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        const uvData = await uvResponse.json();

        if (uvData.cod && uvData.cod !== 200) {
            return res.json({ error: uvData.message });
        }

        // Return the UV Index as a proxy for solar radiation
        res.json({
            city: city,
            solar_radiation: uvData.value || 'Data not available' // UV Index value
        });
    } catch (error) {
        res.json({ error: 'Error fetching data' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
