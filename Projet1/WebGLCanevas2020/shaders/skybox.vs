attribute vec3 aVertexPosition;

varying vec2 TexCoords;

uniform mat4 uPMatrix;
uniform mat4 uMVMatrix;

void main()
{
    TexCoords = aVertexPosition.xy;
    gl_Position = uPMatrix * uMVMatrix * vec4(aPoaVertexPositions, 1.0);
}
