var myApp = angular.module('app', []).controller('ControllerWEB', function ($scope, $http) {

    /******* EVENT *******/
    $scope.creerEvent = function () {
        console.log($scope.Events);

        // Objet JSON Event
        var event = {};
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

        // Ajouter un Type de Participant
        var typePart = {};
        typePart.intitule = $scope.TypePart.intitule;
        typePart.nbMax = $scope.TypePart.nbMax;

        jsonEvent = JSON.stringify(typePart);
        $http.post("/saveTypePart", jsonEvent);

        // Rediriger la page après traitement
        window.location.href = "/index.html";
    };

    $scope.getAllEvents = function () {
        $http.get("/getAllEvents",).then(function (response) {
            $scope.events = response.data;
        });
    };

    $scope.getEventById = function (acronym) {
        var jsonEvent = JSON.stringify({acronym: acronym});

        $http.get("/getEventById", jsonEvent).then(function (response) {
            $scope.event = response.data;
        });
    };

    $scope.deleteEventById = function (acronym) {
        var jsonEvent = JSON.stringify({acronym: acronym});

        $http.post("/deleteEventById", jsonEvent).then(function (response) {
            $scope.event = response.data;
        });

        window.location.href = "/View/evenements.html";
    }

    $scope.goSeeEvt = function (acronym) {
        window.location.replace("see-evenement.html?acronym=" + acronym);
    }

    $scope.getEventIdURL = function () {
        var GET = {};
        var query = window.location.search.substring(1).split("&");
        for (var i = 0, max = query.length; i < max; i++) {
            if (query[i] === "") // check for trailing & with no param
                continue;

            var param = query[i].split("=");
            GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");
        }
        return GET.acronym;
    }

    /******* PARTICIPANT *******/
    $scope.creerParticipant = function () {
        console.log($scope.Participants);

        // Objet JSON Participant
        var part = {};
        part.firstname = $scope.Part.firstname;
        part.lastname = $scope.Part.lastname;
        part.mail = $scope.Part.mail;
        part.phone = $scope.Part.phone;
        part.workplace =  $scope.Part.workplace;
        part.typePart = $scope.Part.typePart;
        part.listGuest = $scope.Part.listGuest;

        var jsonEvent = JSON.stringify(part);

        $http.post("/savePart", jsonEvent);

        window.location.href = "/index.html";
    };

    /******* GUEST *******/
    $scope.creerGuest = function () {
        console.log($scope.Guests);

        // Objet JSON Guest
        var guest = {};
        guest.firstname = $scope.Guest.firstname;
        guest.lastname = $scope.Guest.lastname;
        guest.mail = $scope.Guest.mail;
        guest.phone = $scope.Guest.phone;
        guest.workplace =  $scope.Guest.workplace;

        var jsonEvent = JSON.stringify(guest);

        $http.post("/saveGuest", jsonEvent);

        window.location.href = "/index.html";
    };
});