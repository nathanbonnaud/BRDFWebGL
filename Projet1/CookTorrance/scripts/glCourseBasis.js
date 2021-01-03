
// =====================================================
var gl;

// =====================================================
var mvMatrix = mat4.create();
var pMatrix = mat4.create();
var rotMatrix = mat4.create();
var rotTranspose = mat4.create();

var distCENTER;

var transMatrixLum = mat4.create();
var vecTranslation = [0,0,0,1];

// =====================================================

var OBJ1 = null;
var SKYBOX = null;

var objectName = "bunny";


// =====================================================
// OBJET 3D, lecture fichier obj
// =====================================================

class objmesh {

	// --------------------------------------------
	constructor(objFname) {
		this.objName = objFname;
		this.shaderName = 'obj';
		this.loaded = -1;
		this.shader = null;
		this.mesh = null;

		loadObjFile(this);
		loadShaders(this);
	}

	// --------------------------------------------
	setShadersParams() {
		gl.useProgram(this.shader);

		this.shader.vAttrib = gl.getAttribLocation(this.shader, "aVertexPosition");
		gl.enableVertexAttribArray(this.shader.vAttrib);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.vertexBuffer);
		gl.vertexAttribPointer(this.shader.vAttrib, this.mesh.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

		this.shader.nAttrib = gl.getAttribLocation(this.shader, "aVertexNormal");
		gl.enableVertexAttribArray(this.shader.nAttrib);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.normalBuffer);
		gl.vertexAttribPointer(this.shader.nAttrib, this.mesh.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

		this.shader.lightPower = gl.getUniformLocation(this.shader,"uLi");
		this.shader.objColor = gl.getUniformLocation(this.shader,"uObjcolor");
		this.shader.lightPos = gl.getUniformLocation(this.shader,"uLpos");
		this.shader.lightColor = gl.getUniformLocation(this.shader,"uLcolor");
		this.shader.kd = gl.getUniformLocation(this.shader, "uRhoD");

		this.shader.roughness = gl.getUniformLocation(this.shader, "uSigma");
		this.shader.indRefract = gl.getUniformLocation(this.shader, "uNi");
		this.shader.indBright = gl.getUniformLocation(this.shader, "uN");

		this.shader.torrance = gl.getUniformLocation(this.shader, "uTorranceOn");

		this.shader.samplerUniform = gl.getUniformLocation(this.shader, "uSkybox");
		gl.uniform1i(this.shader.samplerUniform, 0);

		this.shader.rMatrixUniform = gl.getUniformLocation(this.shader, "uRMatrix");
		this.shader.rtMatrixUniform = gl.getUniformLocation(this.shader, "uRTMatrix");
		this.shader.mvMatrixUniform = gl.getUniformLocation(this.shader, "uMVMatrix");
		this.shader.pMatrixUniform = gl.getUniformLocation(this.shader, "uPMatrix");

		this.shader.reflectOn = gl.getUniformLocation(this.shader, "uReflectOn");
	}

	// --------------------------------------------
	setParamsUniforms(){
		mat4.identity(mvMatrix);
		mat4.translate(mvMatrix, distCENTER);
		mat4.multiply(mvMatrix, rotMatrix);
		mat4.transpose(rotMatrix,rotTranspose);

		gl.uniformMatrix4fv(this.shader.rMatrixUniform, false, rotMatrix);
		gl.uniformMatrix4fv(this.shader.mvMatrixUniform, false, mvMatrix);
		gl.uniformMatrix4fv(this.shader.pMatrixUniform, false, pMatrix);
		gl.uniformMatrix4fv(this.shader.rtMatrixUniform, false, rotTranspose);

		gl.uniform3fv(this.shader.lightPower, [intensityValue,intensityValue,intensityValue]);
		gl.uniform3fv(this.shader.objColor, [0,1,0]);

		gl.uniform3fv(this.shader.lightPos,
			[vecTranslation[0],vecTranslation[1],vecTranslation[2]]);
		gl.uniform3fv(this.shader.objColor, [redObj/255,greenObj/255,blueObj/255]);
		gl.uniform3fv(this.shader.lightColor, [redLight/255,greenLight/255,blueLight/255]);

		gl.uniform1f(this.shader.kd, kdValue);

		gl.uniform1f(this.shader.roughness, mValue);
		gl.uniform1f(this.shader.indRefract, nValue);
		gl.uniform1f(this.shader.indBright, brightnessValue);

		gl.uniform1i(this.shader.torrance, torranceOn);

		gl.uniform1i(this.shader.reflectOn, reflectOn);
	}


	// --------------------------------------------
	draw() {
		if(this.shader && this.loaded==4 && this.mesh != null) {
			this.setShadersParams();
			this.setParamsUniforms();
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.mesh.indexBuffer);
			gl.drawElements(gl.TRIANGLES, this.mesh.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
		}
	}
}

