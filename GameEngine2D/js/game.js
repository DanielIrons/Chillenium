function loop()
{
	window.game.update();
	requestAnimationFrame(loop);
}

class Game
{
	constructor()
	{
		this.canvasElem = document.createElement("canvas");
		this.canvasElem.width = 800;
		this.canvasElem.height = 600;
		
		this.worldSpaceMatrix = new M3x3();
		
		this.gl = this.canvasElem.getContext("webgl2");
		this.gl.clearColor(1.0, 0.6, 0.2, 0.0);
		
		document.body.appendChild(this.canvasElem);
		
		let vs = document.getElementById("vs_01").innerHTML;
		let fs = document.getElementById("fs_01").innerHTML;
		
		
		this.skelly_index = new SpriteIndex();
		this.skelly_index.addSprite(13, 0.02);
		this.skelly_index.addSprite(15, 0.01);
		this.skelly_index.addSprite(18, 0.02);
		this.skelly_index.addSprite(8, 0.01);
		this.skelly_index.addSprite(11, 0.01);
		this.skelly_index.addSprite(4, 0.01);
		
		this.player = new Player(this.skelly_index, this.gl, vs, fs);
	}
	
	resize(x,y)
	{
		this.canvasElem.width = x;
		this.canvasElem.height = y;
		
		let wRatio = x / (y/240);
		this.worldSpaceMatrix = new M3x3().transition(-1, 1).scale(2/wRatio, -2/240);
	}
	
	update()
	{
		this.gl.viewport(0,0, this.canvasElem.width, this.canvasElem.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
		
		this.gl.enable(this.gl.BLEND);
		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
		
		
		this.player.update();
		//this.player.render();
		
		this.gl.flush();
	}
}