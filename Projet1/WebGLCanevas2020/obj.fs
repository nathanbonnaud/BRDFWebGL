
precision mediump float;

varying vec4 pos3D;
varying vec3 N;
varying vec3 lightColor;

//varying -> Kd, Ks, Ni, m, lightColor, Material

void main(void)
{
	//vec3 col = vec3(0.8,0.4,0.4) * dot(N,normalize(vec3(-pos3D))); // Lambert rendering, eye light source
	vec3 col = lightColor * dot(N,normalize(vec3(-pos3D))); // Lambert rendering, eye light source
	gl_FragColor = vec4(col,1.0);
}



