

// =====================================================
// Mouse management
// =====================================================
var mouseDown = false;
var lastMouseX = null;
var lastMouseY = null;
var rotYCamera = 0;
var rotXCamera = -1;

var transYLumiere = 0;
var transXLumiere = 0;

var redObj =0;
var greenObj =0;
var blueObj =0;

var redLight =0;
var greenLight =0;
var blueLight =0;
// =====================================================
window.requestAnimFrame = (function()
{
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(/* function FrameRequestCallback */ callback,
				 /* DOMElement Element */ element)
		{
			window.setTimeout(callback, 1000/60);
		};
})();

// ==========================================
function tick() {
	requestAnimFrame(tick);
	drawScene();

	updateColorObj();
	updateColorLight();
}

// =====================================================
function degToRad(degrees) {
	return degrees * Math.PI / 180;
}


// =====================================================
function handleMouseWheel(event) {

	distCENTER[2] += event.deltaY/10.0;
}

// =====================================================
function handleMouseDown(event) {
	mouseDown = true;
	lastMouseX = event.clientX;
	lastMouseY = event.clientY;
}


// =====================================================
function handleMouseUp(event) {
	mouseDown = false;
}


// =====================================================
function handleMouseMove(event) {

	if (!mouseDown) return;

	var newX = event.clientX;
	var newY = event.clientY;
	var deltaX = newX - lastMouseX;
	var deltaY = newY - lastMouseY;

	if(event.shiftKey) {
		distCENTER[2] += deltaY/100.0;
	} else {

		if(controleCamera){
			rotYCamera += degToRad(deltaX / 5);
			rotXCamera += degToRad(deltaY / 5);

			mat4.identity(rotMatrix);
			mat4.rotate(rotMatrix, rotXCamera, [1, 0, 0]);
			mat4.rotate(rotMatrix, rotYCamera, [0, 0, 1]);
		}else{
			transYLumiere -= deltaY / 5;
			transXLumiere += deltaX / 5;

			mat4.identity(transMatrixLum);

			vecTranslation = [0, 0, 0, 1];
			vecTranslation[0] = transXLumiere;
			vecTranslation[1] = transYLumiere;

			vecTranslation = mat4.multiplyVec4(transMatrixLum, vecTranslation);
		}
	}

	lastMouseX = newX
	lastMouseY = newY;
}
