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
