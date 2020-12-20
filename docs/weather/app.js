window.addEventListener('load', () => {
    let long;
    let lat;
    // let locationCountry = document.querySelector('.location-country');
    let locationName = document.querySelector('.location-name');
    // let locationRegion = document.querySelector('.location-region');
    // let locationTimezone = document.querySelector('.location-timezone');
    let temperatureIconPath = document.getElementById("temperature-icon").src;
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureDescription = document.querySelector('.temperature-description');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = 'http://api.weatherapi.com/v1/current.json?key=35bb34a68e7340ef81945003202012&q=' + lat + ',' + long;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const { country, name, region, tz_id } = data.location
                    const { temp_c, temp_f } = data.current;
                    const { icon, text } = data.current.condition;

                    // Set DOM elements from the API
                    // locationCountry.textContent = country
                    locationName.textContent = name
                    // locationRegion.textContent = region
                    // locationTimezone.textContent = tz_id
                    temperatureIconPath = icon.split("/")
                    document.getElementById("temperature-icon").src = temperatureIconPath[3] + "/" + temperatureIconPath[4] + "/" + temperatureIconPath[5] + "/" + temperatureIconPath[6]
                    temperatureDescription.textContent = text

                    // Change temperature to Celsius/Fahrenheit
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureDegree.textContent = temp_c
                            temperatureSpan.textContent = "C"
                        } else {
                            temperatureDegree.textContent = temp_f
                            temperatureSpan.textContent = "F"
                        }
                    });

                })
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new skycons({})
    }
});