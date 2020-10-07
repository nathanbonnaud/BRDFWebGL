/* boutons controle de la caméra ou de la lumière*/
var controleCamera = true;
var controleLumiere = false;
var spanDeplacementCamera = document.getElementById("deplacementCamera");
var spanDeplacementLumiere = document.getElementById("deplacementLumiere");

//clique sur le span caméra
spanDeplacementCamera.onclick = function (){
    controleCamera = true;
    controleLumiere = false;

    spanDeplacementCamera.style.boxShadow = "1px 2px";
    spanDeplacementCamera.style.backgroundColor = "yellow";
    spanDeplacementLumiere.style.boxShadow = "3px 4px";
    spanDeplacementLumiere.style.backgroundColor = "whitesmoke";
}

//clique sur le span lumière
spanDeplacementLumiere.onclick = function (){
    controleCamera = false;
    controleLumiere = true;

    spanDeplacementLumiere.style.boxShadow = "1px 2px";
    spanDeplacementLumiere.style.backgroundColor = "yellow";
    spanDeplacementCamera.style.boxShadow = "3px 4px";
    spanDeplacementCamera.style.backgroundColor = "whitesmoke";
}

//Lumière
/* slider "Intensity" gère l'intensité de la lumière */
var kdSpan = document.getElementById("intensity");
var kdSlider = document.getElementById("kdSlider");

kdSlider.value = 50;
kdValue = kdSlider.value/10;

kdSlider.oninput = function (){
    kdValue = this.value/10;
    kdSpan.innerHTML = this.value/10;
}

//couleur de la lumière
var colorLight = document.getElementById("color2");
colorLight.hidden =true;

function updateColorLight()
{
  /* cette partie récupère la couleur du background en string et la convertie en int */
	var val = colorLight.style.backgroundColor.split('(')[1].split(')')[0].split(", ");
	redLight = parseInt(val[0],10);
	greenLight = parseInt(val[1],10);
	blueLight = parseInt(val[2],10);
}

//Objets
/* initialisation de la variable pour gèrer le color picker */
var color = document.getElementById("color");
color.hidden =true;

function updateColorObj()
{
  /* cette partie récupère la couleur du background en string et la convertie en int */
	var val1 = color.style.backgroundColor.split('(')[1].split(')')[0].split(", ");
	redObj = parseInt(val1[0],10);
	greenObj = parseInt(val1[1],10);
	blueObj = parseInt(val1[2],10);
}

moveLight = function() {
	movelight = true;
}

moveObj = function() {
	movelight = false;
}
