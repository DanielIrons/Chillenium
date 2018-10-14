
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


class PlayerAttackBoxes
{
	constructor (x, y, w, h, x2, y2, w2, h2)
	{
		this.LeftRect = new Rect(x,y,w,h);
		this.RightRect = new Rect(x2,y2,w2,h2);
	}
}
