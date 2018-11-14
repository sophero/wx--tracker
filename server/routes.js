const DarkSkyApiController = require('./controllers/dark_sky_api_controller');
const GoogleApiController = require('./controllers/google_api_controller');

module.exports = (app) => {
  app.get('/api/current_weather/:lat/:lng', DarkSkyApiController.getCurrentWeather);

  app.get('/api/geocode/:address', GoogleApiController.getCoords);
  app.get('/api/timezone_offset/:lat/:lng/:time', GoogleApiController.timezoneOffset);
};
