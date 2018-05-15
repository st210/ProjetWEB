var listeParticipants = {};
var listeEvents = {};

// Constructeur d'un Event
function Event(idE, acronym, name, place, desc, dateDeb, dateFin, nbMax, typePart){
    this.idE = idE;
    this.acronym = acronym;
    this.name = name;
    this.place = place;
    this.desc = desc;
    this.dateDeb = dateDeb;
    this.dateFin = dateFin;
    this.nbMax = nbMax;
    this.typePart = typePart;
}

// affiche les events
// add new event
var createEvent = function(idE, acronym, name, place, desc, dateDeb, dateFin, nbMax, typePart){
    if (typeof listeEvents[idE] === 'undefined'){
        listeEvents[idE] = new Event(idE, acronym, name, place, desc, dateDeb, dateFin, nbMax, typePart);
        console.log(listeEvents);
        return 0;
    }
    return 1;
}

// modifier event
// supprimer event
// add new participant (host) à event + tous ses accompagnants
//      -> tout mettre dans listeParticipants si assez de place

exports.createEvent = createEvent;