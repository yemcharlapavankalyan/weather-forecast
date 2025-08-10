const API_KEY = "1dc86c826d1c69e96ab205b3acb6025e";

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) {
        alert("Please enter a city name");
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();

        if (data.cod !== 200) {
            alert(`Error: ${data.message}`);
            return;
        }

        console.log(data);

        const temperature = data.main.temp;
        const weatherCode = data.weather[0].id; 
        const windSpeed = data.wind.speed;
        document.getElementById("location").innerText = `${data.name}, ${data.sys.country}`;
        document.getElementById("temperature").innerText = `${temperature.toFixed(1)}°C`;
        document.getElementById("condition").innerText = mapWeatherCode(weatherCode);
        document.getElementById("wind").innerText = `Wind: ${windSpeed.toFixed(1)} m/s`;

        document.getElementById("weatherIcon").src = getWeatherIcon(weatherCode);

    } catch (error) {
        console.error("Error fetching weather:", error);
        alert("Error fetching weather data. Please try again.");
    }
}

// Map OpenWeatherMap weather codes to descriptions (simplified)
function mapWeatherCode(code) {
    if (code >= 200 && code < 300) return "Thunderstorm";
    if (code >= 300 && code < 400) return "Drizzle";
    if (code >= 500 && code < 600) return "Rain";
    if (code >= 600 && code < 700) return "Snow";
    if (code >= 700 && code < 800) return "Atmosphere (fog, mist, etc.)";
    if (code === 800) return "Clear";
    if (code > 800 && code < 900) return "Clouds";
    return "Unknown Weather";
}

// Map OpenWeatherMap weather codes to icons (you can customize icons)
function getWeatherIcon(code) {
    if (code === 800) return "https://cdn-icons-png.flaticon.com/512/869/869869.png"; // Clear
    if (code >= 200 && code < 300) return "https://cdn-icons-png.flaticon.com/512/1146/1146869.png"; // Thunderstorm
    if (code >= 300 && code < 400) return "https://cdn-icons-png.flaticon.com/512/2932/2932439.png"; // Drizzle
    if (code >= 500 && code < 600) return "https://cdn-icons-png.flaticon.com/512/1163/1163623.png"; // Rain
    if (code >= 600 && code < 700) return "https://cdn-icons-png.flaticon.com/512/1146/1146867.png"; // Snow
    if (code >= 700 && code < 800) return "https://cdn-icons-png.flaticon.com/512/1779/1779816.png"; // Fog/Mist
    if (code > 800 && code < 900) return "https://cdn-icons-png.flaticon.com/512/1163/1163624.png"; // Clouds
    return "https://cdn-icons-png.flaticon.com/512/869/869869.png"; // Default icon
}

