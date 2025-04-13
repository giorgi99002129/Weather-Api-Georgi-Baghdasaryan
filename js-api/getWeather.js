"use strict";
const weatherContainer = document.getElementById('weather-container');
const buttonDiv = document.getElementById('buttonDiv');
const defaultShow = ['moscow', 'yerevan', 'tbilisi', 'dubai', 'london', 'stepanavan'];
const apiKey = '86d0956a2dd05f68a7b3a97da22e21ad'; // API key
let city
function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let fav
            if (favs) {
                for (let i in favs) {
                    if (city == favs[i]) { fav = true }
                }
            }
            showWeather(data, city, fav);
        })
        .catch(error => {
            console.log(error);
            // alert('Try again !!!');
        })

}

function showWeather(data, city, fav) {
    if (data.main) {
        const temp = data.main.temp;
        const wind = data.wind.speed;
        const clouds = data.clouds.all;
        const pressure = data.main.pressure;
        const description = data.weather[0].description;
        let iconSize = ''; 
        let weatherIconName;
        switch (description.toLowerCase()) {
            case 'clear sky':
                weatherIconName = 'wi wi-day-sunny'; // Иконка для ясного неба
                break;
            case 'few clouds':
            case 'scattered clouds':
            case 'broken clouds':
                weatherIconName = 'wi wi-cloudy';
                break;
            case 'shower rain':
            case 'rain':
                weatherIconName = 'wi wi-rain';
                break;
            case 'thunderstorm':
                weatherIconName = 'wi wi-thunderstorm';
                break;
            case 'snow':
                weatherIconName = 'wi wi-snow';
                break;
            case 'mist':
            case 'fog':
                weatherIconName = 'wi wi-fog';
                break;
            default:
                weatherIconName = 'wi wi-day-cloudy';
                break;
        }

        // check if city in favorites add a remove button else add button
        if (fav) {
            const cityWeatherCard = document.createElement('div');
            cityWeatherCard.classList.add('product-card');
            cityWeatherCard.innerHTML = `
                        <h3 class="product-name" id="weather-header">${city.charAt(0).toUpperCase() + city.slice(1)}</h3>
                        <i class="${iconSize} ${weatherIconName}"></i>
                        <p class="product-description" id="weather-description">${description}</p>
                        <p id="weather-temp">Temperature: ${temp}°C</p>
                        <p id="weather-wind">Wind: ${wind} m/s</p>
                        <p id="weather-clouds">Clouds: ${clouds}%</p>
                        <p id="weather-pressure">Pressure: ${pressure} hpa</p>
                        <button class="add-to-cart" id="add-to-favs" onclick="removeFavorite('${city}')">Remove from favorite</button>
                        <button class="add-to-cart" id="open-details" onclick="getWeatherForecast('${city}')">More details</button>
                    `;
            weatherContainer.appendChild(cityWeatherCard);
        } else {
            const cityWeatherCard = document.createElement('div');
            cityWeatherCard.classList.add('product-card');
            cityWeatherCard.innerHTML = `
                    <h3 class="product-name" id="weather-header">${city.charAt(0).toUpperCase() + city.slice(1)}</h3>
                    <i class="${iconSize} ${weatherIconName}"></i>
                    <p class="product-description" id="weather-description">${description}</p>
                    <p id="weather-temp">Temperature: ${temp}°C</p>
                    <p id="weather-wind">Wind: ${wind} m/s</p>
                    <p id="weather-clouds">Clouds: ${clouds}%</p>
                    <p id="weather-pressure">Pressure: ${pressure} hpa</p>
                    <button class="add-to-cart" id="add-to-favs" onclick="addFavorite('${city}')">Add to favorite</button>
                    <button class="add-to-cart" id="open-details" onclick="getWeatherForecast('${city}')">More details</button>
                `;
            weatherContainer.appendChild(cityWeatherCard);
        }
    } else {
        const cityWeatherCard = document.createElement('div');
        cityWeatherCard.classList.add('product-card');
        cityWeatherCard.innerHTML = `
            <p>Failed to get weather data.</p>
        `;
        weatherContainer.appendChild(cityWeatherCard);
    }

}

function displayWeatherForCities(textininput) {
    if(document.getElementById('weatherChart').style.display == 'block'){
        weatherChart.destroy();
        document.getElementById('weatherChart').style.display = 'none';
    }

    weatherContainer.innerHTML = '';
    buttonDiv.innerHTML = '';

    if (typeof textininput === 'string') {
        getWeather(textininput);
    } else if (Array.isArray(textininput)) {
        if (!textininput.length) {
            const cityWeatherCard = document.createElement('div');
            cityWeatherCard.classList.add('product-card');
            cityWeatherCard.innerHTML = `
                <p>First add a favorite.Now you can go home or search city</p>
            `;
            weatherContainer.appendChild(cityWeatherCard);
        } else {
            textininput.forEach(city => {
                getWeather(city);
            });
        }
    }
}

displayWeatherForCities(defaultShow);


let getInput = () => {
    city = document.getElementById('searchInput').value;
    displayWeatherForCities(city)
    document.getElementById('weatherChart').style.display = 'none';

}

document.getElementById('searchButton').addEventListener('click', getInput);


