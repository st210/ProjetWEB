var express = require('express');
var bodyParser = require('body-parser');
var gestionEvent = require('.gestionEvent/');
var listeEvents = {};

var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log('App listening on port 3000');
});