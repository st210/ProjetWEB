var eventList = {};

var event = require('./Model/Event');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/bower_components', express.static(__dirname + '/bower_components'));

// Services REST

app.get('/api', function (req, res) {
    res.send('Bienvenue dans la gestion d\'events!');
});

app.get('/api/event/get/:idE', function (req, res){
    var idE = req.params.idE;
    if (isNaN(idE)){
        res.status(400).json({error: `Event ${idE} invalide.`});
    } else {
        if (!listeEvents){
            res.status(400).json({error: `Event ${req.params.idE} inexistant.`});
        } else if (!Event.createEvent(idE, "test", "test", "test", "test", "test", "test", 2, "test")){
            res.status(409).json({error: `Event ${req.params.idE} déjà existant.`});
        } else {
            res.status(201).json(req.body);
        }
    }
});

app.get('/api/event', function (req, res){
    res.json({message: "Liste test event: ",
              idE: req.query.idE,
              acronym: req.query.acronym,
              name: req.query.name,
              place: req.query.place,
              desc: req.query.desc,
              dateDeb: req.query.dateDeb,
              dateFin: req.query.dateFin,
              nbMax: req.query.nbMax,
              typePart: req.query.typePart});
});

// appel test url: http://localhost:3000/api/event?idE=1&acronym=L3&name=test&place=test&desc=test&dateDeb=test&dateFin=test&nbMax=2&typePart=test
app.post('/api/event', function (req, res){
    var event = new Event();
    event.idE = req.body.idE;
    event.acronym = req.body.acronym;
    event.name = req.body.name;
    event.place = req.body.place;
    event.desc = req.body.desc;
    event.dateDeb = req.body.dateDeb;
    event.dateFin = req.body.dateFin;
    event.nbMax = req.body.nbMax;
    event.typePart = req.body.typePart;
});

app.listen(3000, function () {
    console.log('App listening on port 3000');
});


// pour tester -> node main.js