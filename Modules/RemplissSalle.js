const Salle = require('../objets/Salle');
const UE = require('../objets/UE');


class RemplissSalle {
    constructor(liste_UE) {
        this.liste_salle = new Array(); // liste_salle est un tableau de Salle
        this.liste_UE = liste_UE;
    }

    // Parcourt la liste des Unités d'Enseignement (UE) et leurs sessions
    // Appelle la fonction Ajout_ToList pour ajouter les sessions à la liste des salles
    remplirSalles() {
          this.liste_UE.forEach(UE => {
            console.log(this.liste_UE);
            let sessions = UE.get_liste_Session();
            sessions.forEach(session => {
                //console.log(session.toString());
                this.ajout_ToList(session);
            })
        });
        return this.liste_salle;
    }

    // Recherche l'index d'une salle dans la liste des salles en fonction de son emplacement
    // Retourne -1 si la salle n'est pas trouvée
    trouverIndexSalle(emplacement) {
        console.log(this.liste_UE);
        let ind = -1;
        for (let i = 0; i < this.liste_salle.length; i++) {
            if (this.liste_salle[i].getSalle() === emplacement) {
                ind = i;
                break;
            }
            }
            return ind;
        }

    // Ajoute une session à la liste des salles
    // Si la salle existe déjà, met à jour la capacité de la salle existante.
    // Sinon, crée une nouvelle salle avec les informations de la session.
    ajout_ToList(session) {
        const salleIndex = this.trouverIndexSalle(session.get_Salle());

         if (salleIndex === -1) {
            // La salle n'existe pas, création d'une nouvelle salle
            const nouvelleSalle = new Salle(session.get_Salle(), session.get_NbPlaces());
            nouvelleSalle.Ajout_session(session);
            this.liste_salle.push(nouvelleSalle);
        } else {
            // La salle existe déjà, mise à jour de la capacité
            this.liste_salle[salleIndex].setNbPlaces(session.get_NbPlaces());
            this.liste_salle[salleIndex].Ajout_session(session);
        }
    }
}

module.exports = RemplissSalle;
