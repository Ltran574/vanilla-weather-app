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
let cityForm = document.querySelector("#city-form");

cityForm.addEventListener("submit", showCity);

function getTemperature(response) {
  console.log(response);
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let description = document.querySelector("#temp-description");
  description.innerHTML = response.data.weather[0].main;
}
