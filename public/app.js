/********* CONFIG APP *********/
var express = require('express'),
    app = express(),
    port = parseInt(process.env.PORT, 10) || 8080;

var bodyParser = require('body-parser');

app.use(express.static((__dirname)));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.listen(port, function () {
    console.log('App listening on port ' + port);
});


/********* MONGOOSE DATABASE *********/
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connexion à MongoDB
var promise = mongoose.connect('mongodb://admin:admin@ds235180.mlab.com:35180/bd-evenements');

var bd = mongoose.connection;


/********* EVENT *********/
// Collection Event
var EVENT_COLLECTION = "Events";

// Schema Event
var eventSchema = mongoose.Schema({
    acronym: String,
    name: String,
    place: String,
    desc: String,
    dateDeb: String,
    dateFin: String,
    nbMax: Number,
    typePart: Array,
    nbPeople: Number
});

var eventModel = mongoose.model(EVENT_COLLECTION, eventSchema);

app.post('/saveEvent', function (req, res) {
    var event = new eventModel({
        acronym: req.body.acronym,
        name: req.body.name,
        place: req.body.place,
        desc: req.body.desc,
        dateDeb: req.body.dateDeb,
        dateFin: req.body.dateFin,
        nbMax: req.body.nbMax,
        typePart: req.body.typePart,
        nbPeople: req.body.nbPeople
    });

    bd.collection(EVENT_COLLECTION).save(event, function (err, result) {
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

app.get('/getAllEvents', function (req, res) {
    bd.collection(EVENT_COLLECTION).find({}).toArray(function (err, result) {
        if (err) {
            handleError(res, err.message, "Erreur. Cet event n'existe pas.");
        } else {
            res.send(result);
        }
    });
});

app.get('/getEventById', function (req, res) {
    bd.collection(EVENT_COLLECTION).findOne({"acronym": req.body.acronym}, function (err, result) {
        if (err) {
            handleError(res, err.message, "Erreur. Cet event n'existe pas.");
        } else {
            res.send(result);
        }
    });
});

app.post('/deleteEventById', function (req, res) {
    bd.collection(EVENT_COLLECTION).remove({"acronym": req.body.acronym}, function (err, result) {
        if (err) {
            handleError(res, err.message, "Erreur. Impossible de supprimer l'évènement.");
        } else {
            res.send(result);
        }
    });
    // enregistrement instantanné
    mongoose.Promise._asap;
});


/********* PARTICIPANT *********/
// Collection Participants
var PART_COLLECTION = "Participants";

// Schema Participant
var participantSchema = mongoose.Schema({
    idPart: Number,
    firstname: String,
    lastname: String,
    mail: String,
    phone: String,
    workplace: String,
    typePart: String,
    listGuest: Array
});

var participantModel = mongoose.model(PART_COLLECTION, participantSchema);

app.post('/savePart', function (req, res) {
    var part = new participantModel({
        idPart: req.body.idPart,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        mail: req.body.mail,
        phone: req.body.phone,
        workplace: req.body.workplace,
        typePart: req.body.typePart,
        listGuest: req.body.listGuest
    });

    bd.collection(PART_COLLECTION).save(part, function (err, result) {
        if (err) {
            handleError(res, err.message, "Erreur. Impossible de créer un nouveau participant.");
        } else {
            res.send(result);
        }
    });

    // nettoyage mémoire mongoose
    delete mongoose.models.participantModel;
    delete mongoose.models.part;
    delete mongoose.modelSchemas.participantSchema;

    // enregistrement instantanné
    mongoose.Promise._asap;
});

app.get('/getAllParticipants', function (req, res) {
    bd.collection(PART_COLLECTION).find({}).toArray(function (err, result) {
       if (err) {
           handleError(res, err.message, "Erreur. Ce participant n'existe pas.");
       } else {
           res.send(result);
       }
    });
});

app.get('/getPartById', function (req, res) {
    bd.collection(PART_COLLECTION).findOne({"idPart": req.body.idPart}, function (err, result) {
        if (err) {
            handleError(res, err.message, "Erreur. Ce participant n'existe pas.");
        } else {
            console.log(result);
            res.send(result);
        }
    });
});

app.post('/deletePartById', function (req, res) {
    bd.collection(PART_COLLECTION).findOne({"idPart": req.body.idPart}, function (err, result) {
        if (err) {
            handleError(res, err.message, "Erreur. Impossible de supprimer le participant.");
        } else {
            res.send(result);
        }
    });
    // enregistrement instantanné
    mongoose.Promise._asap;
});


/********* GUEST *********/
// Collection Invites
var GUEST_COLLECTION = "Invites";

// Schema Invite
var guestSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    mail: String,
    phone: String,
    workplace: String
});

var guestModel = mongoose.model(GUEST_COLLECTION, guestSchema);

app.post('/saveGuest', function (req, res) {
    var guest = new guestModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        mail: req.body.mail,
        phone: req.body.phone,
        workplace: req.body.workplace
    });

    bd.collection(GUEST_COLLECTION).save(guest, function (err, result) {
        if (err) {
            handleError(res, err.message, "Erreur. Impossible de créer un nouvel invité.");
        } else {
            res.send(result);
        }
    });

    // nettoyage mémoire mongoose
    delete mongoose.models.guestModel;
    delete mongoose.models.guest;
    delete mongoose.modelSchemas.guestSchema;

    // enregistrement instantanné
    mongoose.Promise._asap;
});


