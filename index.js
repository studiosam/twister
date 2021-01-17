var listeJoueur = [];
var listeMembre = ["Mains", "Pied"];
var listeCouleur = ["Vert","Jaune" ,"Bleu", "Rouge"]

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

function pageAjustement() {
	document.getElementById("information").remove();
	document.getElementById("listeDesJoueur").remove();
	//console.log(element);
	//element.style.visibility = "hidden";
	var couleur = document.getElementById("couleur");
	couleur.style.visibility = "visible";
	var parti = document.getElementById("parti");
	parti.style.visibility = "visible";
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
			element.style.backgroundColor = 'green';
			break;
		case "Jaune":
			element.style.backgroundColor = 'yellow';
			break;
		case "Bleu":
			element.style.backgroundColor = 'blue';
			break;
		case "Rouge":
			element.style.backgroundColor = 'red';
			break;
	}
}
function partiAleatoir () {
	var parti = listeMembre[nombreAleatoir(0,listeMembre.length)];
	var element = document.getElementById("afficherParti");
	switch (parti) {
		case "Mains":
			element.innerText  = "Mains";
			break;
		case "Pied":
			element.innerText = "Pied";
			break;
	}
	
}
function toursJoueur (tours) {
	var joueur = listeJoueur[tours%listeJoueur.length];
	return joueur;
}

function afficherLeJoueur (tours) {
	var nom = toursJoueur(tours);
	var element = document.getElementById("joueurs");
	element.innerHTML = nom;
}

function gettime () {
	var temps = 0;
	var element = document.getElementById("listetemps");
	temps = element.value*1000;
	if (element.value == "custom" || element.value == "manuelle") {
		temps=0;
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

function deroulementParti (tours) {
	couleurAleatoir();
	partiAleatoir();
	afficherLeJoueur(tours); 
}



function pausegame () {
	buttonPauseToStart()
}

var tours = 0;
var intervalJouer

function startgame (argument) {
	if (listeJoueur.length >= 2) {
		if (document.getElementById("information")) {
			pageAjustement();
		}
		var interval = gettime();
		tours++;


		if(argument=="start"){
			if (interval != 0) {
				
				buttonStartToPause();
				intervalJouer = setInterval(function(){
					tours++;
					deroulementParti(tours);
				}, interval);

			}else {
				deroulementParti(tours);
			}
		}else if (argument=="pause") {
			pausegame();
			clearInterval(intervalJouer);
				
		}

	}else {
		alert("Il te faut au moins deux joueurs !!");
	}
}