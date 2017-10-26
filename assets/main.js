$(document).ready(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        let APIKEY = 'c7b5c30d16ccee93fb9c68b762824218';
        let weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=${APIKEY}`;

        $.getJSON(weatherApi, {
            format: "json"
          })
            .done((data) => {
            let {temp, pressure, humidity, temp_min, temp_max} = data.main;
            let roundedTemp = Math.round(temp);
            let roundedTemp_min = Math.round(temp_min);
            let roundedTemp_max = Math.round(temp_max);

            $("#currentHeader").html('<h3>Current Conditions</h3>');
            $("#spinner").html('');

            $("#location").html(`${data.name}, ${data.sys['country']}`);

            data.weather.forEach((item) => {
              generateIcon(item.main);
              $("#conditions").append(`<p>${item.description}</p>`);
            })

            $("#temp").html(`<h3>Temperature</h3><p>`+roundedTemp+`&deg;C</p>`);
            $("#px").html(`<h3>Pressure</h3><p>`+pressure+` millibars</p>`);
            $("#humidity").html(`<h3>Humidity</h3><p>`+humidity+`%</p>`);
            $("#temp_min").html(`<h3>Min Temp</h3><p>`+roundedTemp_min+`&deg;C</p>`);
            $("#temp_max").html(`<h3>Max Temp</h3><p>`+roundedTemp_max+`&deg;C</p>`);

            $("#toggleContainer").addClass('show');

            $("#convertF").click(() => {
              convertFahrenheit(temp, temp_min, temp_max);
            });

            $("#convertC").click(() => {
              convertCelsius(roundedTemp, roundedTemp_min, roundedTemp_max);
            });

          });
      });
    } else {
      console.log('geolocation is *NOT* available')
      // TODO
      // Ask for user's zip code in form field
      // Make API call
    }
});

convertFahrenheit = (temp, temp_min, temp_max) => {
  let convertedTemp = ((temp * 9) / 5) + 32;
  let convertedMin = ((temp_min * 9) / 5) + 32;
  let convertedMax = ((temp_max * 9) / 5) + 32;
  $("#temp").html(`<h3>Temperature</h3><p>`+Math.round(convertedTemp)+`&deg;F</p>`);
  $("#temp_min").html(`<h3>Min Temp</h3><p>`+Math.round(convertedMin)+`&deg;F</p>`);
  $("#temp_max").html(`<h3>Max Temp</h3><p>`+Math.round(convertedMax)+`&deg;F</p>`);
}

convertCelsius = (roundedTemp, roundedTemp_min, roundedTemp_max) => {
  $("#temp").html(`<h3>Temperature</h3><p>`+roundedTemp+`&deg;C</p>`);
  $("#temp_min").html(`<h3>Min Temp</h3><p>`+roundedTemp_min+`&deg;C</p>`);
  $("#temp_max").html(`<h3>Max Temp</h3><p>`+roundedTemp_max+`&deg;C</p>`);
}

generateIcon = (condition) => {
  switch(condition) {
    case 'Thunderstorm':
      $("#conditions").append(`<i class="fa fa-bolt fa-5x" aria-hidden="true"></i>`);
      break;
    case 'Drizzle':
      $("#conditions").append(`<i class="fa fa-umbrella fa-5x" aria-hidden="true"></i>`);
      break;
    case 'Rain':
      $("#conditions").append(`<i class="fa fa-umbrella fa-5x" aria-hidden="true"></i>`);
      break;
    case 'Snow':
      $("#conditions").append(`<i class="fa fa-snowflake-o fa-5x" aria-hidden="true"></i>`);
      break;
    case 'Clouds':
      $("#conditions").append(`<i class="fa fa-cloud fa-5x" aria-hidden="true"></i>`);
      break;
    case 'Clear':
      $("#conditions").append(`<i class="fa fa-sun-o fa-5x" aria-hidden="true"></i>`);
      break;
    default:
      $("#conditions").append(`<i class="fa fa-sun-o fa-5x" aria-hidden="true"></i>`);
      break;
    }
}
