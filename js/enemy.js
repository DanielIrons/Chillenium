class Scissor_Minion
{
	constructor(index, gl, vs, fs)
	{
		this.index = index;
		this.pos = new Point(130, 88);
		this.frame = new Point();

		
		this.walk = new Sprite(gl, "img/scissor_minion_move.png", vs, fs, {width:8, height:8});
		this.idle = new Sprite(gl, "img/scissor_minion_idle.png", vs, fs, {width:8, height:8});
		
		this.curr = this.idle;
		this.currNum = 1;
		this.mirrored = -1;
	}
	
	update()
	{	
		this.curr = this.idle;
		this.currNum = 1;
		
		if(Math.abs(100-this.pos.x) < 128) { // instead of 35 you subtract 27 bc need from mid of character
			if(((73) < this.pos.x && this.mirrored == -1) || 127<=this.pos.x) {
				console.log('moving left..');
				this.movement(-1);
			}
			if(((127) > this.pos.x && this.mirrored == 1) || 73>=this.pos.x) 
			{	
				console.log('moving right..');
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
			this.curr = this.walk;
			this.currNum = 0;
			this.mirrored = -1;
			this.pos.x--;
		}
		if (num == 1) // move right	
		{
			this.curr = this.walk;
			this.currNum = 0;
			this.mirrored = 1;
			this.pos.x++;
		}
	}
	
	render()
	{	
		this.frame.x = ( new Date() * this.index.s_f_s[this.currNum][1]) % this.index.s_f_s[this.currNum][0];
		this.curr.render(this.pos, this.frame, this.mirrored);
	}
}