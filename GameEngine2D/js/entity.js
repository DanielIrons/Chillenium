class SpriteIndex
{
	constructor()
	{
		this.s_f_s = new Array();
	}
	
	addSprite(frame, speed)
	{
		this.s_f_s.push([frame, speed]);
	}
}

var Key = {
  _pressed: {},

  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  Q: 81,
  
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

class Player
{
	constructor(index, gl, vs, fs)
	{
		this.index = index;
		this.pos = new Point();
		this.frame = new Point();
		this.mirrored = 1;

		
		this.skelly_walk = new Sprite(gl, "img/skellywalk.png", vs, fs, {width:22, height:32});
		this.skelly_death = new Sprite(gl, "img/skellydeath.png", vs, fs, {width:33, height:31});
		this.skelly_attack = new Sprite(gl, "img/skellyattack.png", vs, fs, {width:43, height:36});
		this.skelly_hit = new Sprite(gl, "img/skellyhit.png", vs, fs, {width:30, height:32});
		this.skelly_idle = new Sprite(gl, "img/skellyidle.png", vs, fs, {width:24, height:32});
		this.skelly_react = new Sprite(gl, "img/skellyreact.png", vs, fs, {width:22, height:32});
		
		this.curr = this.skelly_idle;
		this.currNum = 4;
	}
	
	update()
	{
		this.curr = this.skelly_idle;
		this.currNum = 4;
		
		if (Key.isDown(Key.UP)) this.movement(0);
		if (Key.isDown(Key.DOWN)) this.movement(1);
		if (Key.isDown(Key.LEFT)) this.movement(2);
		if (Key.isDown(Key.RIGHT)) this.movement(3);
		if (Key.isDown(Key.Q)) this.movement(4);
		
		
		this.render();
	}
	
	movement(num)
	{
		if (num == 0) //move up
		{
			this.pos.y -= 1;
		}
		if (num == 1) // move down	
		{
			this.pos.y += 1;
		}
		if (num == 2) // move left
		{
			this.pos.x -= 1;
			this.curr = this.skelly_walk;
			this.currNum = 0;
			if (this.mirrored == 1)
			{
				this.pos.x = this.pos.x + 16;
			}
			this.mirrored = -1;
		}
		if (num == 3) // move right
		{
			this.pos.x += 1;
			this.curr = this.skelly_walk;
			this.currNum = 0;
			if (this.mirrored == -1)
			{
				this.pos.x = this.pos.x - 16;
			}
			this.mirrored = 1;
		}
		if (num == 4) // attack
		{
			this.curr = this.skelly_attack;
			this.currNum = 2;
		}
	}
	
	render()
	{
		this.frame.x = ( new Date() * this.index.s_f_s[this.currNum][1]) % this.index.s_f_s[this.currNum][0];
		this.curr.render(this.pos, this.frame, this.mirrored);
	}
}