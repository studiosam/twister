var listeJoueur = [];
var listeMembre = ["Mains", "Pied"];
var listeCouleur = ["Vert","Jaune" ,"Bleu", "Rouge"]

function ajoutjoueur(){
	var lejoueur = document.getElementById("nomJoueur").value;
	unique(lejoueur);

	console.log(listeJoueur);
}

function unique(joueur){
	console.log(listeJoueur.indexOf(joueur));
	if (listeJoueur.indexOf(joueur) != -1) {
		alert("Le joueur : "+joueur+" a deja ete ajouter")
	}else {
		listeJoueur.push(joueur);
		ajouterListe(joueur);
	}
}
function ajouterListe(nom){
	const listeElem = document.getElementById("listeDesJoueur")

	const element = document.createElement("li");
	const nouveaujoueur = document.createElement("h1");
	var valeurs = document.createTextNode(nom);
	nouveaujoueur.setAttribute("class", "nomDeJoueur");
	nouveaujoueur.appendChild(valeurs);
	element.appendChild(nouveaujoueur);
	listeElem.appendChild(element);

}
function ajouterTemps (valeur) {
	const listeElem = document.getElementById("custom");

	const nouveauTemps = document.createElement("option")

	var temps = document.createTextNode(valeur+" seconde");
	nouveauTemps.setAttribute("value", valeur);
	nouveauTemps.appendChild(temps);
	
	listeElem.parentNode.insertBefore(nouveauTemps, listeElem);
	nouveauTemps.selected = true;
}

function choixTemps(choix){
	var temps = 0;
	if (isNaN(parseInt(choix))) {
		if (choix=="custom") {
			do{
				temps = parseInt(prompt("Quels temps voulez-vous ? (en seconde)", "0"));
			}while (isNaN(temps));
			ajouterTemps(temps);
		}else {
			temps=0
		}
	}else {
		temps=choix;
	}

	/*switch (choix) {
		case 0:
			temps = 0;
			break;
		case 1:
			temps = 5;
			break;
		case 2:
			temps = 10;
			break;
		case 3:
			temps = 15;
			break;
		case 4:
			temps = 20;
			break;
		case 5:
			temps = 30;
			break;
		case 6:
			temps = 45;
			break;
		case 7:
			temps = 60;
			break;
		case 8:
			do{
				temps = parseInt(prompt("Quels temps voulez-vous ? (en seconde)", "0"));
			}while (isNaN(temps));
			ajouterTemps(temps);
			break;
		default :
			temps = 0;
			break;
	}
	*/
	console.log(temps);
}



console.log('hey');
