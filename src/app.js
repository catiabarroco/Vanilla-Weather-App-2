function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}

function showTemperature(response) {
  let cityNameElement = document.querySelector(".city-name");
  let temperatureElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector(".humidity");
  let windElement = document.querySelector(".wind");
  let descriptionElement = document.querySelector(".description");
  let imageElement = document.querySelector(".image");

  cityNameElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
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

function typeCity(event) {
  event.preventDefault();
  let cityNameElement = document.querySelector(".city-name");
  let searchNewCityElement = document.querySelector("#search-city");
  cityNameElement.innerHTML = searchNewCityElement.value;
  console.log(searchNewCityElement.value)

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchNewCityElement.value}&units=metric&appid=${apiKey}`;
  console.log(url)
  axios.get(url).then(showTemperature);
}

let apiKey = "f746b85726e56b40371fefcb31800d33";
navigator.geolocation.getCurrentPosition(showPosition);

let searchCity = document.querySelector("#weather-form");
searchCity.addEventListener("submit", typeCity);
