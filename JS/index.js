document.addEventListener("DOMContentLoaded", function () {
    function fetchWeatherData(city, unit) {
      const APIkey = "68ff20cdd3f397ada4d2f006b8577eb9";
      const searchurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=${unit}`;

      const xhr = new XMLHttpRequest();
      xhr.open("GET", searchurl, true);

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);

           
            document.getElementById("city-name").textContent =
              data.name;
            document.getElementById("country").textContent =
              data.sys.country;

           
            document.getElementById("temperature").textContent =
              data.main.temp + (unit === "metric" ? "°C" : "°F");

          
            const weatherDescription = data.weather[0].description;
            document.getElementById("weather-description").textContent =
              weatherDescription;

           
            document.getElementById("date-time").textContent =
              new Date().toLocaleString();

           
            document.getElementById("current-temp").textContent =
              data.main.temp + (unit === "metric" ? "°C" : "°F");
            document.getElementById("temperature-result").textContent =
              data.main.temp + (unit === "metric" ? "°C" : "°F");
            document.getElementById("humidity-result").textContent =
              data.main.humidity + "%";
            document.getElementById("wind-speed-result").textContent =
              data.wind.speed + (unit === "metric" ?" km/h" : "mph");
          } else {
           
            const errorMessage = `Error: ${xhr.status} - ${xhr.statusText}`;
            document.getElementById("city-name").textContent = "Error";
            document.getElementById("country").textContent = errorMessage;
            document.getElementById("temperature").textContent = "";
            document.getElementById("weather-description").textContent =
              "";
            document.getElementById("date-time").textContent = "";
            document.getElementById("current-temp").textContent = "";
            document.getElementById("temperature-result").textContent =
              "";
            document.getElementById("humidity-result").textContent = "";
            document.getElementById("wind-speed-result").textContent =
              errorMessage;
          }
        }
      };

      xhr.send();
    }

    fetchWeatherData("Pune", "metric");

    document
      .getElementById("search-form")
      .addEventListener("submit", function (event) {
        event.preventDefault();
        const city = document.getElementById("city-input").value;
        const unit = document.getElementById("unit").value;

        fetchWeatherData(city, unit);
      });

    document
      .getElementById("unit")
      .addEventListener("change", function () {
        const city = document.getElementById("city-input").value;
        const unit = document.getElementById("unit").value;

        fetchWeatherData(city, unit);
      });
  });