class Sprite {
  constructor(pos, color) {
    this.position = pos;
    this.color = color;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, 10, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  update(){
    this.draw();
    if (this.position.y < canvas.height - 20) this.position.y += 10;
  }
}
