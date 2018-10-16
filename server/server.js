const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const port = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());

routes(app);

if (process.env.NODE_ENV === 'production') {
  app.use(static(join(__dirname, '..', 'client', 'build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}
app.listen(port, () => console.log(`Listening on port ${port}`));