
class Scissor_Minion
{
	constructor(index, gl, vs, fs)
	{
		this.index = index;
		this.pos = new Point(130, 88);
		this.frame = new Point();
		this.isAlive = true;
		
		this.walk = new Sprite(gl, "img/scissor_minion_move.png", vs, fs, {width:8, height:8});
		this.idle = new Sprite(gl, "img/scissor_minion_idle.png", vs, fs, {width:8, height:8});
		this.hitbox = new Hit_Box(this.pos.x, this.pos.y, 8, 8);
		
		this.curr = this.idle;
		this.currNum = 1;
		this.mirrored = -1;
	}
	
	update()
	{	
	if (this.isAlive == true)
	{
		this.curr = this.idle;
		this.currNum = 1;
		
		if(Math.abs(100-this.pos.x) < 128) { // instead of 35 you subtract 27 bc need from mid of character
			if(((73) < this.pos.x && this.mirrored == -1) || 127<=this.pos.x) {
				this.movement(-1);
			}
			if(((127) > this.pos.x && this.mirrored == 1) || 73>=this.pos.x) 
			{	
				this.movement(1);
			}
		} else {
			this.movement(0);
		}
				
		this.render();
	}
	}
	
	movement(num)
	{	
		if (num == 0)
		{
		}
		if (num == -1) //move left
		{
			this.curr = this.walk;
			this.currNum = 0;
			if (this.mirrored == 1)
			{
				this.pos.x += 10;
			}
			this.mirrored = -1;
			this.pos.x-=.5;
		}
		if (num == 1) // move right	
		{
			this.curr = this.walk;
			this.currNum = 0;
			if (this.mirrored == -1)
			{
				this.pos.x -= 10;
			}
			this.mirrored = 1;
			this.pos.x+=.5;
		}
		
		this.hitbox.translate(this.pos.x, this.pos.y);
	}
	
	render()
	{	
	
		this.frame.x = ( new Date() * this.index.s_f_s[this.currNum][1]) % this.index.s_f_s[this.currNum][0];
		this.curr.render(this.pos, this.frame, this.mirrored);
	}
}
class Plane{
	constructor(index, gl, vs, fs)
	{
		this.index = index;
		this.pos = new Point(200, 20);
		this.frame = new Point();
		this.idle = new Sprite(gl, "img/paper_airplane.png", vs, fs, {width:16, height:16});
	}
	update()
	{	
		this.curr = this.idle;
		this.currNum = 0;
		if (this.pos.y >=80){
			this.render();
			return 1;
		}
		else{
		if(Math.abs(100-this.pos.x) < 128) { // instead of 35 you subtract 27 bc need from mid of character
			if(((73) < this.pos.x && this.mirrored == -1) || 127<=this.pos.x)
			{
				this.movement(-1);
			}
			if(((127) > this.pos.x && this.mirrored == 1) || 73>=this.pos.x) 
			{	
				this.movement(1);
			}
		} else {
			this.movement(-1);
		}
		
		this.render();
		return 0;
	}}
	movement(num)
	{	
	if(this.pos.y < 80){
		
		
		if (num == -1) //move left
		{
			this.curr = this.idle;
			this.currNum = 0;
			if (this.mirrored == -1)
			{
				this.pos.x -= 5;
			}
			this.mirrored = 1;
			this.pos.x-=.5;
			this.pos.y+=0.2;
		}
		if (num == 1) // move right	
		{
			this.curr = this.idle;
			this.currNum = 0;
			if (this.mirrored == 1)
			{
				this.pos.x += 5;
			}
			this.mirrored = -1;
			this.pos.y+=0.2;
			this.pos.x+=.5;
	}
		}
	else{
		this.currNum = 1;
		this.curr = this.idle
		
	}
			//this.hitbox.translate(this.pos.x, this.pos.y);
	}
	render()
	{	
		this.frame.x = ( new Date() * this.index.s_f_s[this.currNum][1]) % this.index.s_f_s[this.currNum][0];
		this.curr.render(this.pos, this.frame, this.mirrored);
	}

}
class Pebble
{
	constructor(index, gl, vs, fs)
	{
		this.index = index;
		this.pos = new Point(140, 80);
		this.frame = new Point();
		this.isAlive = true;
		
		this.walk = new Sprite(gl, "img/pebble_move.png", vs, fs, {width:16, height:16});
		this.idle = new Sprite(gl, "img/pebble_move.png", vs, fs, {width:16, height:16});
		this.hitbox = new Hit_Box(this.pos.x, this.pos.y, 16, 16);
		
		this.curr = this.idle;
		this.currNum = 1;
		this.mirrored = -1;
	}
	
