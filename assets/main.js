$( document ).ready(function() {
    console.log( "document ready!" );
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude);

        // TODO
        // pass coordinates to API
        // make API call
        // get JSON back
        // render JSON results in browser
      });
    } else {
      console.log('geolocation is *NOT* available')
      // TODO
      // Ask for user's zip code in form field
      // Make API call
    }
});
