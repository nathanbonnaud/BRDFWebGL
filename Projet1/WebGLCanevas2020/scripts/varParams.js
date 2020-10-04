/* slider "Intensity" gère l'intensité de la lumière */
var kdSpan = document.getElementById("intensity");
var kdSlider = document.getElementById("kdSlider");
kdSlider.value = 50;
kdValue = kdSlider.value/10;

kdSlider.oninput = function (){
    kdValue = this.value/10;
    kdSpan.innerHTML = this.value/10;
}

var lightColorSpan = document.getElementById("lightColorSpan");
var lightColor = vec3.create([1.0, 1.0, 1.0]);

document.getElementById("whiteBox").onclick = function (){
    lightColorSpan.innerHTML="white";
    lightColor.set([1.0, 1.0, 1.0]);
}
document.getElementById("redBox").onclick = function (){
    lightColorSpan.innerHTML="red";
    lightColor.set([1.0, 0.0, 0.0]);
}
document.getElementById("yellowBox").onclick = function (){
    lightColorSpan.innerHTML="yellow";
    lightColor.set([1.0, 1.0, 0.0]);
}
document.getElementById("orangeBox").onclick = function (){
    lightColorSpan.innerHTML="orange";
    lightColor.set([1.0, 0.5, 0.0]);
}
document.getElementById("greenBox").onclick = function (){
    lightColorSpan.innerHTML="green";
    lightColor.set([0.0, 1.0, 0.0]);
}
document.getElementById("blueBox").onclick = function (){
    lightColorSpan.innerHTML="blue";
    lightColor.set([0.0, 0.0, 1.0]);
}
document.getElementById("pinkBox").onclick = function (){
    lightColorSpan.innerHTML="pink";
    lightColor.set([1.0, 0.4, 0.6]);
}
document.getElementById("purpleBox").onclick = function (){
    lightColorSpan.innerHTML="purple";
    lightColor.set([0.5, 0.2, 0.7]);
}