	update()
	{	
	if (this.isAlive == true)
	{
		this.curr = this.idle;
		this.currNum = 1;
		
		if(Math.abs(100-this.pos.x) < 128) { // instead of 35 you subtract 27 bc need from mid of character
			if(((73) < this.pos.x && this.mirrored == -1) || 127<=this.pos.x)
			{
				this.movement(-1);
			}
			if(((127) > this.pos.x && this.mirrored == 1) || 73>=this.pos.x) 
			{	
				this.movement(1);
			}
		} else {
			this.movement(0);
		}
		
		this.render();
	}
	}
	
	movement(num)
	{	
		if (num == 0)
		{
		}
		if (num == -1) //move left
		{
			this.curr = this.walk;
			this.currNum = 0;
			if (this.mirrored == 1)
			{
				this.pos.x += 15;
			}
			this.mirrored = -1;
			this.mirrored = -1;
			this.pos.x-=.5;
		}
		if (num == 1) // move right	
		{
			this.curr = this.walk;
			this.currNum = 0;
			if (this.mirrored == -1)
			{
				this.pos.x -= 15;
			}
			this.mirrored = -1;
			this.mirrored = 1;
			this.pos.x+=.5;
		}
		this.hitbox.translate(this.pos.x, this.pos.y);
	}
	
	render()
	{	
		this.frame.x = ( new Date() * this.index.s_f_s[this.currNum][1]) % this.index.s_f_s[this.currNum][0];
		this.curr.render(this.pos, this.frame, this.mirrored);
	}
}

class Boulder
{
	constructor(index, gl, vs, fs)
	{
		this.index = index;
		this.pos = new Point(485, 80);
		this.frame = new Point();

		
		this.attack = new Sprite(gl, "img/boulder_attack.png", vs, fs, {width:16, height:16});
		this.idle = new Sprite(gl, "img/boulder_idle.png", vs, fs, {width:16, height:16});
		this.hitbox = new Hit_Box(this.pos.x, this.pos.y, 16, 16);

		this.curr = this.idle;
		this.currNum = 1;
		this.mirrored = -1;
	}
	
	update()
	{	
		this.curr = this.idle;
		this.currNum = 1;
		
		if(Math.abs(100-this.pos.x) < 384) { // instead of 35 you subtract 27 bc need from mid of character
			if(((50) < this.pos.x && this.mirrored == -1) || 150<=this.pos.x)
			{
				// this.movement(0);
				this.movement(-1);
			}
			if(((160) > this.pos.x && this.mirrored == 1) || 50>=this.pos.x)
			{	
				// this.movement(0);
				this.movement(1);
			}
		} else {
			this.movement(0);
		}

		this.render();
	}
	
	movement(num)
	{	
		if (num == 0)
		{
		}
		if (num == -1) //move left
		{
			this.curr = this.attack;
			this.currNum = 0;
			this.mirrored = -1;
			this.pos.x--;
		}
		if (num == 1) // move right	
		{
			this.curr = this.attack;
			this.currNum = 0;
			this.mirrored = 1;
			this.pos.x++;
		}
		this.hitbox.translate(this.pos.x, this.pos.y);
	}
	
	render()
	{	
		this.frame.x = ( new Date() * this.index.s_f_s[this.currNum][1]) % this.index.s_f_s[this.currNum][0];
		this.curr.render(this.pos, this.frame, this.mirrored);
	}
}