var listeJoueur = ["pat","sq"];
var listeMembre = ["Mains", "Pied"];
var listeCouleur = ["Vert","Jaune" ,"Bleu", "Rouge"]

var elementCreation= creationAjoutJoueur();
var elementList = creationListJoueur();
var plageJeux = creationPlageJeux();

var images = document.createElement("img");
images.setAttribute("id", "image");


function ajoutParRetours (touche) {
	if (event.key === "Enter") {
		ajoutjoueur();
	}
}
	
function ajoutjoueur(){
	var lejoueur = document.getElementById("nomJoueur").value;
	unique(lejoueur);
	document.getElementById('nomJoueur').value = '';
}

function unique(joueur){
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
	element.setAttribute("id", nom);
	const nouveaujoueur = document.createElement("h1");
	var valeurs = document.createTextNode(nom);
	nouveaujoueur.setAttribute("class", "nomDeJoueur");
	nouveaujoueur.appendChild(valeurs);

	var fermer = document.createElement("button");
	fermer.setAttribute("id", "fermer");
	fermer.setAttribute("value", nom);
	fermer.setAttribute("onclick", "tuJouePlus(this.value);");

	element.appendChild(fermer);
	element.appendChild(nouveaujoueur);
	listeElem.appendChild(element);

}

function tuJouePlus (joueur) {
	var suprimer = document.getElementById(joueur);
	suprimer.remove();

	for (var i = listeJoueur.length - 1; i >= 0; i--) {
		if (listeJoueur[i]==joueur){
			listeJoueur.splice(i, 1); 
		}
	}
	console.log(listeJoueur);
}


function ajouterTemps (valeur) {
	const listeElem = document.getElementById("custom");

	const nouveauTemps = document.createElement("option")

	var temps = document.createTextNode(tempsConversion(valeur));
	nouveauTemps.setAttribute("value", valeur);
	nouveauTemps.appendChild(temps);
	
	listeElem.parentNode.insertBefore(nouveauTemps, listeElem);
	nouveauTemps.selected = true;
}

function tempsConversion (temps) {
	var nouveaux = {}

	nouveaux.minute=(temps-temps%60)/60;
	nouveaux.seconde=temps%60;

	return nouveaux.minute+" minute "+nouveaux.seconde+" seconde";
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
	console.log(temps);
}

function nombreAleatoir (min, max) {
	var alea = min + Math.floor(Math.random()*(max-min));
	return alea;
}

function couleurAleatoir () {
	var couleur = listeCouleur[nombreAleatoir(0,listeCouleur.length)];
	var element = document.getElementById("couleur");
	switch (couleur) {
		case "Vert":
			plageJeux.style.backgroundColor = 'green';
			break;
		case "Jaune":
			plageJeux.style.backgroundColor = 'yellow';
			break;
		case "Bleu":
			plageJeux.style.backgroundColor = 'blue';
			break;
		case "Rouge":
			plageJeux.style.backgroundColor = 'red';
			break;
	}
}
function partiAleatoir () {
	var parti = listeMembre[nombreAleatoir(0,listeMembre.length)];
	var element = document.getElementById("plagejeux");

	switch (parti) {
		case "Mains":
			images.setAttribute("src", "./main.png");
			break;
		case "Pied":
			images.setAttribute("src", "./pied.png");
			break;
	}
	element.appendChild(images);
	
}
function toursJoueur (tours) {
	var joueur = listeJoueur[tours%listeJoueur.length];
	return joueur;
}

function afficherLeJoueur (tours) {
	var nom = toursJoueur(tours);
	var element = document.getElementById("resultat");
	element.innerHTML = nom;
}

function gettime () {
	var temps = 0;
	var element = document.getElementById("listetemps");
	temps = element.value*1000;
	if (element.value == "custom") {
		temps=0;
	}else if (element.value == "manuelle") {
		temps="manuelle";
	}
	return temps;
}

function buttonStartToPause () {
	var playPause = document.getElementById("start");
	playPause.style.backgroundColor = '#d84949';
	playPause.innerHTML = "Pause";
	playPause.value = "pause";
}

