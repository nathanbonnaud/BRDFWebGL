precision mediump float;
uniform samplerCube uSkybox;

varying vec3 TexCoords;

void main(void)
{
    gl_FragColor = textureCube(uSkybox, TexCoords);
//    gl_FragColor = vec4(TexCoords ,1.0);
}
