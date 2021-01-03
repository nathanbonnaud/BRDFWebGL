precision mediump float;
uniform samplerCube uSkybox;

uniform float uNi;
uniform int uReflectOn;
varying vec4 pos3D;
varying vec3 N;
varying mat4 uRTranspose;

//=========================================================================================================

vec4 computeReflect(vec3 pos3D)
{
  vec3 Vo = normalize(pos3D);
  vec3 Vi = reflect(Vo,N);
  Vi = vec3(uRTranspose * vec4(Vi,1.0));
  return textureCube(uSkybox,Vi.xzy);
}

vec4 computeRefract(vec3 pos3D)
{
  vec3 Vo = normalize(pos3D);
  vec3 Vi = refract(Vo,N,1.0/uNi);
  Vi = vec3(uRTranspose * vec4(Vi,1.0));
  return textureCube(uSkybox,Vi.xzy);
}

void main(void)
{
    if(uReflectOn == 1)
        gl_FragColor = computeReflect(pos3D.xyz);
    else
	    gl_FragColor = computeRefract(pos3D.xyz);
}
