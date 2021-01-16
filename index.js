var listeJoueur = [];

function ajoutjoueur(){
	var lejoueur = document.getElementById("nomJoueur").value;
	unique(lejoueur);

	console.log(listeJoueur);
}

function unique(joueur){
	console.log(listeJoueur.indexOf(joueur));
	if (listeJoueur.indexOf(joueur) != -1) {
		alert("le joueur : ",joueur ," a deja ete ajouter")
	}else {
		listeJoueur.push(joueur);
	}
}




console.log('hey');
