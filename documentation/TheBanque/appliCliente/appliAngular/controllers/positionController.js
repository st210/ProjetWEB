/*
 * Ajout d'un controlleur positionCtrl au module myBanqueApp. Le module myBanqueApp doit avoir été créé précédemment (cf commentaire sur index.html)
 */
angular.module('myBanqueApp')
        .controller('positionCtrl', ["$scope", "CompteFactory", function ($scope, CptFacto) { //Injection du $scope mais également de notre service CompteFactory
                //Fonction "publique" d'obtention de la position du compte
                $scope.obtenirPosition = function () {
                    //Supprime l'ancienne position et l'ancien message d'erreur si présent
                    delete $scope.position;
                    delete $scope.erreur;
                    //Récupère la position du compte en indiquant l'id du compte pour paramétrer l'url
                    $scope.position = CptFacto.Compte.get({id: $scope.id}, function () {
                        //position récupérée
                        //ici rien à faire
                    }, function (err) {
                        //une erreur est survenue : on supprime l'objet position créé
                        console.log($scope.position);
                        //Si le code de retour est un de node code géré, on affichera le message d'erreur personnalisé
                        if (err.status === 404) {
                            $scope.erreur = err.data.monErreur;
                        } else {
                            //Si le code est autre, on affichera le message par défaut avec le numéro du code erreur
                            $scope.erreur = err.statusText + ' (' + err.status + ')';
                        }
                    });
                };
            }]);