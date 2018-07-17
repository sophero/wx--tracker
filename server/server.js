const express = require('express');
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;
const darkSkyApiKey = process.env.DARK_SKY_API_KEY;

const app = express();
app.use(bodyParser.json());

app.get('/api/currentWeather/:lat/:lng', (req, res) => {
  let { lat, lng } = req.params;
  let darkSkyUrl = `https://api.darksky.net/forecast/${darkSkyApiKey}/${lat},${lng}`;
  axios.get(darkSkyUrl).then((wxRes) => {
    var { sunriseTime, sunsetTime } = wxRes.data.daily.data[0];
    var cur = wxRes.data.currently;
    res.send({
      wx: {
        temp: cur.temperature,
        dewPoint: cur.dewPoint,
        pressure: cur.pressure,
        windBearing: cur.windBearing,
        windSpeed: cur.windSpeed
      },
      // time variables in SECONDS since 1 January 1970
      time: cur.time,
      sunrise: sunriseTime,
      sunset: sunsetTime
    });
  });
});


if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(static(join(__dirname, '..', 'client', 'build')));
  // Handle React routing, return all requests to React app
  app.get('/*', function(req, res) {
    res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}
app.listen(port, () => console.log(`Listening on port ${port}`));