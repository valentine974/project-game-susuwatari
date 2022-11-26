class ghibliChar {
    constructor(image, x, y, width, height) {
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
      this.speedX = 0;
      this.speedY = 1;
      this.img = image;
    }
  
    update() {
      const ctx = gameLandscape.context;
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  
    newPos() {
      this.x += this.speedX;
      this.y += this.speedY;
      if(this.y + this.height + this.speedY <245+this.height) { this.speedY += gravity}
      else { this.speedY = 0}
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