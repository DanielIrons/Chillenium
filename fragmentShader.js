function fragmentShader() {
	var fragmentShader = `#version 300 es
		precision highp float;

		uniform sampler2D u_image;
		in vec2 v_texCoord;

		out vec4 outputColor;
		
		void main(void) {
			outputColor = texture(u_image, v_texCoord);
		}`;
	return fragmentShader;
}