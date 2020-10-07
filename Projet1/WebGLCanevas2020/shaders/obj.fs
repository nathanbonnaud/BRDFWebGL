
precision mediump float;

uniform vec3 uLightPower;
uniform vec3 uLightPos;
uniform vec3 uLightColor;
uniform vec3 uObjColor;

varying vec4 pos3D;
varying vec3 N;

const float M_PI = 3.145;
//varying -> Kd, Ks, Ni, m, lightColor, Material

// Calcule la lumière du fragment à l'aide du modèle de Lambert
vec3 Lambert(vec3 Li, vec3 ObjColor, vec3 PosLight, vec3 LightColor, vec3 Normal, vec4 Position)
{
	return (Li*LightColor) *  (ObjColor/M_PI) * dot(Normal,normalize(vec3(PosLight-vec3(Position))));
}

// Fonction principale du fragement shader, il renvoit la couleur final de chaque fragment.
void main(void)
{
	vec3 col = Lambert(uLightPower,uObjColor,uLightPos,uLightColor,N,pos3D); // Lambert rendering, eye light source

	gl_FragColor = vec4(col,1.0);
}
