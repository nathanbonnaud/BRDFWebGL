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
        // this.initTexture();

    }

    initBuffers() {
        var ks = 5;
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

            -1.0*ks, -1.0*ks, 1.0*ks,
            1.0*ks, -1.0*ks,  1.0*ks,
            1.0*ks, -1.0*ks, -1.0*ks,
            1.0*ks, -1.0*ks, -1.0*ks,
            -1.0*ks, -1.0*ks,  -1.0*ks,
            -1.0*ks, -1.0*ks,  1.0*ks
        ];

        this.vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        this.vertexBuffer.itemSize = 3;
        this.vertexBuffer.numItems = 36;

        ks = 1.0;
        // Texture coords (array)
        var texcoords = [
            // positions
            -1.0*ks, 1.0*ks,
            -1.0*ks, -1.0*ks,
            1.0*ks, -1.0*ks,
            1.0*ks, -1.0*ks,
            1.0*ks, 1.0*ks,
            -1.0*ks, 1.0*ks,


            -1.0*ks, 1.0*ks,
            -1.0*ks, -1.0*ks,
            1.0*ks, -1.0*ks,
            1.0*ks, -1.0*ks,
            1.0*ks, 1.0*ks,
            -1.0*ks, 1.0*ks,

            -1.0*ks, 1.0*ks,
            -1.0*ks, -1.0*ks,
            1.0*ks, -1.0*ks,
            1.0*ks, -1.0*ks,
            1.0*ks, 1.0*ks,
            -1.0*ks, 1.0*ks,

            -1.0*ks, 1.0*ks,
            -1.0*ks, -1.0*ks,
            1.0*ks, -1.0*ks,
            1.0*ks, -1.0*ks,
            1.0*ks, 1.0*ks,
            -1.0*ks, 1.0*ks,

            -1.0*ks, 1.0*ks,
            -1.0*ks, -1.0*ks,
            1.0*ks, -1.0*ks,
            1.0*ks, -1.0*ks,
            1.0*ks, 1.0*ks,
            -1.0*ks, 1.0*ks,

            -1.0*ks, 1.0*ks,
            -1.0*ks, -1.0*ks,
            1.0*ks, -1.0*ks,
            1.0*ks, -1.0*ks,
            1.0*ks, 1.0*ks,
            -1.0*ks, 1.0*ks,

            // -1.0*ks, -1.0*ks,
            // -1.0*ks, -1.0*ks,
            // -1.0*ks, 1.0*ks,
            // -1.0*ks, 1.0*ks,
            // -1.0*ks, 1.0*ks,
            // -1.0*ks, -1.0*ks,
            //
            // 1.0*ks, -1.0*ks,
            // 1.0*ks, -1.0*ks,
            // 1.0*ks, 1.0*ks,
            // 1.0*ks, 1.0*ks,
            // 1.0*ks, 1.0*ks,
            // 1.0*ks, -1.0*ks,
            //
            // -1.0*ks, -1.0*ks,
            // -1.0*ks, 1.0*ks,
            // 1.0*ks, 1.0*ks,
            // 1.0*ks, 1.0*ks,
            // 1.0*ks, -1.0*ks,
            // -1.0*ks, -1.0*ks,
            //
            // -1.0*ks, 1.0*ks,
            // 1.0*ks, 1.0*ks,
            // 1.0*ks, 1.0*ks,
            // 1.0*ks, 1.0*ks,
            // -1.0*ks, 1.0*ks,
            // -1.0*ks, 1.0*ks,
            //
            // -1.0*ks, -1.0*ks,
            // -1.0*ks, -1.0*ks,
            // 1.0*ks, -1.0*ks,
            // 1.0*ks, -1.0*ks,
            // -1.0*ks, -1.0*ks,
            // 1.0*ks, -1.0*ks
        ];
        this.texCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords), gl.STATIC_DRAW);
        this.texCoordBuffer.itemSize = 2;
        this.texCoordBuffer.numItems = 36;

        // Index buffer (array)
        var indices = [ 0, 1, 2, 3 , 4 ,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35];
        this.indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
        this.indexBuffer.itemSize = 1;
        this.indexBuffer.numItems = indices.length;

    }
    initTexture()
    {
        if(this.shader != null) {

            // var nameText = ["textures/positiveXPurple.png",
            //     "textures/negativeYPurple.png",
            //     "textures/positiveYPurple.png",
            //     "textures/negativeYPurple.png",
            //     "textures/positiveZPurple.png",
            //     "textures/negativeZPurple.png"];

            var nameText = ["textures/skybox/right.jpg",
                "textures/skybox/left.jpg",
                "textures/skybox/top.jpg",
                "textures/skybox/bottom.jpg",
                "textures/skybox/front.jpg",
                "textures/skybox/back.jpg"];

            let texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

            var texImage = [new Image(),new Image(),new Image(),new Image(),new Image(),new Image()];

            for(let i=0; i<6; i++){
                texImage[i].src = nameText[i];
                texImage[i].onload = function () {
                    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
                    gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texImage[i]);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                    gl.uniform1i(this.shader.samplerUniform, 0);
                    gl.activeTexture(gl.TEXTURE0);
                    // gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
                    // gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + face, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
                    // gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
                }
            }

            // gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
            // gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE);


        }
    }

    // =====================================================
    setShaders() {
        if(this.shader != null) {
            gl.useProgram(this.shader);

            this.shader.vertexPositionAttribute = gl.getAttribLocation(this.shader, "aVertexPosition");
            gl.enableVertexAttribArray(this.shader.vertexPositionAttribute);

            this.shader.texCoordsAttribute = gl.getAttribLocation(this.shader, "texCoords");
            gl.enableVertexAttribArray(this.shader.texCoordsAttribute);
            this.shader.samplerUniform = gl.getUniformLocation(this.shader, "uSkybox");

            this.shader.pMatrixUniform = gl.getUniformLocation(this.shader, "uPMatrix");
            this.shader.mvMatrixUniform = gl.getUniformLocation(this.shader, "uMVMatrix");

            this.shader.rMatrixUniform = gl.getUniformLocation(this.shader, "uRMatrix");

            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
            gl.vertexAttribPointer(this.shader.vertexPositionAttribute,
                this.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
            gl.vertexAttribPointer(this.shader.texCoordsAttribute,
                this.texCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
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
            if(this.init === 0){
                this.init++;
                this.initTexture();
            }
            // gl.activeTexture(gl.TEXTURE0);
            // gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.texture);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

            this.setShaders();
            // this.initTexture();
            this.setMatrixUniforms();

            gl.drawElements(gl.TRIANGLES, this.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
            //gl.drawArrays(gl.TRIANGLE_FAN, 0, this.vertexBuffer.numItems);
        }
    }
}
// this.vshader = gl.createShader(gl.VERTEX_SHADER);
// gl.shaderSource(this.vshader, vShaderTxt);
// gl.compileShader(this.vshader);
// if (!gl.getShaderParameter(this.vshader, gl.COMPILE_STATUS)) {
//     console.log(gl.getShaderInfoLog(this.vshader));
//     return null;
// }
//
// this.fshader = gl.createShader(gl.FRAGMENT_SHADER);
// gl.shaderSource(this.fshader, fShaderTxt);
// gl.compileShader(this.fshader);
// if (!gl.getShaderParameter(this.fshader, gl.COMPILE_STATUS)) {
//     console.log(gl.getShaderInfoLog(this.fshader));
//     return null;
// }
//
// this.shader = gl.createProgram();
// gl.attachShader(this.shader, this.vshader);
// gl.attachShader(this.shader, this.fshader);
//
// gl.linkProgram(this.shader);
//
// if (!gl.getProgramParameter(this.shader, gl.LINK_STATUS)) {
//     console.log("Could not initialise shaders");
// }