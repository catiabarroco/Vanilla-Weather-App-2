// SHOW POSITION AND TEMP
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  axios.get(url).then(showTemperature);
}

//SHOW DATA OF TEMP
function showTemperature(response) {
  let cityNameElement = document.querySelector(".city-name");
  let temperatureElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector(".humidity");
  let windElement = document.querySelector(".wind");
  let descriptionElement = document.querySelector(".description");
  let imageElement = document.querySelector(".image");
  let dateElement = document.querySelector(".date");

  celsiusTemperature = response.data.main.temp;

  cityNameElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  imageElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  imageElement.setAttribute("alt", `${response.data.weather[0].description}`);
  dateElement.innerHTML = showDate(response.data.dt);

  forecastUrl(response.data.coord);
}
//------------------------- DATE -------------------------
function showDate(dateToday) {
  let date = new Date(dateToday * 1000);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

//SEARCH FOR A EXPECIFIC CITY

function typeCity(event) {
  event.preventDefault();
  let cityNameElement = document.querySelector(".city-name");
  let searchNewCityElement = document.querySelector("#search-city");
  cityNameElement.innerHTML = searchNewCityElement.value;
  console.log(searchNewCityElement.value);

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchNewCityElement.value}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}

//SHOW FORECAST
function showForecast(response) {
  let futureWeather = document.querySelector(".future-weather");
  let forecastHTML = `<div class="row">`;

  let forecast = response.data.daily;
  forecast.forEach(function (forecast, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
              <div class="card" style="width: 8rem">
                <div class="card-body">
                  <h5 class="card-title">${forecastDate(forecast.dt)}</h5>
                  <img
                    src="https://openweathermap.org/img/wn/${
                      forecast.weather[0].icon
                    }@2x.png"
                    class="card-img-top"
                    alt="..."
                  />
                  <p class="card-text">
                    <span class="maxim"> ${Math.round(
                      forecast.temp.max
                    )}??C </span>  
                    <span class="minim"> ${Math.round(
                      forecast.temp.min
                    )}??C</span>
                  </p>
                </div>
              </div>
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  futureWeather.innerHTML = forecastHTML;
}
//------------------------- URL FORECAST -------------------------
function forecastUrl(coordenates) {
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordenates.lat}&lon=${coordenates.lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showForecast);
}
//------------------------- DATE FORECAST -------------------------
function forecastDate(dateForecast) {
  let date = new Date(dateForecast * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}

//------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------//

let apiKey = "f746b85726e56b40371fefcb31800d33";
navigator.geolocation.getCurrentPosition(showPosition);

let searchCity = document.querySelector("#weather-form");
searchCity.addEventListener("submit", typeCity);

let currentPosition = document.querySelector("#weather-form");
currentPosition.addEventListener("submit", showPosition);
