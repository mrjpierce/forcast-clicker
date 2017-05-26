module.exports = class WeatherService {

    constructor() {
        this.weatherAPIBaseUrl = 'api.openweathermap.org/data/2.5/weather';
        this.iconBaseUrl = 'openweathermap.org/img/w/';
    }

    getWeatherByGeo(lat, lon) {
        let weatherData = {};

        $.get(this.weatherAPIBaseUrl, { lat, lon }, (data) => {
            weatherData = data;
        });

        return weatherData;
    }

    genIconUrl(iconName) {
        return this.iconBaseUrl + iconName + '.png';
    }
}