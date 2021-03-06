precision mediump float;
uniform samplerCube uSkybox;

uniform vec3 uLi;
uniform vec3 uLpos;
uniform vec3 uLcolor;

uniform float uX;
uniform float uKs;
uniform float uSigma;
uniform float uNi;

uniform int uTorranceOn;
uniform int uReflectOn;

varying vec4 pos3D;
varying vec3 N;
varying mat4 uRTranspose;

const float M_PI = 3.145;


// =======================================================================================================

// Modèle de Lambert
vec3 Lambert(vec3 Lpos, vec3 Objcolor, vec3 N, vec4 Pos3D, float RhoD)
{
    vec3 L = vec3(Lpos-vec3(Pos3D));
    float cosT = max(dot(N,normalize(L)),0.0);
    vec3 Kd = RhoD * Objcolor * cosT;

    return Kd ;
}

//============================================================================================================

//Fresnel
float F(vec3 L, vec3 M, float Ni)
{
    float c = max(dot(L,M),0.0);
	float Ni2 = Ni*Ni;
	float c2 = c*c;
    float g = sqrt(Ni2+c2-1.0);
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

// Maskage / Ombrage
float G(vec3 N, vec3 M, vec3 L, vec3 CamDir)
{
    float val1 = (2.0*max(dot(N,M),0.0)*max(dot(N,CamDir),0.0)/max(dot(CamDir,M),0.0));
    float val2 = (2.0*max(dot(N,M),0.0)*max(dot(N,L),0.0)/max(dot(L,M),0.0));
	float G = min(1.0,min(val1,val2));

    return G;
}

//=================================================================================================================

// Distribution des normales de Beckmann
float D(vec3 N, vec3 M, float Sigma)
{
	float CosT = max(dot(N,M),0.0);
	float CosT2 = CosT*CosT;
	float CosT4 = CosT2*CosT2;
	float SinT2 = 1.0-CosT2;
	float TanT2 = SinT2/CosT2;
	float Sigma2 = Sigma*Sigma;

  float e = exp(-TanT2/(2.0*Sigma2));
  float bot = M_PI*Sigma2*CosT4;
	float D = e/bot;

    return D;
}

//========================================================================================================

// BRDF de Cook-Torrance
vec3 CookTorrance(vec3 Lpos, vec3 Objcolor, vec3 N, vec4 Pos3D)
{
    vec3 L = normalize(vec3(Lpos-vec3(Pos3D)));
    vec3 CamDir =  normalize(-vec3(Pos3D));
    vec3 M = normalize(L + CamDir);

	float F = F(L,M,uNi);
	float G = G(N,M,L,CamDir);
	float D = D(N,M,uSigma);

	float bot = 4.0*max(dot(L,N),0.0)*max(dot(CamDir,N),0.0);
	float top = F*G*D;
	float spec = top/bot;
	vec3 Kd = Lambert(Lpos, Objcolor, N, Pos3D, 1.0-F);

	vec3 brdf = Kd/M_PI + spec;
	return brdf;
}

//=========================================================================================================

// reflection de la cubemap
vec4 computeReflect(vec3 pos3D)
{
  vec3 Vo = normalize(pos3D);
  vec3 Vi = reflect(Vo,N);
  Vi = vec3(uRTranspose * vec4(Vi,1.0));
  return textureCube(uSkybox,Vi.xzy);
}

//=========================================================================================================

//refraction de la cubemap
vec4 computeRefract(vec3 pos3D)
{
  vec3 Vo = normalize(pos3D);
  vec3 Vi = refract(Vo,N,1.0/uNi);
  Vi = vec3(uRTranspose * vec4(Vi,1.0));
  return textureCube(uSkybox,Vi.xzy);
}

//==========================================================================================================

void main(void)
{
  vec4 objColor;
  if(uReflectOn == 1)
    objColor = computeReflect(pos3D.xyz);
  else
    objColor = computeRefract(pos3D.xyz);

	vec3 Li = uLi*uLcolor;
	float CosT = max(dot(normalize(N),normalize(uLpos-vec3(pos3D))),0.0);
	vec3 Fr = CookTorrance(uLpos,objColor.xyz,normalize(N),pos3D);

	gl_FragColor = vec4(Li * Fr * CosT,1.0);
}
