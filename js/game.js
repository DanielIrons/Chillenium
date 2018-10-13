function loop()
{
	window.game.update();
	requestAnimationFrame(loop);
}

var Key = {
  _pressed: {},

  LEFT: 65,
  UP: 87,
  RIGHT: 68,
  DOWN: 83,
  O: 79,
  P: 80,
  J: 74,
  K: 75,
  L: 76,
  
  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },
  
  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
  },
  
  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
};

class Game
{
	constructor()
	{
		this.canvasElem = document.createElement("canvas");
		this.canvasElem.width = 64;
		this.canvasElem.height = 64;
		
		this.worldSpaceMatrix = new M3x3();
		
		this.gl = this.canvasElem.getContext("webgl2");
		this.gl.clearColor(0.5, 0.5, 0.8, 0.0);
		
		document.body.appendChild(this.canvasElem);
		
		let vs = document.getElementById("vs_01").innerHTML;
		let fs = document.getElementById("fs_01").innerHTML;
		
		this.mountains = new Sprite(this.gl, "img/mountains.png", vs, fs, {width: 768, height: 128});
		this.mount_pos = new Point(-64, 0);
		this.bg_frames = new Point();
		
		this.trees = new Sprite(this.gl, "img/trees.png", vs, fs, {width: 768, height: 128});
		this.trees_pos = new Point(-384, 0);
		
		this.hills = new Sprite(this.gl, "img/hills.png", vs, fs, {width: 768, height: 128});
		this.hills_pos = new Point(-384, 0);
		
		this.grass = new Sprite(this.gl, "img/grass.png", vs, fs, {width: 768, height: 128});
		this.grass_pos = new Point(-384, 0);
		
		this.title = new Sprite(this.gl, "img/title.png", vs, fs, {width: 128, height: 128});
		this.title_pos = new Point(50, 0);

		this.paper_index = new SpriteIndex();
		this.paper_index.addSprite(12, 0.02); // move
		this.paper_index.addSprite(); // special
		this.paper_index.addSprite(2, 0.003); // idle
		this.paper_index.addSprite(9, 0.02); // attack
		this.paper_player = new Paper_Player(this.paper_index, this.gl, vs, fs);
		
		this.rock_index = new SpriteIndex();
		this.rock_index.addSprite(4, 0.008); // move
		this.rock_index.addSprite(4, 0.02); // special
		this.rock_index.addSprite(2, 0.003); // idle
		this.rock_index.addSprite(5, 0.02); // attack
		this.rock_player = new Rock_Player(this.rock_index, this.gl, vs, fs);
		
		this.scissor_index = new SpriteIndex();
		this.scissor_index.addSprite(8, 0.01); // move
		this.scissor_index.addSprite(9, 0.02); // special
		this.scissor_index.addSprite(4, 0.01); // idle
		this.scissor_index.addSprite(3, 0.006); // attack
		this.scissor_player = new Scissor_Player(this.scissor_index, this.gl, vs, fs);
		
		this.scissor_minion_index = new SpriteIndex();
		this.scissor_minion_index.addSprite(4, 0.005); // move
		this.scissor_minion_index.addSprite(1, 0.001); // idle
		this.scissor_minion = new Scissor_Minion(this.scissor_minion_index, this.gl, vs, fs);

		this.character = 0;
	}
	
	resize(x,y)
	{
		this.canvasElem.width = x;
		this.canvasElem.height = y;
		
		let wRatio = x / (y/240);
		this.worldSpaceMatrix = new M3x3().transition(-1, 1).scale(2/wRatio, -2/240);
	}
	
	move(num)
	{
		if (num == 0)
		{
			this.mount_pos.x += 0.25;
			this.trees_pos.x += 0.375;
			this.hills_pos.x += 0.5;
			this.grass_pos.x += 1;
			this.title_pos.x += 1;
			if (this.grass_pos.x > 0)
			{
				this.grass_pos.x -= 128;
			}
			if (this.hills_pos.x > 0)
			{
				this.hills_pos.x -= 128;
			}
			if (this.trees_pos.x > 0)
			{
				this.trees_pos.x -= 128;
			}
			if (this.mount_pos.x > 0)
			{
				this.mount_pos.x -= 128;
			}
			
		}
		if (num == 1)
		{
			this.mount_pos.x -= 0.25;
			this.trees_pos.x -= 0.375;
			this.hills_pos.x -= 0.5;
			this.grass_pos.x -= 1;
			this.title_pos.x -= 1;
			if (this.grass_pos.x < -128)
			{
				this.grass_pos.x += 128;
			}
			if (this.hills_pos.x < -256)
			{
				this.hills_pos.x += 128;
			}
			if (this.trees_pos.x < -256)
			{
				this.trees_pos.x += 128;
			}
			if (this.mount_pos.x < -128)
			{
				this.mount_pos.x += 128;
			}

		}
	
	}
	
	update()
	{
		this.gl.viewport(0,-510, this.canvasElem.width * 1.5, this.canvasElem.height * 1.5); // scales and moves the canvas
		this.gl.clear(this.gl.COLOR_BUFFER_BIT); // bg color
		
		// allows transparency
		this.gl.enable(this.gl.BLEND);
		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA); 
		
		if (Key.isDown(Key.LEFT)) this.move(0);
		if (Key.isDown(Key.RIGHT)) this.move(1);
		
		this.mountains.render(this.mount_pos, this.bg_frames, 1);
		this.trees.render(this.trees_pos, this.bg_frames, 1);
		this.hills.render(this.hills_pos, this.bg_frames, 1);
		
		
		if (Key.isDown(Key.J))
			this.character = 0;
		
		if (Key.isDown(Key.K))
			this.character = 1;
		
		if (Key.isDown(Key.L))
			this.character = 2;
		
		
		if (this.character == 0)
		{
			this.paper_player.update();
		}
		else if (this.character == 1)
		{
			this.rock_player.update();
		}
		else if (this.character == 2)
		{
			this.scissor_player.update();
		}
		
		this.scissor_minion.update();
		this.title.render(this.title_pos, this.bg_frames, 1);
		this.grass.render(this.grass_pos, this.bg_frames, 1);

		
		

		
		this.gl.flush();
	}
}