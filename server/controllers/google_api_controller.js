const axios = require('axios');
const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

module.exports = {

  async getCoords(req, res) {
    try {
      const encodedAddress = encodeURIComponent(req.params.address);
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${googleMapsApiKey}&address=${encodedAddress}`;

      const geoRes = await axios.get(geocodeUrl);
      if (geoRes.data.results.length === 0) {
        throw new Error('Unable to find address.');
      }
      const { lat, lng } = geoRes.data.results[0].geometry.location;
      const formattedAddress = geoRes.data.results[0].formatted_address;
      res.send({
        lat,
        lng,
        formattedAddress
      });

    } catch (err) {
      if (err.code === 'ENOTFOUND') {
        res.send({ errorMsg: 'Unable to connect to API server.' });
      } else {
        res.send({ errorMsg: err.message })
      }
    }
  },

  async timezoneOffset(req, res) {
    try {
      const { lat, lng, time } = req.params;
      const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${time}&key=${googleMapsApiKey}`

      const timeRes = await axios.get(url);

      if (timeRes.data.status !== "OK") {
        throw new Error(timeRes.data.errorMessage || 'Zero results');
      }
      res.send({
        offset: parseInt(timeRes.data.dstOffset) + parseInt(timeRes.data.rawOffset),
        timeZoneName: timeRes.data.timeZoneName
      });

    } catch (err) {
      console.log("error message from timezone api:", err);
      res.send({ errorMsg: err.message });
    }
  }
}