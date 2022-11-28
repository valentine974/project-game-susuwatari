

class Platform {
    constructor(img,x, y, width, height) {
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y; 
      this.img = img;
      // this.color = color;
    }  
  
    draw() {
      const ctx = gameLandscape.context; 
      // ctx.fillStyle = this.color;
      // ctx.fillRect(this.x, this.y, this.width, this.height);
      // ctx.strokeStyle = '#96496c';
      // ctx.lineWidth= 5;
      // ctx.strokeRect(this.x, this.y, this.width, this.height);
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
     
   
  }