var kdSpan = document.getElementById("kdSpan");
var kdSlider = document.getElementById("kdSlider");

kdSpan.innerHTML = kdSlider.value/100;

kdSlider.oninput = function (){
    kdSpan.innerHTML = this.value/100;
}

//---------------------------------------------------------

var ksSpan = document.getElementById("ksSpan");
var ksSlider = document.getElementById("ksSlider");

ksSpan.innerHTML = ksSlider.value/100;

ksSlider.oninput = function (){
    ksSpan.innerHTML = this.value/100;
}

//---------------------------------------------------------

var niSpan = document.getElementById("niSpan");
var niSlider = document.getElementById("niSlider");

niSpan.innerHTML = niSlider.value/100;

niSlider.oninput = function (){
    niSpan.innerHTML = this.value/100;
}

//---------------------------------------------------------

var mSpan = document.getElementById("mSpan");
var mSlider = document.getElementById("mSlider");

mSpan.innerHTML = mSlider.value/100;

mSlider.oninput = function (){
    mSpan.innerHTML = this.value/100;
}

document.getElementById("redBox").onclick = function (){
    console.log("red");
}
document.getElementById("yellowBox").onclick = function (){
    console.log("yellow");
}
document.getElementById("orangeBox").onclick = function (){
    console.log("orange");
}
document.getElementById("greenBox").onclick = function (){
    console.log("green");
}
document.getElementById("blueBox").onclick = function (){
    console.log("blue");
}
document.getElementById("pinkBox").onclick = function (){
    console.log("pink");
}
document.getElementById("purpleBox").onclick = function (){
    console.log("purple");
}