/********* TYPE PARTICIPANT *********/
// Collection Type Participant
var TYPEPART_COLLECTION = "TypeParticipants";

// Schema Event
var typePartSchema = mongoose.Schema({
    intitule: String,
    nbMax: Number
});

var typePartModel = mongoose.model(TYPEPART_COLLECTION, typePartSchema);

app.post('/saveTypePart', function (req, res) {
    var typePart = new typePartModel({
        intitule: req.body.intitule,
        nbMax: req.body.nbMax
    });

    bd.collection(TYPEPART_COLLECTION).save(typePart, function (err, result) {
        if (err) {
            handleError(res, err.message, "Erreur. Impossible de créer un nouveau type de Participant.");
        } else {
            res.send(result);
        }
    });

    // nettoyage mémoire mongoose
    delete mongoose.models.typePartModel;
    delete mongoose.models.typePart;
    delete mongoose.modelSchemas.typePartSchema;

    // enregistrement instantanné
    mongoose.Promise._asap;
});


/********* USER *********/
// Collection Users
var USER_COLLECTION = "Users";

// Schema Participant
var participantSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    mail: String,
    phone: String,
    workplace: String,
    typePart: String,
    listGuest: Array
});

var participantModel = mongoose.model(USER_COLLECTION, participantSchema);

app.post('/savePart', function (req, res) {
    var part = new participantModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        mail: req.body.mail,
        phone: req.body.phone,
        workplace: req.body.workplace,
        typePart: req.body.typePart,
        listGuest: req.body.listGuest
    });

    bd.collection(PART_COLLECTION).save(part, function (err, result) {
        if (err) {
            handleError(res, err.message, "Erreur. Impossible de créer un nouveau participant.");
        } else {
            res.send(result);
        }
    });

    // nettoyage mémoire mongoose
    delete mongoose.models.participantModel;
    delete mongoose.models.part;
    delete mongoose.modelSchemas.participantSchema;

    // enregistrement instantanné
    mongoose.Promise._asap;
});


/********* TYPE USER *********/
// Collection Type User
var TYPEUSER_COLLECTION = "TypeUser";

// Schema Event
var typeUserSchema = mongoose.Schema({
    id: Number,
    name: String
});

var typeUserModel = mongoose.model(TYPEUSER_COLLECTION, typeUserSchema);

app.post('/saveTypeUser', function (req, res) {
    var typePart = new eventModel({
        intitule: req.body.intitule,
        nbMax: req.body.nbMax
    });

    bd.collection(TYPEUSER_COLLECTION).save(typeUser, function (err, result) {
        if (err) {
            handleError(res, err.message, "Erreur. Impossible de créer un nouveau type d'utilisateur.");
        } else {
            res.send(result);
        }
    });

    // nettoyage mémoire mongoose
    delete mongoose.models.typeUserModel;
    delete mongoose.models.typeUser;
    delete mongoose.modelSchemas.typeUserSchema;

    // enregistrement instantanné
    mongoose.Promise._asap;
});


/********* EXPORT APP *********/
module.exports = app;