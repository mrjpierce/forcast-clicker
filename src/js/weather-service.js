class WeatherService {

    constructor() {
        this.weatherAPIBaseUrl = 'http://api.openweathermap.org/data/2.5/weather';
        this.iconBaseUrl = 'http://openweathermap.org/img/w/';
        this.units = 'imperial';
        this.APPID = '15a7e1d6933e8d52eb415eb2a15f956c';
        this.userId = 524901;
    }

    getWeatherByGeo(lat, lon) {
        let deferred = $.Deferred()
        let configData = { 
            lat, 
            lon, 
            id: 524901,
            units: this.units, 
            APPID: this.apikey 
        };
        
        $.ajax(this.genWeatherByGeoUrl(lat, lon))
            .done((data) => {
                deferred.resolve(data);
            })
            .fail(() => {
                deferred.reject();
            });

        return deferred;
    }

    genIconUrl(iconName) {
        return this.iconBaseUrl + iconName + '.png';
    }

    genWeatherByGeoUrl(lat, lon) {
        return `${this.weatherAPIBaseUrl}?lat=${lat}&lon=${lon}&units=${this.units}&id=${this.userId}&APPID=${this.APPID}`;
    }
}