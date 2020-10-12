
precision mediump float;

uniform vec3 uLightPower;
uniform vec3 uLightPos;
uniform vec3 uLightColor; // Couleur ambiante ?
uniform vec3 uObjColor;

uniform float uKd;
uniform float uKs;

//uniform bool uTorranceOn;
bool Torrance = true;

varying vec4 pos3D;
varying vec3 N;

const float M_PI = 3.145;


// Calcule l'aspect diffus du fragment à l'aide du modèle de Lambert
vec3 Lambert(vec3 Li, vec3 LightPos, vec3 LightColor, vec3 ObjColor, vec3 Normal, vec4 Position)
{
	return (Li*LightColor)*(ObjColor/M_PI) * clamp(dot(Normal,normalize(vec3(LightPos-vec3(Position)))),0.0,1.0);
}

// Calcule le modèle de Phong en fusionnant l'aspect diffus et spéculaire
vec3 Phong(vec3 LightPos, vec3 LightColor, vec3 LightPower, vec3 ObjColor, vec3 Normal, vec4 Position)
{
    vec3 Id = Lambert(LightPower,LightPos,LightColor,ObjColor,Normal,Position);
    vec3 Reflect = reflect(normalize(vec3(vec3(Position)-LightPos)), Normal);
    vec3 Is = (LightColor*LightPower) * pow(max(dot(Reflect, normalize(-vec3(Position))), 0.), 100.0);

    return 0.75 * Id + 0.25 * Is;
}

///////////////////////////////////////////////////////////////////////////////////////////////

// calcule du coefficient de Fresnel
float Fresnel(vec3 LightDir, vec3 MicrofacetDir, float refractionId)
{
  float c = abs(dot(LightDir,MicrofacetDir));
  float g = sqrt(pow(refractionId,2.0)+pow(c,2.0)-1.0);
  float coeff1 = pow(g-c,2.0)/(2.0*pow(g+c,2.0));
  float coeff2 = 1.0 + pow(c*(g+c)-1.0  ,2.0)/pow(c*(g-c)+1.0,2.0);

  return coeff1 * coeff2;
}

float Ombrage(vec3 Normal, vec3 MicrofacetDir, vec3 LightDir, vec3 CameraDir)
{
  float val1 = (2.0*dot(Normal,MicrofacetDir)*dot(Normal,CameraDir))/dot(CameraDir,MicrofacetDir);
  float val2 = (2.0*dot(Normal,MicrofacetDir)*dot(Normal,LightDir))/dot(LightDir,MicrofacetDir);

  return min(1.0,min(val1,val2));
}

float Beckmann(vec3 Normal, vec3 MicrofacetDir)
{
  float rugosity = 0.1;
  float theta = acos(dot(Normal,MicrofacetDir));
  float powValue = exp(-pow(theta,2.0)/(2.0*pow(rugosity,2.0)));
  float divi = M_PI*pow(rugosity,2.0)*pow(cos(theta),4.0);
  return powValue/divi;
}

//Calcule la valeur spéculaire de la brdf
float CookTorrance(vec3 LightPos, vec3 ObjColor, vec3 Normal, vec4 Position)
{
  vec3 VectorLight = normalize(vec3(LightPos-vec3(Position)));
  vec3 VectorCamera =  normalize(-vec3(Position));
  vec3 VectorMicrofacet = normalize((VectorLight + VectorCamera)/2.0);


  return (Fresnel(VectorLight,VectorMicrofacet,1.5)*Ombrage(Normal,VectorMicrofacet,VectorLight,VectorCamera)*Beckmann(Normal,VectorMicrofacet))
                /(4.0*abs(dot(VectorLight,Normal))*abs(dot(VectorCamera,Normal)));
}

//somme des couleurs et retourne la couleur finale de l'objet
vec3 Brdf(vec3 LightPos, vec3 LightColor, vec3 LightPower, vec3 ObjColor, vec3 Normal, vec4 Position)
{
  float cookTorrance =CookTorrance(LightPos, ObjColor, N, pos3D);
  float  specular = cookTorrance * clamp(dot(N,normalize(vec3(LightPos-vec3(pos3D)))),0.0,1.0);
  vec3 diffuse = Lambert(LightPower, LightPos, LightColor, ObjColor, N, pos3D);

  return 0.1*specular* (LightPower*LightColor) + 0.9*diffuse;
}


////////////////////////////////////////////////////////////////////////////////////////////////

// Fonction principale du fragement shader, il renvoit la couleur final de chaque fragment.
void main(void)
{
  vec3 col = (Torrance) ? Brdf(uLightPos, uLightColor, uLightPower, uObjColor, N, pos3D)
                        : Phong(uLightPos, uLightColor, uLightPower, uObjColor, N, pos3D);

	gl_FragColor = vec4(col,1.0);
}
