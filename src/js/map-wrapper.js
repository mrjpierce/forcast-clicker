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
        this.updateUIState('loading');
        let response = this.weatherService.getWeatherByGeo(lat, lng)
            .done((response) => {
                
                // Set data grid
                let data = response,
                    sunrise = moment.unix(+data.sys.sunrise),
                    sunset = moment.unix(+data.sys.sunset),
                    weatherIcon = this.weatherService.genIconUrl(data.weather[0].icon);

                $('#location').html(response.name);
                $('#condition').html(data.weather[0].description);
                $('#weather-icon').attr("src", weatherIcon);
                $('#temperature').html(data.main.temp + ' F');
                $('#humidity').html(data.main.humidity + '%');
                $('#sunrise').html(sunrise.format('HH:mm'));
                $('#sunset').html(sunset.format('HH:mm'));
                $('#wind-speed').html(data.wind.speed + ' mph');
                $('#wind-direction').html(data.wind.deg + ' degrees');

                // Set marker
                this.marker.setIcon({
                    url: weatherIcon,
                    scaledSize: new google.maps.Size(64, 64)
                });

                this.updateUIState('success');
            })
            .fail(() => {
                this.updateUIState('failure');
            });
    }

    updateUIState(state) {
        switch(state) {
            case 'loading':
                $('#weather-loading').show();
                $('#weather-success').hide();
                $('#weather-error').hide();
                break;

            case 'success':
                $('#weather-loading').hide();
                $('#weather-success').show();
                $('#weather-error').hide();
                break;

            case 'failure':
                $('#weather-loading').hide();
                $('#weather-success').hide();
                $('#weather-error').show();
                break;
        }
    }
}
