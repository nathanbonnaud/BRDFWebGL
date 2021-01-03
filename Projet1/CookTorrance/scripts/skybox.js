class skybox {

    constructor()
    {
        this.init = 0;
        this.shaderName = 'skybox';
        this.loaded = -1;
        this.shader = null;

        loadShaders(this);
        this.initBuffers();
        this.setShaders();
        this.initTexture();
    }

    initBuffers() {
        var ks = 5;
        // Vertices (array)
        var vertices = [
            // positions
            -1.0*ks, -1.0*ks, -1.0*ks,
            1.0*ks, -1.0*ks, -1.0*ks,
            1.0*ks,  1.0*ks, -1.0*ks,
            -1.0*ks,  1.0*ks, -1.0*ks,

            -1.0*ks, -1.0*ks, -1.0*ks,
            -1.0*ks,  1.0*ks, -1.0*ks,
            -1.0*ks,  1.0*ks,  1.0*ks,
            -1.0*ks, -1.0*ks,  1.0*ks,

            1.0*ks, 1.0*ks,  -1.0*ks,
            1.0*ks,  -1.0*ks,  -1.0*ks,
            1.0*ks,  -1.0*ks, 1.0*ks,
            1.0*ks, 1.0*ks, 1.0*ks,

            -1.0*ks,1.0*ks,  1.0*ks,
            1.0*ks, 1.0*ks, 1.0*ks,
            1.0*ks, -1.0*ks,   1.0*ks,
            -1.0*ks, -1.0*ks,  1.0*ks,

            -1.0*ks,  1.0*ks,  -1.0*ks,
            1.0*ks,  1.0*ks,  -1.0*ks,
            1.0*ks,  1.0*ks, 1.0*ks,
            -1.0*ks,  1.0*ks, 1.0*ks,

            1.0*ks, -1.0*ks,  -1.0*ks,
            -1.0*ks, -1.0*ks, -1.0*ks,
            -1.0*ks, -1.0*ks,  1.0*ks,
            1.0*ks, -1.0*ks, 1.0*ks,
        ];

        this.vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        this.vertexBuffer.itemSize = 3;
        this.vertexBuffer.numItems = 24;


        // Index buffer (array)
        var indices = [ 0,1,2,0,2,3,
                        4,5,6,4,6,7,
                        8,9,10,8,10,11,
                        12,13,14,12,14,15,
                        16,17,18,16,18,19,
                        20,21,22,20,22,23];
        this.indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
        this.indexBuffer.itemSize = 1;
        this.indexBuffer.numItems = indices.length;

    }

    //==========================================================
    initTexture()
    {

      let texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
      var texImage = [new Image(),new Image(),new Image(),new Image(),new Image(),new Image()];
      for(let i=0; i<6; i++){
          texImage[i].src = nameText[i];
          texImage[i].onload = function () {
              gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
              gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texImage[i]);
          }
      }
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }

    // =====================================================
    setShaders() {
        if(this.shader != null) {
            gl.useProgram(this.shader);

            this.shader.vertexPositionAttribute = gl.getAttribLocation(this.shader, "aVertexPosition");
            //OBJ1.shader.vertexPositionAttribute = gl.getAttribLocation(OBJ1.shader, "aVertexPosition");
            gl.enableVertexAttribArray(this.shader.vertexPositionAttribute);
            //gl.enableVertexAttribArray(OBJ1.shader.vertexPositionAttribute);

            this.shader.samplerUniform = gl.getUniformLocation(this.shader, "uSkybox");
            //OBJ1.shader.samplerUniform = gl.getUniformLocation(OBJ1.shader, "uSkybox");
            gl.uniform1i(this.shader.samplerUniform, 0);
            //gl.uniform1i(OBJ1.shader.samplerUniform, 0);

            this.shader.pMatrixUniform = gl.getUniformLocation(this.shader, "uPMatrix");
            this.shader.mvMatrixUniform = gl.getUniformLocation(this.shader, "uMVMatrix");
            this.shader.rMatrixUniform = gl.getUniformLocation(this.shader, "uRMatrix");

            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
            gl.vertexAttribPointer(this.shader.vertexPositionAttribute,
                this.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
            //gl.vertexAttribPointer(OBJ1.shader.vertexPositionAttribute,
            //    this.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
          }
    }


    // =====================================================
    setMatrixUniforms() {
        if(this.shader != null) {
            // mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 10-1.0, pMatrix);
            mat4.identity(mvMatrix);
            mat4.translate(mvMatrix, distCENTER);
            mat4.multiply(mvMatrix, rotMatrix);

            gl.uniformMatrix4fv(this.shader.pMatrixUniform, false, pMatrix);
            gl.uniformMatrix4fv(this.shader.mvMatrixUniform, false, mvMatrix);
            gl.uniformMatrix4fv(this.shader.rMatrixUniform, false, rotMatrix);

            // gl.samplerParameterf(this.shader.samplerUniform, false, rotMatrix);
        }
    }

    // =====================================================
    draw() {
        gl.clear(gl.COLOR_BUFFER_BIT);
        if(this.shader != null) {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            this.setShaders();
            this.setMatrixUniforms();
            gl.drawElements(gl.TRIANGLES, this.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
            //gl.drawArrays(gl.TRIANGLE_FAN, 0, this.vertexBuffer.numItems);
        }
    }
}
