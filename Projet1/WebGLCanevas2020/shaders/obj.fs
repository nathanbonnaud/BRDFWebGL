
precision mediump float;

uniform vec3 uLightValue;
uniform vec3 uObjColor;
uniform vec3 uPosLight;

varying vec4 pos3D;
varying vec3 N;

const float M_PI = 3.145;
//varying -> Kd, Ks, Ni, m, lightColor, Material

// Calcule la lumière du fragment à l'aide du modèle de Lambert
vec3 Lambert(vec3 Li, vec3 ObjColor, vec3 PosLight)
{
	return Li *  (ObjColor/M_PI) * dot(N,normalize(vec3(PosLight-vec3(pos3D))));
}

// Fonction principale du fragement shader, il renvoit la couleur final de chaque fragment.
void main(void)
{
	vec3 col = Lambert(uLightValue,uObjColor,uPosLight); // Lambert rendering, eye light source

	gl_FragColor = vec4(col,1.0);
}
