'use strict';
var http = require('http');
var path = require('path');
var express = require('express');
var favicon = require('serve-favicon');
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

// begin routing
app.get('/', function get(req, res) {
  res.render('index');
});

var server = http.createServer(app).listen(3000);
console.log('App is listen on port ' + server.address().port);
module.exports = app;
