var Keys = {
  _pressed: {},

  left: 65,		//"A"
  up: 87,		//"W"
  right: 68,	//"D"
  down: 83,		//"S"
  ordinary: 79,	//"O"
  power: 80,	//"P"
  space: 32,	//" "
  
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
		if (Keys.isDown(Keys.ordinary)) this.movement(4);
		if (Keys.isDown(Keys.power)) this.movement(5);
		if (Keys.isDown(Keys.space)) this.movement(6);
	}
	movement: function() {
		if(num==0 || num==6) {
			//move up
		}
		if(num==1) {
			//move down
		}
		if(num==2) {
			//move left
		}
		if(num==3) {
			//move right
		}
		if(num==4) {
			//ordinary attack
		}
		if(num==5) {
			//power attack
		}
	}
	render: function() {
		//render
	}
}