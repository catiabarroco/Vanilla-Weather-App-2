// SHOW POSITION AND TEMP
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  console.log(url);
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

  celsiusTemperature = response.data.main.temp;

  cityNameElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  imageElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  imageElement.setAttribute("alt", `${response.data.weather[0].description}`);

  //------------------------- DATE -------------------------
  let date = new Date();
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
  let dateElement = document.querySelector(".date");
  dateElement.innerHTML = `${day} ${hours}:${minutes}`;
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

//CONVERT UNITS
function showFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  fahrenheit.classList.remove("desactive");
  celsius.classList.add("desactive");
  
  
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
  celsius.classList.remove("desactive");
  fahrenheit.classList.add("desactive");

  
}

//------------------------------------------------------------------------------------------//

let celsiusTemperature = null;

let apiKey = "f746b85726e56b40371fefcb31800d33";
navigator.geolocation.getCurrentPosition(showPosition);

let searchCity = document.querySelector("#weather-form");
searchCity.addEventListener("submit", typeCity);

let currentPosition = document.querySelector("#weather-form");
currentPosition.addEventListener("submit", showPosition);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", showFahrenheitTemperature);

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", showCelsiusTemperature);
