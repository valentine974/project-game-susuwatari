
const trainPartOne = new Image();
trainPartOne.src = "../Pictures/Train final.png"; 

const landscapeImage = {
    img: trainPartOne,
    height: 400,
    width: 3680, 
    x: 0, 
    speed: 0, // input the player's speed to moove the background Image
    canvas: gameLandscape.canvas,
  
    move: function () { 
      if(this.x >0 ){this.x = 0 }  
      else if (this.x + this.width + this.speed < this.canvas.width){this.speed=0;} 
      this.x += this.speed; 
  
    },
  
    draw: function () {
      const ctx = gameLandscape.context;
      ctx.drawImage(this.img, this.x, 0, this.width, this.height); 
    },
  };