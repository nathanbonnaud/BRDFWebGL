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

//Objets
/* initialisation de la variable pour gèrer le color picker */
var color = document.getElementById("color");
color.hidden =true;

function updateColor()
{
  /* cette partie récupère la couleur du background en string et la convertie en int */
	var val = color.style.backgroundColor.split('(')[1].split(')')[0].split(", ");
	redObj = parseInt(val[0],10);
	greenObj = parseInt(val[1],10);
	blueObj = parseInt(val[2],10);
}
