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
		alert("Ce joueur a deja ete ajouter")
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
	nouveaujoueur.setAttribute("class", "nomDeJoueur")
	nouveaujoueur.appendChild(valeurs);
	element.appendChild(nouveaujoueur);
	listeElem.appendChild(element);

}



console.log('hey');
