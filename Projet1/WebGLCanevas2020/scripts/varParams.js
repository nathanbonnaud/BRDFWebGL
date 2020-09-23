var kdSpan = document.getElementById("kdSpan");
var kdSlider = document.getElementById("kdSlider");
var kdValue = 0.5;

kdSpan.innerHTML = kdSlider.value/100;

kdSlider.oninput = function (){
    kdValue = this.value/100;
    kdSpan.innerHTML = this.value/100;
}

//---------------------------------------------------------

var ksSpan = document.getElementById("ksSpan");
var ksSlider = document.getElementById("ksSlider");
var ksValue = 0.5;

ksSpan.innerHTML = ksSlider.value/100;

ksSlider.oninput = function (){
    ksValue = this.value/100;
    ksSpan.innerHTML = this.value/100;
}

//---------------------------------------------------------

var niSpan = document.getElementById("niSpan");
var niSlider = document.getElementById("niSlider");
var niValue = 0.5;

niSpan.innerHTML = niSlider.value/100;

niSlider.oninput = function (){
    niValue = this.value/100;
    niSpan.innerHTML = this.value/100;
}

//---------------------------------------------------------

var mSpan = document.getElementById("mSpan");
var mSlider = document.getElementById("mSlider");
var mValue = 0.5;

mSpan.innerHTML = mSlider.value/100;

mSlider.oninput = function (){
    mValue = this.value/100;
    mSpan.innerHTML = this.value/100;
}

//---------------------------------------------------------

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