# forcast-clicker

## Setup
```
npm i
```

## Run
Open src/index.html

## Test
Open tests/test-runner.html

## Notes

 - Used npm for package management.
 - Used mocha, chai, and sinon for a test suite. As this is a browser only environment, tests can be run in the browser by opening the test-runner.html in the tests folder.
 - Only class tested is the WeatherService because it was the only non-display logic class.
 - Added a loading spinner, and error message for better user experience.
 - Used the icon information to change the marker and add a visual indication to the condition data.
 - Only thing I would have like to do but did not is pull out some information related to the api into a config.