const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fetch = require('node-fetch');

require('dotenv').config();

const app = express();

app.use(morgan('tiny'));
app.use(cors());

// Authorization Headers for Requests

let myHeaders = {
  Authorization: `Bearer ${process.env.YELP_API_KEY}`,
  Cookie: '__cfduid=da1a9499ce24388795e03e73d3c00340b1587106186',
};

let requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow',
};

// let coordinates = '&latitude=21.2869027&longitude=-157.7973769';

// Routes

app.get('/businesses/:offset/:latitude/:longitude', (req, res) => {
  let coordinates = `&latitude=${req.params.latitude}&longitude=${req.params.longitude}`;
  let resultOffset = `&offset=${req.params.offset}`;
  const API_ADDRESS = `https://api.yelp.com/v3/businesses/search?limit=50${coordinates}${resultOffset}`;
  fetch(API_ADDRESS, requestOptions)
    .then((response) => response.json())
    .then((json) => {
      res.json(json);
      let businesses = json.businesses;
      console.log(businesses.length);
    });
});

function notFound(req, res, next) {
  const error = new Error('Not Found');
  res.status(404);
  next(error);
}

function errorHandler(error, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: error.message,
  });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on port', port);
});
