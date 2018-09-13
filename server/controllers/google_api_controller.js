const axios = require('axios');
const googleGeocodeApiKey = process.env.GOOGLE_GEOCODE_API_KEY;

module.exports = {

  getLatLongs(req, res) {
    const encodedAddress = encodeURIComponent(req.params.address);
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${googleGeocodeApiKey}&address=${encodedAddress}`;
    
    axios.get(geocodeUrl).then((geoRes) => {

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

    }).catch((err) => {
      if (err.code === 'ENOTFOUND') {
        res.send({ errorMsg: 'Unable to connect to API server.' });
      } else {
        res.send({ errorMsg: err.message })
      }
    });
  }
}