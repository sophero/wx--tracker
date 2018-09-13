const path = require('path');

const DarkSkyApiController = require('./controllers/dark_sky_api_controller');
const GoogleApiController = require('./controllers/google_api_controller');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'public', 'index.html'));
  });
  app.get('/api/current_weather/:lat/:lng', DarkSkyApiController.getCurrentWeather);
  app.get('/api/geocode/:address', GoogleApiController.getLatLongs);
};
