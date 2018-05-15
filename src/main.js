var express = require('express');
var eventList = {};

var event = require('./Model/Event');
var bodyParser = require('body-parser');
var app = express();

// Configuration d'express

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log('App listening on port 3000');
});