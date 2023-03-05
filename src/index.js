let now = new Date();
let days = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];
let day = days[now.getDay()];
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
let month = months[now.getMonth()];
let date = now.getDate();
let dayinfo = document.querySelector("h3.theday");
dayinfo.innerHTML = day;
let dateinfo = document.querySelector("span.thedate");
dateinfo.innerHTML = `${month} ${date} `;
let timeinfo = document.querySelector("span.thetime");
timeinfo.innerHTML = `${now.getHours()} : ${now.getMinutes()} `;

function changeCity(event) {
  event.preventDefault();

  const cityInput = document.querySelector("#cityname").value;
  const city = document.querySelector("#city-name");
  city.innerHTML = cityInput;

  const apiKey = "42ab2c2ee73f7e1a2ff24479d6688080";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${apiKey}`;

  function showTemp(response) {
    const tempElement = document.querySelector("#temp-value");
    tempElement.innerHTML = Math.round(response.data.main.temp);
    const humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = Math.round(response.data.main.humidity);
    const windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);
  }

  axios.get(apiUrl).then(showTemp);
}

const cityform = document.querySelector("#city-form");
cityform.addEventListener("submit", changeCity);

function changeCityByLocation(event) {
  event.preventDefault();

  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    let apiKey = "42ab2c2ee73f7e1a2ff24479d6688080";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    function showTemp(response) {
      const tempElement = document.querySelector("#temp-value");
      tempElement.innerHTML = Math.round(response.data.main.temp);
      const humidityElement = document.querySelector("#humidity");
      humidityElement.innerHTML = Math.round(response.data.main.humidity);
      const windElement = document.querySelector("#wind");
      windElement.innerHTML = Math.round(response.data.wind.speed);

      let city = response.data.name;
      let cityElement = document.querySelector("#city-name");
      cityElement.innerHTML = city;
    }

    axios.get(apiUrl).then(showTemp);
  }

  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#location");
locationButton.addEventListener("click", changeCityByLocation);
