/** PARTICIPANT **/
// Constructeur pour un Participant (non accompagnateur)
function Participant(idP, name, firstname, mail, phone){
    this.idP = idP;
    this.name = name;
    this.firstname = firstname;
    this.mail = mail;
    this.phone = phone;
    this.listGuests = {};
}

/** GUEST **/
// Constructeur pour un Accompagnateur
function Guest(idG, name, firstname, mail, phone){
    this.idG = idG;
    this.name = name;
    this.firstname = firstname;
    this.mail = mail;
    this.phone = phone;
}

// add new Guest
var addGuest = function(idG) {
	// s'il n'existe pas
	if (typeof listGuests[idG] === 'undefined') {
		// on le cree
		listGuests[idG] = new Guest(idG);
		//console.log(listeComptes);
		return 1;
    }
    return 0;
}

// modifier Guest
// supprimer Guest