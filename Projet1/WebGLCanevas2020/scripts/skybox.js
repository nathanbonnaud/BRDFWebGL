class skybox {

var shaderProgram = null;

  constructor()
  {
    this.shaderName = 'skybox';
		this.loaded = -1;
		this.shader = null;

    loadShaders(this);
  }

  initBuffers() {
    var ks = sizeMap;
  	// Vertices (array)
    var vertices = [
      // positions
      -1.0*ks,  1.0*ks, -1.0*ks,
      -1.0*ks, -1.0*ks, -1.0*ks,
       1.0*ks, -1.0*ks, -1.0*ks,
       1.0*ks, -1.0*ks, -1.0*ks,
       1.0*ks,  1.0*ks, -1.0*ks,
      -1.0*ks,  1.0*ks, -1.0*ks,

      -1.0*ks, -1.0*ks,  1.0*ks,
      -1.0*ks, -1.0*ks, -1.0*ks,
      -1.0*ks,  1.0*ks, -1.0*ks,
      -1.0*ks,  1.0*ks, -1.0*ks,
      -1.0*ks,  1.0*ks,  1.0*ks,
      -1.0*ks, -1.0*ks,  1.0*ks,

       1.0*ks, -1.0*ks, -1.0*ks,
       1.0*ks, -1.0*ks,  1.0*ks,
       1.0*ks,  1.0*ks,  1.0*ks,
       1.0*ks,  1.0*ks,  1.0*ks,
       1.0*ks,  1.0*ks, -1.0*ks,
       1.0*ks, -1.0*ks, -1.0*ks,

      -1.0*ks, -1.0*ks,  1.0*ks,
      -1.0*ks,  1.0*ks,  1.0*ks,
       1.0*ks,  1.0*ks,  1.0*ks,
       1.0*ks,  1.0*ks,  1.0*ks,
       1.0*ks, -1.0*ks,  1.0*ks,
      -1.0*ks, -1.0*ks,  1.0*ks,

      -1.0*ks,  1.0*ks, -1.0*ks,
       1.0*ks,  1.0*ks, -1.0*ks,
       1.0*ks,  1.0*ks,  1.0*ks,
       1.0*ks,  1.0*ks,  1.0*ks,
      -1.0*ks,  1.0*ks,  1.0*ks,
      -1.0*ks,  1.0*ks, -1.0*ks,

      -1.0*ks, -1.0*ks, -1.0*ks,
      -1.0*ks, -1.0*ks,  1.0*ks,
       1.0*ks, -1.0*ks, -1.0*ks,
       1.0*ks, -1.0*ks, -1.0*ks,
      -1.0*ks, -1.0*ks,  1.0*ks,
       1.0*ks, -1.0*ks,  1.0*ks
    ];

  	vertexBuffer = gl.createBuffer();
  	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  	vertexBuffer.itemSize = 3;
  	vertexBuffer.numItems = 36;

    ks = 1.0;
  	// Texture coords (array)
    var texcoords = [
      // positions
      0.0*ks, 1.0*ks,
      0.0*ks, 0.0*ks,
      1.0*ks, 0.0*ks,
      1.0*ks, 0.0*ks,
      1.0*ks, 1.0*ks,
      0.0*ks, 1.0*ks,

      0.0*ks, 0.0*ks,
      0.0*ks, 0.0*ks,
      0.0*ks, 1.0*ks,
      0.0*ks, 1.0*ks,
      0.0*ks, 1.0*ks,
      0.0*ks, 0.0*ks,

      1.0*ks, 0.0*ks,
      1.0*ks, 0.0*ks,
      1.0*ks, 1.0*ks,
      1.0*ks, 1.0*ks,
      1.0*ks, 1.0*ks,
      1.0*ks, 0.0*ks,

      0.0*ks, 0.0*ks,
      0.0*ks, 1.0*ks,
      1.0*ks, 1.0*ks,
      1.0*ks, 1.0*ks,
      1.0*ks, 0.0*ks,
      0.0*ks, 0.0*ks,

      0.0*ks, 1.0*ks,
      1.0*ks, 1.0*ks,
      1.0*ks, 1.0*ks,
      1.0*ks, 1.0*ks,
      0.0*ks, 1.0*ks,
      0.0*ks, 1.0*ks,

      0.0*ks, 0.0*ks,
      0.0*ks, 0.0*ks,
      1.0*ks, 0.0*ks,
      1.0*ks, 0.0*ks,
      0.0*ks, 0.0*ks,
      1.0*ks, 0.0*ks
  ];
  	texCoordBuffer = gl.createBuffer();
  	gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords), gl.STATIC_DRAW);
  	texCoordBuffer.itemSize = 2;
  	texCoordBuffer.numItems = 36;

  	// Index buffer (array)
  	var indices = [ 0, 1, 2, 3 , 4 ,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35];
  	indexBuffer = gl.createBuffer();
  	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  	indexBuffer.itemSize = 1;
  	indexBuffer.numItems = indices.length;

  }
  initTexture()
  {

    var nameText = ["textures/positiveXPurple.jpg",
                    "textures/negativeXPurple.jpg",
                    "textures/positiveYPurple.jpg",
                    "textures/negativeYPurple.jpg",
                    "textures/positiveZPurple.jpg",
                    "textures/negativeZPurple.jpg"];

    texture = gl.createTexture();
    gl.bindTexture(gl.GL_TEXTURE_CUBE_MAP, texture);
    for (let face = 0; face < 6; face++)
    {
      var texImage = new Image();
      texImage.src = nameText[face];
    	texture.image = texImage;

    	texImage.onload = function () {
      	gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + faces, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
	   }

    }
    gl.texParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
    gl.texParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
    gl.texParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
    gl.texParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
    gl.texParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_WRAP_R, GL_CLAMP_TO_EDGE);
  }

  // =====================================================
   initShaders(vShaderTxt,fShaderTxt) {

    vshader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vshader, vShaderTxt);
    gl.compileShader(vshader);
    if (!gl.getShaderParameter(vshader, gl.COMPILE_STATUS)) {
      console.log(gl.getShaderInfoLog(vshader));
      return null;
    }

    fshader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fshader, fShaderTxt);
    gl.compileShader(fshader);
    if (!gl.getShaderParameter(fshader, gl.COMPILE_STATUS)) {
      console.log(gl.getShaderInfoLog(fshader));
      return null;
    }

    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vshader);
    gl.attachShader(shaderProgram, fshader);

    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.log("Could not initialise shaders");
    }

    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

    shaderProgram.texCoordsAttribute = gl.getAttribLocation(shaderProgram, "texCoords");
    gl.enableVertexAttribArray(shaderProgram.texCoordsAttribute);
    shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");

    shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,
        vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.vertexAttribPointer(shaderProgram.texCoordsAttribute,
          texCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

  }


  // =====================================================
  setMatrixUniforms() {
    if(shaderProgram != null) {
      gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
      gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
    }
  }

  // =====================================================
  draw() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    if(shaderProgram != null) {

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

      mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
      mat4.identity(mvMatrix);
      mat4.translate(mvMatrix, distCENTER);
      mat4.multiply(mvMatrix, rotMatrix);

      setMatrixUniforms();

      gl.drawElements(gl.TRIANGLES, indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
      //gl.drawArrays(gl.TRIANGLE_FAN, 0, vertexBuffer.numItems);
    }
  }
}
