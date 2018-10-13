var player = {
	construct: function(index, gl, vs, fs) {
		this.index = index;
		this.pos = Point.construct();
		this.frame = Point.construct();
		this.mirrored = 1;

		this.walk = 
		this.run = 
		this.attack = 
		this.hit =
		this.idle = 
		this.react = 
		this.death = 

		this.current = this.idle;
	},
	update: function() {
		this.current = this.idle;

		if (Keys.isDown(Keys.up)) this.movement(0);
		if (Keys.isDown(Keys.down)) this.movement(1);
		if (Keys.isDown(Keys.left)) this.movement(2);
		if (Keys.isDown(Keys.right)) this.movement(3);
		if (Keys.isDown(Keys.leftClick)) this.movement(4);
		if (Keys.isDown(Keys.rightClick)) this.movement(5);
	}
}