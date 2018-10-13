function main(canvasID) {
	moveRect(canvasID)
}

function moveRect(canvasID) {
	var image = new Image();
	image.src = "MINICLIP_POSTER.png";
	var image2 = new Image();
	image2.src = "pixels.png";
	image.onload = function() {
		render(image, 0);
		render(image2, 0);
		requestID = requestAnimationFrame(animate(pos, 5));	
	}
}

function animate(pos, pixelsPer) {
	render(image, 0);
	render(image2, pos);
	pos+=pixelsPer;
}

function render(image, leftSet) {
	var canvas = document.getElementById("glcanvas");
	var gl = canvas.getContext("webgl2");
	if (!gl) {
	return;
	}

	resizeCanvas(gl.canvas, innerWidth, innerHeight);

	var program = createProgram(gl, vertexShader(), fragmentShader());

	var positionLocation = gl.getAttribLocation(program, "a_position");
	var texcoordLocation = gl.getAttribLocation(program, "a_texCoord");

	var positionBuffer = gl.createBuffer();

	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

	setRectangle(gl, 0, 0, image.width, image.height);

	var texcoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
	  0.0,  0.0,
	  1.0,  0.0,
	  0.0,  1.0,
	  0.0,  1.0,
	  1.0,  0.0,
	  1.0,  1.0,
	]), gl.STATIC_DRAW);

	// Create a texture.
	var texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, texture);

	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

	var resolutionLocation = gl.getUniformLocation(program, "u_resolution");
	var translationLocation = gl.getUniformLocation(program, "u_translation");
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

	

	gl.useProgram(program);

	gl.enableVertexAttribArray(positionLocation);

	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

	var size = 2;
	var type = gl.FLOAT;
	var normalize = false;
	var stride = 0;
	var offset = 0;
	gl.vertexAttribPointer(positionLocation, size, type, normalize, stride, offset)

	gl.enableVertexAttribArray(texcoordLocation);

	gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);

	var size = 2;
	var type = gl.FLOAT;
	var normalize = false;
	var stride = 0;
	var offset = 0;
	gl.vertexAttribPointer(texcoordLocation, size, type, normalize, stride, offset)
	gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
	gl.uniform2f(translationLocation, leftSet, 0);

	var primitiveType = gl.TRIANGLES;
	var offset = 0;
	var count = 6;
	gl.drawArrays(primitiveType, offset, count);

	gl.clear(gl.DEPTH_BUFFER_BIT);
}

function setRectangle(gl, x, y, width, height) {
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
}

function resizeCanvas(canvas, width, height) {
	canvas.width = width - 10;
	canvas.height = height - 10;
}

function createShader(gl, type, src) {
	var shader = gl.createShader(type);
	gl.shaderSource(shader, src);
	gl.compileShader(shader);
	var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	if (!compiled) {
	  console.log(gl.getShaderInfoLog(shader));
	  return null;
	}
	return shader;
}

function createProgram(gl, vertexShaderSrc, fragmentShaderSrc) {
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



main('glcanvas');