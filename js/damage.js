
class Rect
{
	constructor(x, y, w, h)
	{
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
}

class Circ
{
	constructor(x, y, r)
	{
		this.x = x;
		this.y = y;
		this.r = r;
	}
	
}


class PlayerAttackCircs
{
	constructor (x, y, r, x2, y2, r2)
	{
		this.LeftCirc = new Circ(x,y,r);
		this.RightCirc = new Circ(x2,y2,r2);
	}
	
	translateUp(y)
	{
		this.LeftCirc.y = y;
		this.RightCirc.y = y;
	}
	
	check_collisions(enemyList, mirrored)
	{
		for(var i = 0; i < enemyList.length; i++)
		{
			if (enemyList[i].isAlive == true)
			{
<<<<<<< HEAD
				this.Rect1 = this.LeftRect;
			}
			this.Rect2 = enemyList[i].hitbox.hitbox;
			
			if ((this.Rect1.x < this.Rect2.x + this.Rect2.w) &&
				(this.Rect1.x + this.Rect1.w > this.Rect2.x) &&
				(this.Rect1.y < this.Rect2.y + this.Rect2.h) &&
				(this.Rect1.y + this.Rect1.h > this.Rect2.y))
				{
					// deal damage to enemy...

					enemyList[i].isAlive = false;
=======
				if (mirrored == false)
				{
					this.Circ1 = this.RightCirc;
					console.log(this.Circ1);
				}
				else 
				{
					this.Circ1 = this.LeftCirc;
					this.Circ1 = this.RightCirc;
					console.log(this.Circ1);
				}
				this.Circ2 = enemyList[i].hitbox.hitbox;
				
				this.dx = this.Circ1.x - this.Circ2.x;
				this.dy = this.Circ1.y - this.Circ2.y;
				this.dist = Math.sqrt(this.dx * this.dx + this.dy + this.dy);
				
				if (this.dist < this.Circ1.r + this.Circ2.r)
				{
					// deal damage to enemy...
					//console.log("collision detected! ... \n");
					enemyList[i].deal_damage(2);
					return true;
>>>>>>> c7fd19d256c08fb12dd58a645092db30ad0fedf4
				}
			}
		}
		return false;
	}
}

class Hit_Circ
{
	constructor (x,y,r)
	{
		this.hitbox = new Circ(x, y, r);
	}
	
	translate(x,y)
	{
		this.hitbox.x = x;
		this.hitbox.y = y;
	}
}


class Hit_Box
{
	constructor (x,y,w,h)
	{
		this.hitbox = new Rect(x,y,w,h);
	}
	
	translate(x,y)
	{
		this.hitbox.x = x;
		this.hitbox.y = y;
	}
}
