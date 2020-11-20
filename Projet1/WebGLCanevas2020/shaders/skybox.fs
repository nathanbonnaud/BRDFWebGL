uniform samplerCube skybox;

varying vec2 TexCoords;

void main()
{
    gl_FragColor = texture(skybox, TexCoords);
}
