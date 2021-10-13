let currentTime = new Date();

let longDate = document.querySelector("#current-date");
longDate.innerHTML = formatDate(currentTime);
//console.log("hello");
function formatDate(date) {
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let day = date.getDay();
  let currentDay = days[day - 1];
  let currentHours = date.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();

  let formattedDate = `${currentDay} ${currentHours}:${currentMinutes} </br> ${currentDate} ${currentMonth}`;
  return formattedDate;
}

function getTemperature(response) {
  console.log(response);
  let temperatureElement = document.querySelector(".temperature");

  let description = document.querySelector("#temp-description");
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celciusTemperature = Math.round(response.data.main.temp);
}

function showCity(event) {
  event.preventDefault();

  let input = document.querySelector("#city-input");
  let city = document.querySelector("#city");

  if (input.value) {
    city.innerHTML = `${input.value}`;
    searchCity(input.value);
  } else {
    city.innerHTML = null;
    alert(`Please type a city`);
  }
}

function searchCity(city) {
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=a867e25f2d83db579421a57fd8e937ec`;
  axios.get(apiUrl).then(getTemperature);
}

function displayfahrenheittemp(event) {
  event.preventDefault();
  let fahrenheittemperature = (celciusTemperature * 9) / 5 + 32;
  let tempElement = document.querySelector(".temperature");
  tempElement.innerHTML = fahrenheittemperature;
}

function displaycelciustemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector(".temperature");
  tempElement.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;
let cityForm = document.querySelector("#city-form");

cityForm.addEventListener("submit", showCity);

let fahrenheitlink = document.querySelector(".fahrenheit-temp");
fahrenheitlink.addEventListener("click", displayfahrenheittemp);

let celciuslink = document.querySelector(".celcius-temp");
celciuslink.addEventListener("click", displaycelciustemp);

searchCity("Sydney");
