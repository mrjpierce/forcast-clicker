const sinon = require('sinon');
const chai = require('chai');
const WeatherService = require('./../src/weather.service.js');

// Jquery Mock Hackery :(
const $ = {
    get: () => {}
};
global.$ = $;

describe('WeatherService', () => {
    let subject;

    beforeEach(() => {
        subject = new WeatherService();
    });

    describe('getWeatherByGeo', () => {

        it('should call external API with the lat and lon and return data on success', () => {
            // ARRANGE
            let lat = 35,
                lon = 139,
                mockWeatherData = {
                    'weather':[{'id':804,'main':'clouds','description':'overcast clouds','icon':'04n'}],
                    'main':{'temp':289.5,'humidity':89,'pressure':1013,'temp_min':287.04,'temp_max':292.04}
                },
                getStub = sinon.stub($, 'get')
                    .callsFake((url, data, success) => {
                        success(mockWeatherData);
                    });

            // ACT
            let result = subject.getWeatherByGeo(lat, lon);

            // ASSERT
            chai.expect(getStub.calledOnce).to.be.true;
            chai.expect(getStub.calledWith(subject.weatherAPIBaseUrl, { lat, lon })).to.be.true;
            chai.expect(result).to.equal(mockWeatherData);
            getStub.restore();
        });

        it('should call external API with the lat and lon and return an empty object on failure', () => {
            // ARRANGE
            let lat = 35,
                lon = 139,
                mockWeatherData = {
                    'weather':[{'id':804,'main':'clouds','description':'overcast clouds','icon':'04n'}],
                    'main':{'temp':289.5,'humidity':89,'pressure':1013,'temp_min':287.04,'temp_max':292.04}
                },
                getStub = sinon.stub($, 'get')
                    .callsFake((url, data, success) => {});

            // ACT
            let result = subject.getWeatherByGeo(lat, lon);

            // ASSERT
            chai.expect(getStub.calledOnce).to.be.true;
            chai.expect(getStub.calledWith(subject.weatherAPIBaseUrl, { lat, lon })).to.be.true;
            chai.expect(result).to.be.empty;
            getStub.restore();
        });
    });
});
