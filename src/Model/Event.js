var listeParticipants = {};
var listeEvents = {};
var boolean

// Constructeur pour la Gestion d'events
// à compléter
function Event(id, acronym, name, place, desc, dateDeb, dateFin, nbMax, typePart){
    this.acronym = acronym;
    this.name = name;
    this.place = place;
    this.desc = desc;
    this.dateDeb = new Date();
    this.dateFin = new Date();
    this.nbMax = nbMax;
    this.typePart = typePart;
}

// affiche les events
// add new event
var createEvent = function(id, acronym, name, place, desc, dateDeb, dateFin, nbMax, typePart){
    if (typeof listeEvents[id] === 'undefined'){
        listeEvents[id] = new Event(id, acronym, name, place, desc, dateDeb, dateFin, nbMax, typePart);
        console.log(listeEvents);
        return 0;
    }
    return 1;
}

// modifier event
// supprimer event
// add new participant (host) à event + tous ses accompagnants
// -> tout mettre dans listeParticipants si assez de place

