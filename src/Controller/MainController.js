var myApp = angular.module('app', []).controller('ControllerWEB', function ($scope, $http) {

    $scope.creerEvent = function(){
        console.log($scope.Events);

        // Objet JSON Event
        var event = {};
        event.idE = $scope.Event.idE;
        event.acronym = $scope.Event.acronym;
        event.name = $scope.Event.name;
        event.place = $scope.Event.place;
        event.desc = $scope.Event.desc;
        event.dateDeb = $scope.Event.dateDeb;
        event.dateFin = $scope.Event.dateFin;
        event.nbMax = $scope.Event.nbMax;
        event.typePart = $scope.Event.typePart;

        var jsonEvent = JSON.stringify(event);

        $http.post("/saveEvent", jsonEvent);

        window.location.href = "/create-evenement.html";
    };

    $scope.getAllEvents = function() {
        $http.get("/getAllEvents",).then(function (response) {
            $scope.events = response.data;
        });
    }

    $scope.getEventById = function(idE) {
        var jsonEvent = JSON.stringify({idE: idE});

        $http.post("/getEventById",jsonEvent).then(function (response) {
            $scope.event = response.data;
        });
    }

    $scope.deleteEventById = function(idE) {
        var jsonEvent = JSON.stringify({idE: idE});

        $http.post("/deleteEventById",jsonEvent).then(function (response) {
            $scope.event = response.data;
        });

        window.location.href = "evenements.html";
    }
});