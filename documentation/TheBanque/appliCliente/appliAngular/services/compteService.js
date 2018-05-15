/*
 * Ajout d'un service CompteFactory au module myBanqueApp. Le module myBanqueApp doit avoir été créé précédemment (cf commentaire sur index.html)
 */
angular.module('myBanqueApp')
        .service('CompteFactory', ['$resource', function ($resource) { //Notre service dépend du service "$resrouce", fournit par le module ngResource
                //Notre service est un simple objet JS contenant 3 attributs : Compte, Retrait, Ajout
                //Chaque attribut est une "Resource" REST, configurée avec un URL particulière
                //On utilisera par la suite ces attributs comme des "classes", que l'on pourra :
                //  - instancier (new ...) pour créer de nouvelle ressource du type
                //  - manipuler en utilisant leurs méthodes pour aller chercher une/des ressource(s) (.get, .query), etc.
                return {
                    Compte: $resource('/api/comptes/:id', //URL de la ressource
                            {id: '@id'}, //Le paramètre 'id' de l'URL doit être trouvé dans l'instance de la ressource sous le nom 'id'
                            ),
                    Retrait: $resource('/api/comptes/:id/retraits', {id: '@id'}),
                    Ajout: $resource('/api/comptes/:id/ajouts', {id: '@id'})
                };
            }]);