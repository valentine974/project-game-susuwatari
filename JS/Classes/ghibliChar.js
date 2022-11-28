class GhibliChar {
    constructor(imageOne,imageTwo, x, y, width, height) {
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
      this.speedX = 0;
      this.speedY = 0;
      this.img1 = imageOne;
      this.img2 = imageTwo;
    }
  
    update() {
      const ctx = gameLandscape.context;
      if(gameLandscape.time%2===0){ ctx.drawImage(this.img1, this.x, this.y, this.width, this.height); }
      else {ctx.drawImage(this.img2, this.x, this.y, this.width, this.height); }
    }
  
    newPos() {
      this.x += this.speedX;
      this.y += this.speedY;
      
  }

  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }
}