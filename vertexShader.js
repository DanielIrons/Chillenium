function vertexShader() {
	var vertexShader = `#version 300 es
		precision highp float;
		in vec2 a_position;
		in vec2 a_texCoord;

		out vec2 v_texCoord;
		uniform vec2 u_resolution;
		uniform vec2 u_translation;

		void main(void){
			vec2 position = a_position + u_translation;
			vec2 zeroToOne = position / u_resolution;
			vec2 zeroToTwo = zeroToOne * 2.0;
			vec2 clipSpace = zeroToTwo - 1.0;

			gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
			v_texCoord = a_texCoord;
		}`;
	return vertexShader;
}