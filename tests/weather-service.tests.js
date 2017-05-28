describe('WeatherService', () => {
    let subject;
    let mockWeatherData =  {
        'weather':[{'id':804,'main':'clouds','description':'overcast clouds','icon':'04n'}],
        'main':{'temp':289.5,'humidity':89,'pressure':1013,'temp_min':287.04,'temp_max':292.04}
    };

    beforeEach(() => {
        subject = new WeatherService();
    });

    describe('getWeatherByGeo', () => {

        it('should call external API with the lat and lon and return data on success', () => {
            // ARRANGE
            let lat = 35,
                lon = 139,
                expectedCallArg = subject.genWeatherByGeoUrl(lat, lon),
                deferred = $.Deferred(),
                resolveSpy = sinon.spy(deferred, 'resolve'),
                rejectSpy = sinon.spy(deferred, 'reject'),
                ajaxStub = sinon.stub($, 'ajax', () => {
                    return deferred;
                });

            // ACT
            let result = subject.getWeatherByGeo(lat, lon);
            deferred.resolve(mockWeatherData);

            // ASSERT
            chai.expect(ajaxStub.calledWith(expectedCallArg)).to.be.true;
            chai.expect(result.state()).to.equal('resolved');
            chai.expect(resolveSpy.calledWith(mockWeatherData)).to.be.true;
            chai.expect(rejectSpy.notCalled).to.be.true;
            $.ajax.restore();
        });

        it('should call external API with the lat and lon and reject on failure', () => {
            // ARRANGE
            let lat = 35,
                lon = 139,
                expectedCallArg = subject.genWeatherByGeoUrl(lat, lon),
                deferred = $.Deferred(),
                resolveSpy = sinon.spy(deferred, 'resolve'),
                rejectSpy = sinon.spy(deferred, 'reject'),
                ajaxStub = sinon.stub($, 'ajax', () => {
                    return deferred;
                });

            // ACT
            let result = subject.getWeatherByGeo(lat, lon);
            deferred.reject();

            // ASSERT
            chai.expect(ajaxStub.calledWith(expectedCallArg)).to.be.true;
            chai.expect(result.state()).to.equal('rejected');
            chai.expect(rejectSpy.calledOnce).to.be.true;
            chai.expect(resolveSpy.notCalled).to.be.true;
            $.ajax.restore();
        });
    });
});
