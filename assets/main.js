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
