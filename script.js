
const apiKey = "d02f528da9277408e18b86fdbf114ec9";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=imperial&q=";

const searchBox = document.querySelector('.search input');
const searchButton = document.querySelector('.search button');

const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
    } else {
        let data = await response.json();

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°F';
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
        document.querySelector('.wind').innerHTML = data.wind.speed + ' mph';

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = 'images/clouds.png';
        }  else if (data.weather[0].main == "Clear") {
            weatherIcon.src = 'images/clear.png';
        } else if (data.weather[0].main == 'Rain') {
            weatherIcon.src = 'images/rain.png';
        } else if (data.weather[0] == 'Drizzle') {
            weatherIcon.src = 'images/drizzle.png';
        } else if (data.weather[0] == 'Mist') {
            weatherIcon.src = 'images/mist.png';
        }

        document.querySelector('.weather').style.display = 'block';
        document.querySelector('.error').style.display = 'none';
    }

}

searchButton.addEventListener('click', () => {
    checkWeather(searchBox.value);
    searchBox.value = '';

})