const myBlocks = [];

const gameLandscape = {
  canvas: document.createElement("canvas"),
  frames : 0,

  start: function () {
    this.canvas.width = 800;
    this.canvas.height = 400;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);
  },
  clear: function () {
    landscapeImage.move();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    landscapeImage.draw();
  },
};

const gravity = 0.5;

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

function updateGameArea() {
  gameLandscape.clear();
  susuwatari.newPos();
  susuwatari.update(); 
  updateCalcifersImage()
  // updateBlocksImage() 
  // updateBlocks(); 
} 

const trainPartOne = new Image();
trainPartOne.src = "./Pictures/Train final.png"; 

const landscapeImage = {
  img: trainPartOne,
  height: 400,
  width: 3680, 
  x: 0, 
  speed: 0, // input the player's speed to moove the background Image
  canvas: gameLandscape.canvas,

  move: function () {
    // susuwatari.speedX-=0.002
    if(this.x >0 ){this.x = 0 }  
    else if (this.x + this.width + this.speed < this.canvas.width){this.speed=0;} 
    this.x += this.speed; 
  },

  draw: function () {
    const ctx = gameLandscape.context;
    ctx.drawImage(this.img, this.x, 0, this.width, this.height); 
  },
};

// function updateBlocksImage() { 
//  for (i = 0; i < myBlocks.length; i++) {  
//    myBlocks[i].update();    
//  } 
 
// }

function updateCalcifersImage() { 
 for (i = 0; i < myBlocks.length; i++) {  
  myBlocks[i].newPos(); 
   myBlocks[i].update();    
 } 
 
}

const susuImage = new Image();
susuImage.src = "./Pictures/SusuwatariV2.png";
const calciferImage = new Image();
calciferImage.src = "./Pictures/calcifer.gif";

const susuwatari = new ghibliChar(susuImage, 160, 245, 80, 65);

gameLandscape.start();

function updateCalcifers (){
  let nextBlockX = gameLandscape.canvas.width
  for (i = 0; i < myBlocks.length; i++) { 
    myBlocks[i].x -= 30; 
    myBlocks[i].update();   
    nextBlockX = myBlocks[i].x +300
  }

    let y = 0
    let x = nextBlockX;
    let width = 50;
    let height = 50;   
    myBlocks.push(new ghibliChar(calciferImage, x, y, width, height)); 

}


// function updateBlocks() {// utiliser for i until 5  pour créer un nombre de plateformes limité 
//    let nextBlockX = gameLandscape.canvas.width
//   for (i = 0; i < myBlocks.length; i++) { 
//     myBlocks[i].x -= 30;
//     myBlocks[i].update();   
//     nextBlockX = myBlocks[i].x +300
//   }
//     let y
//     if(myBlocks.length%2===0){ y= 250}
//     else {y = 150} 
//     let x = nextBlockX;
//     let width = 150;
//     let height = 30;   
//     myBlocks.push(new Blocks('black', x , y, width,height)); 
  
// }

document.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 38: // up arrow to make the Susuwatari 
    susuwatari.speedY -= 20; 
    susuwatari.speedX += 2;
    landscapeImage.speed = -10; 
    
    updateCalcifers()
    // updateBlocks()

      break;

    case 37: // left arrow
      susuwatari.speedX -= 1;
      landscapeImage.speed += 10;
      break;
    case 39: // right arrow
      susuwatari.speedX += 1;
      landscapeImage.speed = -10;
      // updateBlocks()

  updateCalcifers()
      
      break;
  }
});
document.addEventListener("keyup", (e) => {
  susuwatari.speedX = 0;
  susuwatari.speedY = 0;
  landscapeImage.speed = 0;
});



