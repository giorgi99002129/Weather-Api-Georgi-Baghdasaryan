// Получаем элементы
const countrySelect = document.getElementById('country-select');
const regionSelect = document.getElementById('region-select');
const citySelect = document.getElementById('city-select');

const menu = document.getElementById('menu');

const weatherContainer = document.getElementById('weather-container');
const weatherDescription = document.getElementById('weather-description');
const weatherTemp = document.getElementById('weather-temp');

// Данные для регионов и городов
const regions = {
    russia: ['Moscow', 'SaintPetersburg', 'Yekaterinburg'],
    usa: ['New York', 'Los Angeles', 'Chicago'],
    am: ['Erevan', 'Shirak', 'Lori']
};

const citi = {
    erevan: ['Erevan'],
    shirak: ['Gyumri','Artik'],
    lori: ['Vanadzor','Tashir','Stepanavan'],
    moscow: ['moscow','lala','lulu'],
    saintpetersburg: ['saint','peter'],
    yekaterinburg: ['yeka','terin']
}


// Обработчик изменения страны  
countrySelect.addEventListener('change', () => {
    const selectedCountry = countrySelect.value;

    // Сбрасываем выбор области и города
    regionSelect.disabled = false;
    citySelect.disabled = true;
    citySelect.innerHTML = '<option value="" disabled selected>Select city</option>';

    // Очищаем список областей и добавляем новые для выбранной страны
    regionSelect.innerHTML = '<option value="" disabled selected>Select region</option>';
    if (regions[selectedCountry]) {
        regions[selectedCountry].forEach(region => {
            const option = document.createElement('option');
            option.value = region.toLowerCase();
            option.textContent = region;
            regionSelect.appendChild(option);
        });
    }
});

// Обработчик изменения области
regionSelect.addEventListener('change', () => {
    const selectedRegion = regionSelect.value;

    // Сбрасываем выбор города
    citySelect.disabled = false;
    citySelect.innerHTML = '<option value="" disabled selected>Select city</option>';

    // В данном примере для простоты города совпадают с регионами, в реальной жизни
    // это будет зависеть от выбранной области
    const cities = citi[regionSelect.value]; // Список городов для выбранной страны
    console.log(regionSelect.value)
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city.toLowerCase();
        option.textContent = city;
        citySelect.appendChild(option);
    });
});

// Обработчик изменения города
citySelect.addEventListener('change', () => {
    console.log(citySelect.value)
    if (citySelect.value !== "") {
        menu.style.display = 'flex'; // Показываем меню с продуктами
        getWeather(citySelect.value);
    }
});





function getWeather(city) {
    const apiKey = '86d0956a2dd05f68a7b3a97da22e21ad'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`; // запрос для получения погоды

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.main) { 
                const temp = data.main.temp;
                const description = data.weather[0].description;
                weatherDescription.textContent = `Weather: ${description}`;
                weatherTemp.textContent = `Temperature: ${temp}°C`;
            } else {
                weatherDescription.textContent = 'Failed to get weather data.';
                weatherTemp.textContent = '';
            }
        })
        .catch(error => {
            weatherDescription.textContent = 'Error when get weather data.';
            weatherTemp.textContent = '';
        });
}


//test scripts

