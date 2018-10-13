function loop() {
	window.game.update();
	requestAnimationFrame(loop);
}

Game = {
	construct: function() {
		this.canvas = document.getElementById('canvas');

		this.worldSpaceMatrix = new M3x3();

		this.gl = this.canvas.getContext('webgl2');
		this.gl.clearColor(1.0, 0.6, 0.2, 0.0);

		let vShader = vertexShader();
		let fShader = fragShader();

		this.guyIndex = new SpriteIndex();
		this.guyIndex.addSprite(12,0.01);
		this.guyIndex.addSprite(12,0.01);
		this.guyIndex.addSprite(12,0.01);
		this.guyIndex.addSprite(12,0.01);
		this.guyIndex.addSprite(12,0.01);
		this.guyIndex.addSprite(12,0.01);

		this.player = new Player(this.guyIndex, this.gl, vShader, fShader);
	},

	update: function() {
		this.gl.viewport(0,0, this.canvasElem.width, this.canvasElem.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);		
		
		this.player.update();
		
		this.gl.flush();
	}
}