var Sprite = {
	construct: function(gl, img, vs, fs, opts={}) {
		this.gl = gl;
		this.isLoaded = false;
		//this.material = new Materials(gl,vs,fs);

		this.size = Point(64, 64);

		this.image = new Image();
		this.image.src = img;
		this.image.sprite = this;
		this.image.onload = function() {
			this.sprite.setup();
		}
	},
	setRectangle: function(gl, x, y, width, height) {
		var x1 = x;
		var x2 = x + width;
		var y1 = y;
		var y2 = y + height;
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
			x1, y1,
			x2, y1,
			x1, y2,
			x1, y2,
			x2, y1,
			x2, y2,
		]), gl.STATIC_DRAW);
	},

	setup: function() {
		var gl = this.gl;
		gl.useProgram(fcreateProgram(gl, vertexShader(), fragShader()));
		var texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, texture);

		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

		t
	},

	createShader: function(gl, type, src) {
		var shader = gl.createShader(type);
		gl.shaderSource(shader, src);
		gl.compileShader(shader);
		var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
		if (!compiled) {
		  console.log(gl.getShaderInfoLog(shader));
		  return null;
		}
		return shader;
	},

	fcreateProgram: function(gl, vertexShaderSrc, fragmentShaderSrc) {
		var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSrc),
			fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSrc);
		var program = gl.createProgram();
		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragShader);
		gl.linkProgram(program);

		var success = gl.getProgramParameter(program, gl.LINK_STATUS);
		if(!success) {
			return null;
		}
		return program;
	}
}