class MapWrapper {

    constructor(weatherService, map, startingLocation) {
        this.weatherService = weatherService;
        this.map = map;
        this.startingLocation = startingLocation;
        this.updateWeatherInformation(this.startingLocation.lat, this.startingLocation.lng);

        // Place marker
        this.marker = new google.maps.Marker({
            animation: google.maps.Animation.DROP,
            draggable: true,
            map: this.map,
            position: this.startingLocation
        });
        

        // Attach to marker event
        google.maps.event.addListener(this.marker, 'dragend', () => {
            let position = this.marker.getPosition();
            this.updateWeatherInformation(position.lat(), position.lng());
        });
    }

    updateWeatherInformation(lat, lng) {
        let response = this.weatherService.getWeatherByGeo(lat, lng)
            .done((response) => {
                $('#weather').show();
                $('#api-error').hide();

                // Set data
                let data = response.data,
                    sunrise = moment.unix(+data.sys.sunrise),
                    sunset = moment.unix(+data.sys.sunset);
                $('#location').html(response.data.name);
                $('#condition').html(data.weather[0].description);
                $('#temperature').html(data.main.temp + ' F');
                $('#humiditiy').html(data.main.humidity + '%');
                $('#sunrise').html(sunrise.format('HH:mm'));
                $('#sunset').html(sunset.format('HH:mm'));
                $('#wind-speed').html(data.wind.speed + ' mph');
                $('#wind-direction').html(data.wind.deg + ' degrees');
            })
            .fail(() => {
                $('#weather').hide();
                $('#api-error').show();
            });
    }
}
