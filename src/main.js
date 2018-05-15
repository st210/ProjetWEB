var eventList = {};

var event = require('./Model/Event');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
app.use(bodyParser.json());
app.use('/bower_components', express.static(__dirname + '/bower_components'));


// Services REST

app.get('/', function (req, res) {
    res.send('Bienvenue dans la gestion d\'events!');
});

app.get('/api/event/:idE', function (req, res){
    var idE = req.params.idE;
    if (isNaN(idE)){
        res.status(400).json({error: `Event ${idE} invalide.`});
    } else {
        if (!Event.createEvent(idE, "test", "test", "test", "test", "test", "test", 2)){
            res.status(409).json({error: `Event ${req.params.idE} déjà existant.`});
        } else {
            res.status(201).json(req.body);
        }
    }
});

app.post('/api/event/add'), function (req, res){
    // todo
}

app.listen(3000, function () {
    console.log('App listening on port 3000');
});


// pour tester -> node main.js