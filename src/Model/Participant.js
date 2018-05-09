/** PARTICIPANT **/
// Constructeur pour un Participant (non accompagnateur)
function Participant(id, name, firstname, mail, phone){
    this.id = id;
    this.name = name;
    this.firstname = firstname;
    this.mail = mail;
    this.phone = phone;
    this.listGuests = {};
}

/** GUEST **/
// Constructeur pour un Accompagnateur
function Guest(id, name, firstname, mail, phone){
    this.id = id;
    this.name = name;
    this.firstname = firstname;
    this.mail = mail;
    this.phone = phone;
}

// add new Guest
var addGuest = function(id) {
	// s'il n'existe pas
	if (typeof listGuests[id] === 'undefined') {
		// on le cree
		listGuests[id] = new Guest(id);
		//console.log(listeComptes);
		return 1;
    }
    return 0;
}

// modifier Guest
// supprimer Guest