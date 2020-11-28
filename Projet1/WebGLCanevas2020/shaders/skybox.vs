
precision mediump float;

attribute vec3 aVertexPosition;
attribute vec3 texCoords;

varying vec3 TexCoords;

uniform mat4 uPMatrix;
uniform mat4 uMVMatrix;

void main(void)
{
    //TexCoords = normalize(texCoords.xyz/texCoords.w);
    TexCoords = texCoords-vec3(0.5);
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
}
