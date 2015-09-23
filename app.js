'use strict';
var http = require('http');
var https = require('https');
var path = require('path');
var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var app = express(); 

// set view path
app.set('view engine', 'ejs');
if(process.env.NODE_ENV === 'dev') {

  // set develoment views
  app.set('views', path.join(__dirname, 'views/src'));  
} else {

  // set build view
  app.set('views', path.join(__dirname, 'views/build'));  
}

// set public path
if(process.env.NODE_ENV === 'dev') {

  // set develoment public folder
  app.use(express.static(path.join(__dirname, 'public/src')));
} else {

  // set build public folder
  app.use(express.static(path.join(__dirname, 'public/build')));
}

app.use(bodyParser.json());

// begin routing
app.get('/', function get(req, res) {
  res.render('index');
});

app.get('/api/v1/carparks', function get(request, response) {
  
  // next date
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  var start = tomorrow.getTime();
  var end = start + 24*3600*1000;
  var url = 'https://jschallenge.smove.sg/provider/1/availability?book_start=' + start + '&book_end=' + end;

  https.get(url, function get(res) {
    var chunk = '';

    res.on('data', function data(data) {
      chunk += data;
    });

    res.on('end', function end() {
      var json = JSON.parse(chunk);
      /*json.map(function(carPark) {
        carPark.cars_available = 1;
      })*/
      response.status(200).json(json);
    });
  }).on('error', function on(err) {
    console.log(err);
  });
});

var server = http.createServer(app).listen(3000);
console.log('App is listen on port ' + server.address().port);
module.exports = app;
