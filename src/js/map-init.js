function mapInit() {
    let weatherService = new WeatherService();

    // Init Map
    let startingLocation = { // omadi office
        lat: 40.3121214, 
        lng: -111.7120258
    };
    let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: startingLocation
    });

    new MapWrapper(weatherService, map, startingLocation);
}
