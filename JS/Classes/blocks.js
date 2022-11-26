class Blocks {
    constructor(color, x, y, width, height) {
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y; 
      this.color = color;
    }
  
    update() {
      const ctx = gameLandscape.context; 
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
   
  }