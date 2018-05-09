var listeGuests = {};

// Constructeur pour un Participant (non accompagnateur)
// à compléter
function Participant(id, name, firstname, mail, phone){
    this.id = id;
    this.name = name;
    this.firstname = firstname;
    this.mail = mail;
    this.phone = phone;
    this.listFollowers = {};
}

// add new Guest
var addGuest = function(idP) {
	// s'il n'existe pas
	if (typeof listeGuest[idP] === 'undefined') {
		// on le cree
		listeComptes[id] = new Compte(id, somme);
		//console.log(listeComptes);
		return 1;
    }
    return 0;
}

// modifier Guest
// supprimer Guest