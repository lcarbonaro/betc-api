
// built on GSX2JSON by Nick Moreton
// http://gsx2json.com/
// https://github.com/55sketch/gsx2json

var api = require('./api');

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const cors = require('cors');

var app = express();

var port = process.env.PORT || 3000;

/*
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
*/
app.use(cors());

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// get api
app.get('/api', api);

// error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});

app.listen(port, function() {
  console.log('API server listening on port ' + port); 
});

