async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const apiKey = "42acc328c938d0afa540aeb79576acd9";  
    if(city === "") {
        alert("Please enter a city name");
        return;
    }

   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if(data.cod === "404") {
            document.getElementById("weatherResult").innerHTML = 
                `<p class="text-danger">City not found</p>`;
            return;
        }

        const weatherHTML = `
            <h4>${data.name}, ${data.sys.country}</h4>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
            <h3>${data.main.temp}°C</h3>
            <p>${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;

        document.getElementById("weatherResult").innerHTML = weatherHTML;

    } catch (error) {
        document.getElementById("weatherResult").innerHTML = 
            `<p class="text-danger">Error fetching data</p>`;
    }
}