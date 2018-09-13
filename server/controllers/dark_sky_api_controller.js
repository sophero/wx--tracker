const axios = require('axios');
const darkSkyApiKey = process.env.DARK_SKY_API_KEY;

module.exports = {

  getCurrentWeather(req, res) {
    const { lat, lng } = req.params;
    const darkSkyUrl = `https://api.darksky.net/forecast/${darkSkyApiKey}/${lat},${lng}`;
    axios.get(darkSkyUrl).then((wxRes) => {
      const { sunriseTime, sunsetTime } = wxRes.data.daily.data[0];
      const cur = wxRes.data.currently;
      res.send({
        wx: {
          temp: cur.temperature,
          dewPoint: cur.dewPoint,
          pressure: cur.pressure,
          windBearing: cur.windBearing,
          windSpeed: cur.windSpeed
        },
        // time variables in SECONDS since 1 January 1970
        time: {
          wxTime: cur.time,
          sunrise: sunriseTime,
          sunset: sunsetTime
        }
      });
    });
  }
}
