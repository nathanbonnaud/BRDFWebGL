
precision mediump float;

attribute vec3 aVertexPosition;
attribute vec3 texCoords;

varying vec3 TexCoords;

uniform mat4 uPMatrix;
uniform mat4 uMVMatrix;

void main(void)
{
    TexCoords = aVertexPosition;
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
}
