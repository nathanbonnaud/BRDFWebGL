/* slider "n" gère l'indice de réfraction de l'objet */
var nSpan = document.getElementById("indRefrac");
var nSlider = document.getElementById("indRefracSlider");

nSlider.value = 150;
nValue = nSlider.value/100;

nSlider.oninput = function (){
    nValue = this.value/100;
    nSpan.innerHTML = this.value/100;
}
nSpan.innerHTML = nSlider.value/100;

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