/**** Base de données ****/

var hostname = 'localhost';
var port = 3000;
var mongoose = require('mongoose');

// Options recommandées par mLab pour une connexion à la base
var options = { keepAlive: 300000, connectTimeoutMS: 30000 };

// URL de la base de données
var urlmongo = "mongodb://admin:admin@ds235180.mlab.com:35180/bd-evenements";

// Connexion de l'API à notre base de données
mongoose.connect(urlmongo, options);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
db.once('open', function (){
    console.log("Connexion à la base OK");
});


/**** Variables (code/exécution) ****/

var eventList = {};
var event = require('./Model/Event');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/css', express.static('View/assets/vendor/bootstrap/css/bootstrap.css'));
app.use('/css', express.static('View/assets/vendor/metisMenu/metisMenu.min.css'));
app.use('/css', express.static('View/assets/dist/css/sb-admin-2.css'));
app.use('/css', express.static('View/assets/vendor/morrisjs/morris.css'));
app.use('/css', express.static('View/assets/vendor/font-awesome/css/font-awesome.min.css'));
app.use(function(req,res){
    res.sendFile(__dirname + '/View/index.html')
});

var ObjectID = mongoose.ObjectID;
var EVENT_COLLECTION = "events";

//Activer CORS: permet request entre multiples hotes localhost
app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
 next();
});



/**** Entités ****/

// Pour modéliser les données, le framework mongoose utilise des "schémas"
var eventSchema = mongoose.Schema({
    idE: Number,
    acronym: String,
    name: String,
    place: String,
    desc: String,
    dateDeb: Date,
    dateFin: Date,
    nbMax: Number,
    typePart: String
});

var event = mongoose.model('Event', eventSchema);

/**** Services REST ****/

app.get('/api', function (req, res) {
    res.send('Bienvenue dans la gestion d\'events!');
});

app.get('/api', function(req, res) {
    Event.find(function(err, events){
        if (err){
            res.send(err);
        }
        res.json(events);
    });
});

app.post('/api', function(req,res){
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

      event.save(function(err){
        if(err){
          res.send(err);
        }
        res.send({message : 'L\'évènement a bien été enregistré!'});
      })
});


// find an event by id
app.get('/api/event/:idE', function (req, res){
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

// update an event by id
//app.put('/api/event/get/:idE', function (req, res){});

// delete an event by id
//app.delete('/api/event/get/:idE', function (req, res){});

// find all events
app.get('/api/event', function (req, res){
    db.collection(EVENT_COLLECTION).find({}).toArray(function(err, docs) {
        if (err) {
          handleError(res, err.message, "Failed to get events.");
        } else {
          res.status(200).json(docs);
        }
     });
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

// create a new event
app.post("/api/event", function(req, res) {
  var newEvent = req.body;
  newEvent.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Saisie invalide.", "Vous devez entrer un nom.", 400);
  }

  db.collection(EVENT_COLLECTION).insertOne(newEvent, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Erreur. Impossible de créer un nouvel évènement.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});


// appel test url: http://localhost:3000/api/event?idE=1&acronym=L3&name=test&place=test&desc=test&dateDeb=test&dateFin=test&nbMax=2&typePart=test
/* ancien post: créé event et permet affichage json via get (lien au dessus)
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
});*/

app.listen(3000, function () {
    console.log('App listening on port 3000');
});


// pour tester -> node main.js