function buttonPauseToStart () {
	var playPause = document.getElementById("start");
	playPause.style.backgroundColor = '#4CAF50';
	playPause.innerHTML = "Start";
	playPause.value = "start";
}

function deroulementParti () {
	couleurAleatoir();
	partiAleatoir();
	afficherLeJoueur(tours);
	tours++;
}



function pausegame () {
	var page = document.getElementById('body');

	buttonPauseToStart();

	plageJeux.remove();
	page.appendChild(elementCreation);
	page.appendChild(elementList);

}

var tours = 0;
var intervalJouer;

function startgame (argument) {
	if (listeJoueur.length >= 2) {
		if (document.getElementById("information")) {
			pageAjustement();
		}
		var interval = gettime();
		


		if(argument=="start"){
			buttonStartToPause();
			if (interval == 0 || interval=="manuelle") {
				deroulementParti();
			}else {
				intervalJouer = setInterval(function(){
					deroulementParti();
				}, interval);
			}
		}else if (argument=="pause") {
			pausegame();
			clearInterval(intervalJouer);
				
		}

	}else {
		alert("Il te faut au moins deux joueurs !!");
	}
}

function pageAjustement() {
	var page = document.getElementById('body');

	elementCreation.remove();
	elementList.remove();
	page.appendChild(plageJeux);

}
/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////

function creationAjoutJoueur () {
	var div = document.createElement("div");
	div.setAttribute("class", "menu");
	div.setAttribute("id", "information");

	var input = document.createElement("input");
	input.setAttribute("type", "text");
	input.setAttribute("id", "nomJoueur");
	input.setAttribute("placeholder", "Rentrer le prenon des joueurs");
	input.setAttribute("name", "fname");
	input.setAttribute("onkeypress", "ajoutParRetours(event);");

	var button = document.createElement("button");
	button.setAttribute("id", "ajouter");
	button.setAttribute("onclick", "ajoutjoueur();");
	var textbutton = document.createTextNode("Ajouter");
	button.appendChild(textbutton);

	div.appendChild(input);
	div.appendChild(button);

	return div;
}

function creationListJoueur () {
	var div = document.createElement("div");
	div.setAttribute("class", "menu");
	div.setAttribute("id", "divListeJoueur")

	var header1 = document.createElement("h1");
	header1.setAttribute("id", "joueurs");
	var textHeader = document.createTextNode("Liste des joueurs :");
	header1.appendChild(textHeader);

	var ul = document.createElement("ul");
	ul.setAttribute("id", "listeDesJoueur");

	div.appendChild(header1);
	div.appendChild(ul);

	setTimeout(function(){
		creationUiList();
	}, 1600);
	

	return div;
}

function creationUiList () {

	var lis = document.getElementById("listeDesJoueur");


	for (var i = listeJoueur.length - 1; i >= 0; i--) {
		var element = document.createElement("li");
		element.setAttribute("id", listeJoueur[i]);
		const header = document.createElement("h1");
		var valeurs = document.createTextNode(listeJoueur[i]);
		header.setAttribute("class", "nomDeJoueur");
		header.appendChild(valeurs);
		
		var fermer = document.createElement("button");
		fermer.setAttribute("id", "fermer");
		fermer.setAttribute("value", listeJoueur[i]);
		fermer.setAttribute("onclick", "tuJouePlus(this.value);")
		element.appendChild(fermer);

		element.appendChild(header);
		lis.appendChild(element);


	}
}

function creationPlageJeux() {
	var div = document.createElement("div");
	div.setAttribute("id", "plagejeux");
	div.setAttribute("onclick", "deroulementParti();")

	var resultatHeader = document.createElement("h1");
	resultatHeader.setAttribute("id", "resultat");
	

	div.appendChild(resultatHeader);
	console.log(div);

	return div;
}




function pageJoueur () {
	var page = document.getElementById('body');	

	page.appendChild(elementCreation);
	page.appendChild(elementList);


	//var valeurs = document.createTextNode(nom);


}

setTimeout(function(){
	pageJoueur();
}, 1000);
