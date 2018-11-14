const axios = require('axios');
const darkSkyApiKey = process.env.DARK_SKY_API_KEY;

module.exports = {

  async getCurrentWeather(req, res) {
    try {
      const { lat, lng } = req.params;
      if ((Math.abs(lat) > 90) || Math.abs(lng) > 180) {
        throw new Error('Invalid coordinates');
      }
      const darkSkyUrl = `https://api.darksky.net/forecast/${darkSkyApiKey}/${lat},${lng}`;
      const wxRes = await axios.get(darkSkyUrl);

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

    } catch(err) {
      res.status(400).send({ err });
    }
  }
}
