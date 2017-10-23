$( document ).ready(function() {
    console.log( "document ready!" );
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        let fccWxApi = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${long}`;

        $.getJSON(fccWxApi, {
            format: "json"
          })
            .done((data) => {
            let {temp, pressure, humidity, temp_min, temp_max} = data.main;

            $("#location").html(`${data.name}, ${data.sys['country']}`);
            $("#conditions").html(data.weather[0].description);
            $("#temp").html(temp);
            $("#px").html(pressure);
            $("#humidity").html(humidity);
            $("#temp_min").html(temp_min);
            $("#temp_max").html(temp_max);

            $("#results").html(JSON.stringify(data));
          });
      });
    } else {
      console.log('geolocation is *NOT* available')
      // TODO
      // Ask for user's zip code in form field
      // Make API call
    }
});
