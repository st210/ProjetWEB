/** LAUNCH APP **/
var express = require('express'),
        app = express(),
        port = parseInt(process.env.PORT, 10) || 8080;

var bodyParser = require('body-parser');

app.use(express.static((__dirname)));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, function () {
    console.log('App listening on port ' + port);
});

/** MONGOOSE BD **/
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connexion à MongoDB
var promise = mongoose.connect('mongodb://admin:admin@ds235180.mlab.com:35180/bd-evenements')
        .then(() => console.log('Connection at mongoDB successful'))
        .catch((err) => console.error(err));

var bd = mongoose.connection;

// Collection Event
var EVENT_COLLECTION = "Events";

// Schema Event
var eventSchema = mongoose.Schema({
    idE: Number,
    acronym: String,
    name: String,
    place: String,
    desc: String,
    dateDeb: String,
    dateFin: String,
    nbMax: Number,
    typePart: String
});

var eventModel = mongoose.model(EVENT_COLLECTION, eventSchema);

app.post('/saveEvent', function(req,res){
    var event = new eventModel({
        idE: req.body.idE,
        acronym: req.body.acronym,
        name: req.body.name,
        place: req.body.place,
        desc: req.body.desc,
        dateDeb: req.body.dateDeb,
        dateFin: req.body.dateFin,
        nbMax: req.body.nbMax,
        typePart: req.body.typePart
    });

    bd.collection(EVENT_COLLECTION).save(event, function(err, result) {
        if (err) {
          handleError(res, err.message, "Erreur. Impossible de créer un nouvel évènement.");
        } else {
          res.send(result);
        }
    });

    // nettoyage mémoire mongoose
    delete mongoose.models.eventModel;
    delete mongoose.models.event;
    delete mongoose.modelSchemas.eventSchema;

    // enregistrement instantanné
    mongoose.Promise._asap;
});

app.get('/getAllEvents', function(req,res){
    bd.collection(EVENT_COLLECTION).find({}).toArray(function(err, result) {
        if (err) {
          handleError(res, err.message, "Erreur. Cet event n'existe pas.");
        } else {
          res.send(result);
        }
      });
});

app.post('/getEventById', function(req,res){
    bd.collection(EVENT_COLLECTION).findOne({"idE": req.body.idE}, function(err, result) {
        if (err) {
          handleError(res, err.message, "Erreur. Cet event n'existe pas.");
        } else {
          res.send(result);
        }
      });
});

app.post('/deleteEventById', function(req,res){
    bd.collection(EVENT_COLLECTION).remove({"idE": req.body.idE}, function(err, result) {
        if (err) {
          handleError(res, err.message, "Erreur. Impossible de supprimer l'évènement.");
        } else {
          res.send(result);
        }
    });

    // enregistrement instantanné
    mongoose.Promise._asap;
});

// export
module.exports = app;