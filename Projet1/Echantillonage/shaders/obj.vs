attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;

uniform mat4 uRMatrix;
uniform mat4 uRTMatrix;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

//varying fait une interpolation sur la variable
varying vec4 pos3D;
varying vec3 N;
varying vec3 TexCoords;
varying mat4 uRTranspose;

void main(void) {

	uRTranspose = uRTMatrix;
	pos3D = uMVMatrix * vec4(aVertexPosition,1.0);
	N = vec3(uRMatrix * vec4(aVertexNormal,1.0));

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

}
