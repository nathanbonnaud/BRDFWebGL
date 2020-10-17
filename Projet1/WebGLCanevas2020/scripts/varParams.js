/* boutons controle de la caméra ou de la lumière*/
var controleCamera = true;
var controleLumiere = false;
var spanDeplacementCamera = document.getElementById("deplacementCamera");
var spanDeplacementLumiere = document.getElementById("deplacementLumiere");

var torranceOn = 0;
var spanPhong = document.getElementById("phong");
var spanCookTorrance = document.getElementById("cookTorance");

var propertiesCT = document.getElementsByClassName("propertyCT");
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

//clique sur le span Phong
spanPhong.onclick = function (){
    torranceOn = 0;

    spanPhong.style.boxShadow = "1px 2px";
    spanPhong.style.backgroundColor = "yellow";
    spanCookTorrance.style.boxShadow = "3px 4px";
    spanCookTorrance.style.backgroundColor = "whitesmoke";

    for (let i = 0; i < propertiesCT.length; i++) {
        propertiesCT[i].style.display = "none";
    }

    document.getElementById("kdSlider").style.display = "block";
    document.getElementById("pKd").style.display = "block";

    document.getElementById("brightnessSlider").style.display = "block";
    document.getElementById("pBrightness").style.display = "block";
}

//clique sur le span Cook-Torrance
spanCookTorrance.onclick = function (){
    torranceOn = 1;

    spanCookTorrance.style.boxShadow = "1px 2px";
    spanCookTorrance.style.backgroundColor = "yellow";
    spanPhong.style.boxShadow = "3px 4px";
    spanPhong.style.backgroundColor = "whitesmoke";

    for (let i = 0; i < propertiesCT.length; i++) {
        propertiesCT[i].style.display = "block";
    }

    document.getElementById("kdSlider").style.display = "none";
    document.getElementById("pKd").style.display = "none";

    document.getElementById("brightnessSlider").style.display = "none";
    document.getElementById("pBrightness").style.display = "none";
}




//Lumière
/* slider "Intensity" gère l'intensité de la lumière */
var intensitySpan = document.getElementById("intensity");
var intensitySlider = document.getElementById("intensitySlider");

intensitySlider.value = 30;
intensityValue = intensitySlider.value/10;

intensitySlider.oninput = function (){
    intensityValue = this.value/10;
    intensitySpan.innerHTML = this.value/10;
}

/* slider "Kd" gère la valeur de Kd */
var kdSpan = document.getElementById("kd");
var kdSlider = document.getElementById("kdSlider");

kdSlider.value = 50;
kdValue = kdSlider.value/100;

kdSlider.oninput = function (){
    kdValue = this.value/100;
    kdSpan.innerHTML = this.value/100;
}

/* slider "brightness" gère la valeur le coefficient brightness */
var brightnessSpan = document.getElementById("brightness");
var brightnessSlider = document.getElementById("brightnessSlider");

brightnessSlider.value = 10;
brightnessValue = brightnessSlider.value*10;

brightnessSlider.oninput = function (){
    brightnessValue = this.value*10;
    brightnessSpan.innerHTML = this.value*10;
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
