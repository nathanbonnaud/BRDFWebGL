precision mediump float;
uniform samplerCube uSkybox;

uniform float uNi;
uniform int uReflectOn;

varying vec4 pos3D;
varying vec3 N;
varying mat4 uRTranspose;

//=========================================================================================================

// calcul la couleur de la cubemap après une réfflexion sur l'objet
vec4 computeReflect(vec3 pos3D)
{
  vec3 Vo = normalize(pos3D);
  vec3 Vi = reflect(Vo,N);
  Vi = vec3(uRTranspose * vec4(Vi,1.0));
  return textureCube(uSkybox,Vi.xzy);
}

//=========================================================================================================

// calcul la couleur de la cubemap après une réfraction sur l'objet
vec4 computeRefract(vec3 pos3D)
{
  vec3 Vo = normalize(pos3D);
  vec3 Vi = refract(Vo,N,1.0/uNi);
  Vi = vec3(uRTranspose * vec4(Vi,1.0));
  return textureCube(uSkybox,Vi.xzy);
}

//=========================================================================================================

void main(void)
{
  gl_FragColor = (uReflectOn == 1) ? computeReflect(pos3D.xyz) : computeRefract(pos3D.xyz);
}
