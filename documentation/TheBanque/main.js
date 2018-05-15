/*
 * Librairies utilisées
 */
var banque = require('./librairiesServer/banque');
var bodyParser = require('body-parser');
var express = require('express');

/*
 * Création et configuration de l'application express
 */
var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/appliCliente'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

/*
 * Fonctions utilitaires
 */

//Converti une chaine de caractère en nombre flottant correspondant à une somme monétaire
//Retourne la somme ou NaN (not a number) si la somme est négative ou invalide
function convertirSomme(chaineSomme) {
    var somme = parseFloat(chaineSomme);
    return isNaN(somme) || somme < 0. ? NaN() : somme;
}

/*
 * Mise en place des services REST proposées par notre appli serveur
 */

//Obtention de la position d'un compte
app.get('/api/comptes/:id', function (req, res) {
    var position = banque.positionDuCompte(req.params.id);
    if (typeof position.somme === 'undefined') {
        res.status(404).json({monErreur: `Le compte d'id ${req.params.id} n'existe pas.`});
    } else {
        res.json(position);
    }
});

//Création d'un compte (identifiant fourni à la création)
app.post('/api/comptes/:id', function (req, res) {
    var s = convertirSomme(req.body.somme);
    if (isNaN(s)) {
        res.status(400).json({monErreur: `la somme ${req.body.somme} est invalide`});
    } else {
        if (!banque.creerCompte(req.params.id, s)) {
            res.status(409).json({monErreur: `Le compte d'id ${req.params.id} existe déjà.`});
        } else {
            //Ressource créé : on renvoit l'état de la ressource (cad ici sa position)
            res.status(201).json(banque.positionDuCompte(req.params.id));
        }
    }
});

//Effectue un retrait sur un compte
app.post('/api/comptes/:id/retraits', function (req, res) {
    var s = convertirSomme(req.body.somme);
    if (isNaN(s)) {
        res.status(400).json({monErreur: `la somme ${req.body.somme} est invalide`});
    } else {
        if (!banque.retirerDuCompte(req.params.id, s)) {
            res.status(409).json({monErreur: `Le compte d'id ${req.params.id} n'existe pas.`});
        } else {
            //Ressource créée : on rencoit l'état de la ressource (on se contente de renvoyer ici le retrait)
            res.status(201).json(req.body);
        }
    }
});

//Effectue un ajout (dépôt) sur un compte
app.post('/api/comptes/:id/ajouts', function (req, res) {
    var s = convertirSomme(req.body.somme);
    if (isNaN(s)) {
        res.status(400).json({monErreur: `la somme ${req.body.somme} est invalide`});
    } else {
        if (!banque.ajouterAuCompte(req.params.id, s)) {
            res.status(409).json({monErreur: `Le compte d'id ${req.params.id} n'existe pas.`});
        } else {
            //Ressource créée : on rencoit l'état de la ressource (on se contente de renvoyer ici l'ajout)
            res.status(201).json(req.body);
        }
    }
});

/*
 * Mise en écoute du serveur sur le port 3000
 */
app.listen(3000, function () {
    console.log('Banque app listening on port 3000!');
});