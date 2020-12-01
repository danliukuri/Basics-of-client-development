function Ball(x, y, velX, velY, color, size)
{
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}
Ball.prototype.draw = function()
{
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
  ctx.fill();
};
Ball.prototype.update = function() {
  if((this.x + this.size) >= width)
  { 
    this.velX = -this.velX;
    displayMessage(this.color + " ball collided with the right");
  }
  if((this.x - this.size) <= 0)
  { 
    this.velX = -this.velX;
    displayMessage(this.color + " ball collided with the left");
  }
  if((this.y + this.size) >= height)
  { 
    this.velY = -this.velY;
    displayMessage(this.color + " ball collided with the bottom");
  }
  if((this.y - this.size) <= 0)
  { 
    this.velY = -this.velY;
    displayMessage(this.color + " ball collided with the top");
  }
  this.x += this.velX;
  this.y += this.velY;
};
Ball.prototype.collisionDetect = function()
{
    let next;
    for(let j = 0; j < balls.length; j++)
    {
        if(!(this === balls[j]) && !(this === next))
        {
            const dx = this.x-balls[j].x;
            const dy = this.y-balls[j].y;
            const distance = Math.sqrt(dx*dx+dy*dy);
            if(distance < this.size + balls[j].size)
            {
                this.velX = -this.velX;
                this.velY = -this.velY;
                this.x += this.velX;
                this.y += this.velY;
                balls[j].velX = -balls[j].velX;
                balls[j].velY = -balls[j].velY;
                balls[j].x += balls[j].velX;
                balls[j].y += balls[j].velY;
                next = balls[j];
                displayMessage("balls collided");
            }
        }
    }
};