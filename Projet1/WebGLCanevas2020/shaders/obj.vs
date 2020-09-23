attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;

uniform mat4 uRMatrix;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

uniform vec3 uLightColor;
uniform float uKd;
uniform float uKs;
uniform float uNi;
uniform float uM;

varying vec4 pos3D;
varying vec3 N;
varying vec3 lightColor;

void main(void) {
	pos3D = uMVMatrix * vec4(aVertexPosition,1.0);
	N = vec3(uRMatrix * vec4(aVertexNormal,1.0));
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

    lightColor = uLightColor;
}