// =====================================================
// FONCTIONS GENERALES, INITIALISATIONS
// =====================================================

// =====================================================
function initGL(canvas)
{
	try {
		gl = canvas.getContext("experimental-webgl");
		gl.viewportWidth = canvas.width;
		gl.viewportHeight = canvas.height;
		gl.viewport(0, 0, canvas.width, canvas.height);

		gl.clearColor(0.7, 0.7, 0.7, 1.0);
		gl.enable(gl.DEPTH_TEST);
		gl.enable(gl.CULL_FACE);
		gl.cullFace(gl.BACK);
	} catch (e) {}
	if (!gl) {
		console.log("Could not initialise WebGL");
	}
}


// =====================================================
loadObjFile = function(OBJ3D)
{
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			var tmpMesh = new OBJ.Mesh(xhttp.responseText);
			OBJ.initMeshBuffers(gl,tmpMesh);
			OBJ3D.mesh=tmpMesh;
		}
	}

	xhttp.open("GET", "objects/"+objectName+".obj", true);
	xhttp.send();
}

// =====================================================

selectedBunny = function (){
	objectName = "bunny";
	loadObjFile(OBJ1);
}

selectedHelmet = function (){
	objectName = "Mando_Helmet";
	loadObjFile(OBJ1);
}

selectedTeapot = function (){
	objectName = "teapot";
	loadObjFile(OBJ1);
}

// =====================================================
function loadShaders(Obj3D) {
	loadShaderText(Obj3D,'.vs');
	loadShaderText(Obj3D,'.fs');
}

// =====================================================
function loadShaderText(Obj3D,ext) {   // lecture asynchrone...
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			if(ext=='.vs') { Obj3D.vsTxt = xhttp.responseText; Obj3D.loaded ++; }
			if(ext=='.fs') { Obj3D.fsTxt = xhttp.responseText; Obj3D.loaded ++; }
			if(Obj3D.loaded==2) {
				Obj3D.loaded ++;
				compileShaders(Obj3D);
				Obj3D.loaded ++;
			}
		}
	}

	Obj3D.loaded = 0;
	xhttp.open("GET", 'shaders/'+ Obj3D.shaderName+ext, true);
	xhttp.send();
}

// =====================================================
function compileShaders(Obj3D)
{
	Obj3D.vshader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(Obj3D.vshader, Obj3D.vsTxt);
	gl.compileShader(Obj3D.vshader);
	if (!gl.getShaderParameter(Obj3D.vshader, gl.COMPILE_STATUS)) {
		console.log("Vertex Shader FAILED... "+Obj3D.shaderName+".vs");
		console.log(gl.getShaderInfoLog(Obj3D.vshader));
	}

	Obj3D.fshader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(Obj3D.fshader, Obj3D.fsTxt);
	gl.compileShader(Obj3D.fshader);
	if (!gl.getShaderParameter(Obj3D.fshader, gl.COMPILE_STATUS)) {
		console.log("Fragment Shader FAILED... "+Obj3D.shaderName+".fs");
		console.log(gl.getShaderInfoLog(Obj3D.fshader));
	}

	Obj3D.shader = gl.createProgram();
	gl.attachShader(Obj3D.shader, Obj3D.vshader);
	gl.attachShader(Obj3D.shader, Obj3D.fshader);
	gl.linkProgram(Obj3D.shader);
	if (!gl.getProgramParameter(Obj3D.shader, gl.LINK_STATUS)) {
		console.log("Could not initialise shaders");
		console.log(gl.getShaderInfoLog(Obj3D.shader));
	}
}


// =====================================================
function webGLStart() {

	var canvas = document.getElementById("WebGL-test");

	canvas.onmousedown = handleMouseDown;
	document.onmouseup = handleMouseUp;
	document.onmousemove = handleMouseMove;
	canvas.onwheel = handleMouseWheel;

	initGL(canvas);
	mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);

	if(controleCamera) {
		mat4.identity(rotMatrix);
		mat4.rotate(rotMatrix, rotXCamera, [1, 0, 0]);
		mat4.rotate(rotMatrix, rotYCamera, [0, 0, 1]);
	}else {
		mat4.identity(rotMatrixLum);
		mat4.rotate(rotMatrixLum, rotXLumiere, [1, 0, 0]);
		mat4.rotate(rotMatrixLum, rotYLumiere, [0, 0, 1]);
	}

	distCENTER = vec3.create([0,-0.2,-3]);
	SKYBOX = new skybox();
	OBJ1 = new objmesh('objects/'+objectName+'.obj');

	tick();
}

// =====================================================
function drawScene() {
	gl.clear(gl.COLOR_BUFFER_BIT);
	SKYBOX.draw();
	OBJ1.draw();

}
