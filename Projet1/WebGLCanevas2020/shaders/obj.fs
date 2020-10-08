
precision mediump float;

uniform vec3 uLightPower;
uniform vec3 uLightPos;
uniform vec3 uLightColor; // Couleur ambiante ?
uniform vec3 uObjColor;

varying vec4 pos3D;
varying vec3 N;

const float M_PI = 3.145;
//varying -> Kd, Ks, Ni, m, lightColor, Material

vec3 Phong(vec3 PosLight, vec3 LightColor, vec3 Normal, vec4 Position, vec3 ObjColor, vec3 LightPower)
{
    vec3 Ia = LightColor;

    vec3 Cd = ObjColor;
    vec3 Id = Cd * max(cos(dot(Normal, vec3(PosLight-vec3(Position)))), 0.);

    vec3 Cs = vec3(1.0, 1.0, 1.0);
    float s = 100.0;
    vec3 ReflectLum = reflect(vec3(PosLight-vec3(Position)), Normal);
    vec3 Is = Cs * pow(max(cos(dot(Normal, vec3(PosLight-vec3(Position)))), 0.), s);

    float Ka = 0.3;
    float Kd = 0.4;
    float Ks = 0.3;

    return Ka * Ia + Kd * Id + Ks * Is;
}

// Calcule la lumière du fragment à l'aide du modèle de Lambert
vec3 Lambert(vec3 Li, vec3 ObjColor, vec3 PosLight, vec3 LightColor, vec3 Normal, vec4 Position)
{
	return (Li*LightColor) *  (ObjColor/M_PI) * dot(Normal,normalize(vec3(PosLight-vec3(Position))));
}

// Fonction principale du fragement shader, il renvoit la couleur final de chaque fragment.
void main(void)
{
	//vec3 col = Lambert(uLightPower,uObjColor,uLightPos,uLightColor,N,pos3D); // Lambert rendering, eye light source

    vec3 col = Phong(uLightPos, uLightColor, N, pos3D, uObjColor, uLightPower);

	gl_FragColor = vec4(col,1.0);
}
