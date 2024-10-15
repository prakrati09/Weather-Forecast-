// Replace with your OpenWeatherMap API key
const API_KEY = '58fa6abcfa43a0beb00ae355de64323e';

// DOM Elements
const searchBtn = document.getElementById('search-btn');
const currentLocationBtn = document.getElementById('current-location-btn');
const cityInput = document.getElementById('city-input');
const currentWeatherDiv = document.getElementById('current-weather');
const forecastDiv = document.getElementById('forecast');
const dropdown = document.getElementById('dropdown');

let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || []; // Load history from localStorage

// Event Listeners
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherByCity(city);
        addToSearchHistory(city); // Add city to history
        cityInput.value = ''; // Clear input after search
        dropdown.classList.add('hidden'); // Hide dropdown
    } else {
        alert('Please enter a city name.');
    }
});

currentLocationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                // Fetch and display weather data for the current location
                getWeatherByCoords(latitude, longitude);
            },
            error => {
                // Improved error handling for location retrieval
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        alert('User denied the request for Geolocation.');
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert('Location information is unavailable.');
                        break;
                    case error.TIMEOUT:
                        alert('The request to get user location timed out.');
                        break;
                    case error.UNKNOWN_ERROR:
                        alert('An unknown error occurred.');
                        break;
                }
            }
        );
    } else {
        alert('Geolocation is not supported by your browser.');
    }
});


// Show dropdown when input is focused
cityInput.addEventListener('focus', () => {
    updateCityDropdown();
});

// Hide dropdown when clicking outside
document.addEventListener('click', (event) => {
    if (!cityInput.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.classList.add('hidden');
    }
});

// Event listener for dropdown selection

dropdown.addEventListener('click', (event) => {
    const dropdownItem = event.target.closest('.dropdown-item'); // Get the closest dropdown item
    if (dropdownItem) {
        const selectedCity = dropdownItem.querySelector('span').textContent; // Get city from span
        getWeatherByCity(selectedCity); // Fetch weather for the selected city
        dropdown.classList.add('hidden'); // Hide dropdown after selection
    }
});


// Functions to Fetch Weather Data
async function getWeatherByCity(city) {
    try {
        const weatherData = await fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`);
        displayCurrentWeather(weatherData);
        const forecastData = await fetchForecastData(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`);
        displayForecast(forecastData);
    } catch (error) {
        alert(error.message);
    }
}

// Function to fetch weather by coordinates
async function getWeatherByCoords(lat, lon) {
    try {
        const weatherData = await fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
        displayCurrentWeather(weatherData);
        
        const forecastData = await fetchForecastData(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
        displayForecast(forecastData);
    } catch (error) {
        alert(error.message);
    }
}

// Function to display current weather
function displayCurrentWeather(data) {
    const { name, sys, weather, main, wind } = data;
    const weatherHTML = `
        <h2 class="text-xl font-semibold mb-4">Current Weather in ${name}, ${sys.country}</h2>
        <div class="weather-details flex items-center">
            <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].description}" class="w-16 h-16 mr-4">
            <div>
                <p class="text-lg font-medium capitalize">${weather[0].description}</p>
                <p>Temperature: <span class="font-bold">${main.temp}°C</span></p>
                <p>Humidity: ${main.humidity}%</p>
                <p>Wind Speed: ${wind.speed} m/s</p>
            </div>
        </div>
    `;
    currentWeatherDiv.innerHTML = weatherHTML;
}

// Function to fetch weather data from API
async function fetchWeatherData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('City not found or weather data unavailable.');
    }
    return response.json();
}

// Function to fetch forecast data from API
async function fetchForecastData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Forecast data not available.');
    }
    return response.json();
}


// Functions to Display Data
function displayCurrentWeather(data) {
    const { name, sys, weather, main, wind } = data;
    const weatherHTML = `
        <h2 class="text-xl font-semibold mb-4">Current Weather in ${name}, ${sys.country}</h2>
        <div class="weather-details flex items-center">
            <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].description}" class="w-16 h-16 mr-4">
            <div>
                <p class="text-lg font-medium capitalize">${weather[0].description}</p>
                <p>Temperature: <span class="font-bold">${main.temp}°C</span></p>
                <p>Humidity: ${main.humidity}%</p>
                <p>Wind Speed: ${wind.speed} m/s</p>
            </div>
        </div>
    `;
    currentWeatherDiv.innerHTML = weatherHTML;
}

function displayForecast(data) {
    const forecastList = data.list;
    const dailyForecast = [];

    forecastList.forEach(item => {
        if (item.dt_txt.includes("12:00:00")) {
            dailyForecast.push(item);
        }
    });

    let forecastHTML = `<h2 class="text-xl font-semibold mb-4">5-Day Forecast</h2><div class="forecast-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">`;

    dailyForecast.forEach(day => {
        const date = new Date(day.dt * 1000);
        const options = { weekday: 'long', month: 'short', day: 'numeric' };
        const dayName = date.toLocaleDateString(undefined, options);
        forecastHTML += `
            <div class="forecast-card bg-blue-100 p-4 rounded-lg shadow">
                <p class="font-semibold">${dayName}</p>
                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="${day.weather[0].description}" class="w-12 h-12 my-2">
                <p>${day.weather[0].description}</p>
                <p>Temp: <span class="font-bold">${day.main.temp}°C</span></p>
                <p>Humidity: <span class="font-bold">${day.main.humidity}%</span></p>
                <p>Wind Speed: <span class="font-bold">${day.wind.speed} m/s</span></p>
            </div>
        `;
    });

    forecastHTML += `</div>`;
    forecastDiv.innerHTML = forecastHTML;
}

// Function to Add City to Search History
function addToSearchHistory(city) {
    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory)); // Save to localStorage
        updateCityDropdown();
    }
}

// Function to Update the Dropdown with Search History
function updateCityDropdown() {
    dropdown.innerHTML = ''; // Clear previous options

    // Display all cities in search history
    searchHistory.forEach(city => {
        const div = document.createElement('div');
        div.className = 'dropdown-item flex justify-between items-center p-2 cursor-pointer hover:bg-gray-200'; // Add some padding and hover effect
        div.innerHTML = `
            <span>${city}</span>
            <button class="delete-btn text-red-500 hover:bg-red-100 p-1 rounded">X</button>
        `;
        dropdown.appendChild(div);

        // Add event listener to delete button
        div.querySelector('.delete-btn').addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent triggering the dropdown item click
            deleteCityFromHistory(city);
        });
    });

    if (searchHistory.length > 0) {
        dropdown.classList.remove('hidden'); // Show dropdown if there are history items
        dropdown.style.width = `${cityInput.clientWidth}px`; // Set dropdown width to input width
    } else {
        dropdown.classList.add('hidden'); // Hide if no items
    }
}

// Function to delete a city from search history
function deleteCityFromHistory(city) {
    searchHistory = searchHistory.filter(item => item !== city); // Remove city from history
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory)); // Update localStorage
    updateCityDropdown(); // Update the dropdown
}

// Fetch weather for a default city on page load
document.addEventListener('DOMContentLoaded', () => {
    getWeatherByCity('Delhi');
});
