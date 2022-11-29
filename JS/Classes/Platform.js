

class Platform {
    constructor(img,x, y, width, height) {
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y; 
      this.img = img; 
    }  
  
    draw() {
      const ctx = gameLandscape.context;  
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
     
   
  }