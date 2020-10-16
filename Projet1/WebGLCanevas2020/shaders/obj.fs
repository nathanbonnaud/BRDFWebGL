
precision mediump float;

uniform vec3 uLi;
uniform vec3 uLpos;
uniform vec3 uLcolor; // Couleur ambiante ?
uniform vec3 uObjcolor;

uniform float uRhoD;
uniform float uKs;
uniform float uN;
uniform float uM;
uniform float uNi;

uniform int uTorranceOn;

varying vec4 pos3D;
varying vec3 N;

const float M_PI = 3.145;


// =======================================================================================================

// Calcule l'aspect diffus du fragment à l'aide du modèle de Lambert
vec3 Lambert(vec3 Lpos, vec3 Objcolor, vec3 N, vec4 Pos3D, float RhoD)
{
	vec3 L = vec3(Lpos-vec3(Pos3D));
	float cosT = max(dot(N,normalize(L)),0.0);
	vec3 Kd = uRhoD * Objcolor * cosT;

	return Kd ;
}

// ======================================================================================================

// Calcule le modèle de Phong en fusionnant l'aspect diffus et spéculaire
float BlinnPhongModifie(vec3 Lpos, vec3 N, vec4 Pos3D , float n)
{
	float Ks = (1.0-uRhoD);

	vec3 L = vec3(vec3(Pos3D)-Lpos);
	vec3 CamDir = -vec3(Pos3D);
  vec3 Lreflect = reflect(normalize(L), N);
  float cosA = pow(max(dot(Lreflect, normalize(CamDir)), 0.0), n);
	float Is = Ks * ((n+8.0)/(8.0*M_PI)) * cosA;

  return Is;
}

//============================================================================================================

// calcule de Fresnel
float F(vec3 L, vec3 M, float ni)
{
  float c = max(dot(L,M),0.0);
	float ni2 = ni*ni;
	float c2 = c*c;
  float g = sqrt(ni2*c2-1.0);
	float gmc = g-c;
	float gpc = g+c;
	float gmc2 = gmc*gmc;
	float gpc2 = gpc*gpc;

	float top = (c*gpc -1.0)*(c*gpc-1.0);
	float bot = (c*gmc +1.0)*(c*gmc+1.0);

	float coeff1 = gmc2/(2.0*gpc2);
  float coeff2 = 1.0 + top/bot;

	float F = coeff1*coeff2;

  return F;
}

//================================================================================================================

//coefficient d'ombrage
float G(vec3 N, vec3 M, vec3 L, vec3 CamDir)
{
  float val1 = (2.0*max(dot(N,M),0.0)*max(dot(N,CamDir),0.0)/max(dot(CamDir,M),0.0));
  float val2 = (2.0*max(dot(N,M),0.0)*max(dot(N,L),0.0)/max(dot(L,M),0.0));
	float G = min(1.0,min(val1,val2));

  return G;
}

//=================================================================================================================

//calcul de la distribution de Beckmann
float D(vec3 N, vec3 M, float m)
{
	float CosT = max(dot(N,M),0.0);
	float CosT2 = CosT*CosT;
	float CosT4 = CosT2*CosT2;
	float SinT2 = 1.0-CosT2;
	float TanT2 = SinT2/CosT2;
	float m2 = m*m;

  float e = exp(-TanT2/(2.0*m2));
  float bot = M_PI*m2*CosT4;

	float D = e/bot;

  return D;
}


//========================================================================================================

//somme des couleurs et retourne la couleur finale de l'objet
vec3 CookTorrance(vec3 Lpos, vec3 Objcolor, vec3 N, vec4 Pos3D)
{
	vec3 L = normalize(vec3(Lpos-vec3(Pos3D)));
  vec3 CamDir =  normalize(-vec3(Pos3D));
  vec3 M = normalize(L + CamDir);

	float F = F(L,M,uNi);
	float G = G(N,M,L,CamDir);
	float D = D(N,M,uM);
	vec3 Kd = Lambert(Lpos, Objcolor, N, Pos3D, 1.0-F);

	float bot = 4.0*max(dot(L,N),0.0)*max(dot(CamDir,N),0.0);
	float top = F*G*D;
	float Ks = top/bot;
	vec3 col = Kd/M_PI + Ks;

	return col;
}

//=========================================================================================================

// Fonction principale du fragement shader, il renvoit la couleur final de chaque fragment.
void main(void)
{
	vec3 Fr;

	vec3 Li = uLi*uLcolor;
	float CosT = max(dot(normalize(N),normalize(uLpos-vec3(pos3D))),0.0);

  if(uTorranceOn == 0)
	{
		// Modèle Blinn Phong modifié
		vec3 Kd = Lambert(uLpos,uObjcolor,normalize(N),pos3D, uRhoD);
		Fr = Kd/M_PI + BlinnPhongModifie(uLpos,normalize(N),pos3D,uN);
	}else
	{
		// Modèle Cook Torrance
		Fr = CookTorrance(uLpos,uObjcolor,normalize(N),pos3D);
	}

	vec3 col = Li * Fr * CosT;
	gl_FragColor = vec4(col,1.0);
}
