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


class Paper_Player
{
	constructor(index, gl, vs, fs)
	{
		this.index = index;
		this.pos = new Point(100, 80);
		this.vel = new Point();
		this.acc = new Point();
		this.acc.y = 0.01;
		this.frame = new Point();
		this.dt = 1/60;
		this.mirrored = 1;
		this.isGrounded = true;
		this.weight = 0.9;

		
		this.walk = new Sprite(gl, "img/paper_move.png", vs, fs, {width:16, height:16});
		this.special = new Sprite(gl, "img/paper_special.png", vs, fs, {width:16, height:16});
		this.idle = new Sprite(gl, "img/paper_idle.png", vs, fs, {width:16, height:16});
		this.attack = new Sprite(gl, "img/paper_attack.png", vs, fs, {width:16, height:16});
		
		this.curr = this.idle;
		this.currNum = 2;
	}
	
	update()
	{
		this.curr = this.idle;
		this.currNum = 2;
		
		if (Key.isDown(Key.UP)) this.movement(0);
		if (Key.isDown(Key.DOWN)) this.movement(1);
		if (Key.isDown(Key.LEFT)) this.movement(2);
		if (Key.isDown(Key.RIGHT)) this.movement(3);
		if (Key.isDown(Key.P)) this.movement(4);
		if (Key.isDown(Key.O)) this.movement(5);
		
		this.render();
	}
	
	movement(num)
	{
		if (num == 0 && this.pos.y == 80) //move up
		{
			this.acc.y = -13*(1/this.weight)
		}
		if (num == 1) // move down	
		{
			
		}
		if (num == 2) // move left
		{
			this.curr = this.walk;
			this.currNum = 0;
			this.mirrored = -1;
		}
		if (num == 3) // move right
		{
			this.curr = this.walk;
			this.currNum = 0;
			this.mirrored = 1;
		}
		if (num == 4) // special
		{
			this.curr = this.special;
			this.currNum = 1;
		}
		if (num == 5)
		{
			this.curr = this.attack;
			this.currNum = 3;
		}
	}
	
	render()
	{
		this.vel.y += this.acc.y * this.dt;
		this.pos.y += this.vel.y;
		this.acc.y+= this.weight;
		if (this.acc.y >0 && this.vel.y > this.weight*(1/20)){//fallspeed
			this.vel.y = this.weight*(1/20);
		}
		if (this.pos.y >= 80)
		{
			this.pos.y = 80;
		}
		
		if (this.acc.y >0 && this.pos.y >= 80){
		this.acc.y = 0;
		}
		
		if (this.mirrored == -1)
		{
			this.pos.x = 116;
		}
		else this.pos.x = 100;
		this.frame.x = ( new Date() * this.index.s_f_s[this.currNum][1]) % this.index.s_f_s[this.currNum][0];
		this.curr.render(this.pos, this.frame, this.mirrored);
	}
}

class Scissor_Player
{
	constructor(index, gl, vs, fs)
	{
		this.index = index;
		this.pos = new Point(100, 80);
		this.vel = new Point();
		this.acc = new Point();
		this.acc.y = 0.01;
		this.frame = new Point();
		this.dt = 1/60;
		this.mirrored = 1;
		this.isGrounded = true;
		this.weight = 1.2;

		
		this.walk = new Sprite(gl, "img/scissor_move.png", vs, fs, {width:16, height:16});
		this.special = new Sprite(gl, "img/scissor_special.png", vs, fs, {width:16, height:16});
		this.idle = new Sprite(gl, "img/scissor_idle.png", vs, fs, {width:16, height:16});
		this.attack = new Sprite(gl, "img/scissor_attack.png", vs, fs, {width:16, height:16})
		
		this.curr = this.idle;
		this.currNum = 2;
	}
	
	update()
	{
		this.curr = this.idle;
		this.currNum = 2;
		
		if (Key.isDown(Key.UP)) this.movement(0);
		if (Key.isDown(Key.DOWN)) this.movement(1);
		if (Key.isDown(Key.LEFT)) this.movement(2);
		if (Key.isDown(Key.RIGHT)) this.movement(3);
		if (Key.isDown(Key.P)) this.movement(4);
		if (Key.isDown(Key.O)) this.movement(5);
		
		this.render();
	}
	
