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

/* slider "Intensity" gère l'intensité de la lumière */
var intensitySpan = document.getElementById("intensity");
var intensitySlider = document.getElementById("intensitySlider");

intensitySlider.value = 30;
intensityValue = intensitySlider.value/10;

intensitySlider.oninput = function (){
    intensityValue = this.value/10;
    intensitySpan.innerHTML = this.value/10;
}

/* slider "m" gère la rugosité */
var mSpan = document.getElementById("roughness");
var mSlider = document.getElementById("roughnessSlider");

mSlider.value = 50;
mValue = mSlider.value/100;

mSlider.oninput = function (){
    mValue = this.value/100;
    mSpan.innerHTML = this.value/100;
}

/* slider "n" gère l'indice de réfraction de l'objet */
var nSpan = document.getElementById("indRefrac");
var nSlider = document.getElementById("indRefracSlider");

nSlider.value = 150;
nValue = nSlider.value/100;

nSlider.oninput = function (){
    nValue = this.value/100;
    nSpan.innerHTML = this.value/100;
}

/* slider "Kd" gère la valeur de Kd */
var xSpan = document.getElementById("X");
var xSlider = document.getElementById("Xslider");

xSlider.value = 1;
xValue = xSlider.value;

xSlider.oninput = function (){
    xValue = this.value;
    xSpan.innerHTML = this.value;
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

moveLight = function() {
    movelight = true;
}

moveObj = function() {
    movelight = false;
}

document.getElementById("selectedObj").innerHTML =
    "\t<h3 >Select an object :</h3>\n" +
    "\t<input type=\"radio\" id=\"bunny\" name=\"object\" value=\"Bunny\" checked=\"checked\" onclick=\"selectedBunny()\">\n" +
    "\t<label for=\"bunny\">Bunny</label><br>\n" +
    "\t<input type=\"radio\" id=\"helmet\" name=\"object\" value=\"Helmet\" onclick=\"selectedHelmet()\">\n" +
    "\t<label for=\"helmet\">Helmet</label><br>\n" +
    "\t<input type=\"radio\" id=\"teapot\" name=\"object\" value=\"Teapot\" onclick=\"selectedTeapot()\">\n" +
    "\t<label for=\"teapot\">Sphere</label>";


document.getElementById("selectedCubeMap").innerHTML =
    "\t<h3 >Select a CubeMap :</h3>\n" +
    "\t<input type=\"radio\" id=\"parkN\" name=\"cubeMap\" value=\"Parc neige\" checked=\"checked\" onclick=\"selectedParkN()\">\n" +
    "\t<label for=\"parc neige\">Parc neige</label><br>\n" +
    "\t<input type=\"radio\" id=\"park\" name=\"cubeMap\" value=\"Parc\" onclick=\"selectedPark()\">\n" +
    "\t<label for=\"parc\">Parc</label><br>\n" +
    "\t<input type=\"radio\" id=\"place\" name=\"cubeMap\" value=\"Place\" onclick=\"selectedPlace()\">\n" +
    "\t<label for=\"place\">Place</label>" +
    "\t<input type=\"radio\" id=\"water\" name=\"cubeMap\" value=\"Lac\" onclick=\"selectedWater()\">\n" +
    "\t<label for=\"lac\">Lac</label>" +
    "\t<input type=\"radio\" id=\"space\" name=\"cubeMap\" value=\"Space\" onclick=\"selectedSpace()\">\n" +
    "\t<label for=\"space\">Space</label>";

var reflectOn = 1;

function pushReflect(){
    reflectOn = 1;

    document.getElementById("reflectButton").style.backgroundColor = "yellow";
    document.getElementById("refractButton").style.backgroundColor = "";
}

function pushRefract(){
    reflectOn = 0;

    document.getElementById("reflectButton").style.backgroundColor = "";
    document.getElementById("refractButton").style.backgroundColor = "yellow";
}

document.getElementById("reflectButton").style.backgroundColor = "yellow";
