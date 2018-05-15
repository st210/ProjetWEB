/*
 * Ajout d'un controlleur operationCtrl au module myBanqueApp. Le module myBanqueApp doit avoir été créé précédemment (cf commentaire sur index.html)
 */
angular.module('myBanqueApp')
        .controller('operationCtrl', ["$scope", "CompteFactory", "typeOperation", function ($scope, CptFacto, typeOpt) { //Injection du $scope, de notre service CompteFactory, mais aussi de "typeOperation", injecté dans notre configuration de l'application (cf. app.js)
                //Fonction "publique" de réalisation de l'operation
                $scope.faireOperation = function () {
                    //positionnement de l'indicateur de traitement en cours
                    $scope.traitement = {termine: false};
                    //Création de l'operation (envoie d'un POST à l'URL de la ressource)
                    $scope.operation.$save(function () {
                        //Création OK, on indique que le traitement est terminée
                        $scope.traitement.termine = true;
                    }, function (err) {
                        //Une erreur est survenue, on indique que le traitement est terminée
                        $scope.traitement.termine = true;
                        //Si le code de retour est un de node code géré, on affichera le message d'erreur personnalisé
                        if (err.status === 400 || err.status === 409) {
                            $scope.traitement.erreur = err.data.monErreur;
                        } else {
                            //Si le code est autre, on affichera le message par défaut avec le numéro du code erreur
                            $scope.traitement.erreur = err.statusText + ' (' + err.status + ')';
                        }
                    });
                };

                //Initialisation des données du scope en fonction du type d'operation
                switch (typeOpt) {
                    case 'RETRAIT':
                        $scope.titre = "Retrait d'argent";
                        $scope.operation = new CptFacto.Retrait();
                        break;
                    case 'AJOUT':
                        $scope.titre = "Dépôt d'argent";
                        $scope.operation = new CptFacto.Ajout();
                        break;
                    default:
                        throw "Erreur, le type d'operation ne peut pas être '" + typeOpt + "'";
                }
                $scope.traitement = {termine: false}; //Mise en place de l'indicateur de traitement terminé
            }]);