	movement(num)
	{
		if (num == 0 && this.pos.y == 80) //move up
		{
			this.acc.y = -17*(1/this.weight);
		}
		if (num == 1) // move down	
		{
			
		}
		if (num == 2) // move left
		{
			this.curr = this.walk;
			this.currNum = 0;
			this.mirrored = -1;
		}
		if (num == 3) // move right
		{
			this.curr = this.walk;
			this.currNum = 0;
			this.mirrored = 1;
		}
		if (num == 4) // special
		{
			this.curr = this.special;
			this.currNum = 1;
		}
		if(num == 5) // attack
		{
			this.curr = this.attack;
			this.currNum = 3
		}
	}
	
	render()
	{
		this.vel.y += this.acc.y * this.dt;
		this.pos.y += this.vel.y;
		this.acc.y+= this.weight;
		
		if (this.acc.y >0 && this.vel.y > this.weight){
			this.vel.y = this.weight;
		}

		if (this.pos.y >= 80)
		{
			this.pos.y = 80;
		}
		
		if (this.acc.y >0 && this.pos.y >= 80){
		this.acc.y = 0;
		}
		
		if (this.mirrored == -1)
		{
			this.pos.x = 116;
		}
		else this.pos.x = 100;
		this.frame.x = ( new Date() * this.index.s_f_s[this.currNum][1]) % this.index.s_f_s[this.currNum][0];
		this.curr.render(this.pos, this.frame, this.mirrored);
	}
}

class Rock_Player
{
	constructor(index, gl, vs, fs)
	{
		this.index = index;
		this.pos = new Point(100, 80);
		this.vel = new Point();
		this.acc = new Point();
		this.acc.y = 0.01;
		this.frame = new Point();
		this.dt = 1/60;
		this.mirrored = 1;
		this.isGrounded = true;
		this.weight = 1.8;

		
		this.walk = new Sprite(gl, "img/rock_move.png", vs, fs, {width:16, height:16});
		this.special = new Sprite(gl, "img/rock_special.png", vs, fs, {width:16, height:16});
		this.idle = new Sprite(gl, "img/rock_idle.png", vs, fs, {width:16, height:16});
		this.attack = new Sprite(gl, "img/rock_attack.png", vs, fs, {width:16, height:16});
		
		this.curr = this.idle;
		this.currNum = 2;
	}
	
	update()
	{
		this.curr = this.idle;
		this.currNum = 2;
		
		if (Key.isDown(Key.UP)) this.movement(0);
		if (Key.isDown(Key.DOWN)) this.movement(1);
		if (Key.isDown(Key.LEFT)) this.movement(2);
		if (Key.isDown(Key.RIGHT)) this.movement(3);
		if (Key.isDown(Key.P)) this.movement(4);
		if (Key.isDown(Key.O)) this.movement(5);

		
		if (this.pos.x >= 80)
		{
			this.isGrounded == true;
		}
		this.render();
	}
	
	movement(num)
	{
		if (num == 0 && this.pos.y == 80) //move up
		{
			this.acc.y = -30*(1/this.weight);
		}
		if (num == 1) // move down	
		{
			
		}
		if (num == 2) // move left
		{
			this.curr = this.walk;
			this.currNum = 0;
			this.mirrored = -1;
		}
		if (num == 3) // move right
		{
			this.curr = this.walk;
			this.currNum = 0;
			this.mirrored = 1;
		}
		if (num == 4) // special
		{
			this.curr = this.special;
			this.currNum = 1;
		}
		if (num == 5)
		{
			this.curr = this.attack;
			this.currNum = 3;
		}
	}
	
	render()
	{
		this.vel.y += this.acc.y * this.dt;
		this.pos.y += this.vel.y;
		this.acc.y+= this.weight;

		if (this.pos.y >= 80)
		{
			this.pos.y = 80;
		}
		
		if (this.acc.y >0 && this.pos.y >= 80){
		this.acc.y = 0;
		}
		
		if (this.mirrored == -1)
		{
			this.pos.x = 116;
		}
		else this.pos.x = 100;
		this.frame.x = ( new Date() * this.index.s_f_s[this.currNum][1]) % this.index.s_f_s[this.currNum][0];
		this.curr.render(this.pos, this.frame, this.mirrored);
	}
}