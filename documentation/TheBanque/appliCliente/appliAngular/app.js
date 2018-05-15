/*
 * Déclaration de notre module avec ces dépendances : ici on créé le module
 */
angular.module('myBanqueApp', ['ui.router', 'ngResource'])
        //Déclaration d'une configuration du module, utilisée pour mettre en place les routes vers les vues
        .config(["$stateProvider", "$urlServiceProvider", function ($stateProvider, $urlServiceProvider) {
                //Création des différents états de l'appli
                $stateProvider
                        .state('creation', {
                            url: '/creation-compte',
                            templateUrl: 'vues/creation.html',
                            controller: 'creationCtrl'
                        })
                        .state('position', {
                            url: '/position-compte',
                            templateUrl: 'vues/position.html',
                            controller: 'positionCtrl'
                        })
                        .state('operation', {
                            //Cet état est abstrait : il ne fourni pas de vue ni de controlleur, mais simplement une base d'URL
                            url: '/operation-compte',
                            abstract: true
                        })
                        .state('operation.retrait', {
                            //Cet état est un enfant de l'état 'Operation'. L'url sera donc ".../operation-compte/retrait".
                            url: '/retrait',
                            templateUrl: 'vues/operation.html',
                            controller: 'operationCtrl',
                            resolve: {//On injecte dans le controlleur une dépendance nommée "typeOperation" contenant la valeur "RETRAIT" (attention, une injection doit toujours etre écrite sous la forme d'une fonction à appeler qui retournera la valeur à injecter)
                                typeOperation: function () {
                                    return "RETRAIT";
                                }
                            }
                        })
                        .state('operation.ajout', {
                            url: '/ajout',
                            templateUrl: 'vues/operation.html',
                            controller: 'operationCtrl',
                            resolve: {
                                typeOperation: function () {
                                    return "AJOUT";
                                }
                            }
                        });
                //Pour tout autre route (url) qui ne correspondrait pas à un des états déclarés précédemment, on redirige vers l'état creation.
                $urlServiceProvider.rules.otherwise({state: 'creation'});
            }]);


