const gameLandscape = {
  canvas: document.createElement("canvas"),

  start: function () {
    this.canvas.width = 800;
    this.canvas.height = 400;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 15);
  },
  clear: function () {
    landscapeImage.move();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    landscapeImage.draw();
  },
};

class ghibliChar {
  constructor(image, x, y, width, height) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.img = image;
  }

  update() {
    const ctx = gameLandscape.context;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
}

function updateGameArea() {
  gameLandscape.clear();
  susuwatari.newPos();
  susuwatari.update();
}




const trainPartOne = new Image();
trainPartOne.src = "./Pictures/Train11.png";

const trainPartTwo = new Image();
trainPartTwo.src = "./Pictures/Train33.png";

const trainPartThree = new Image();
trainPartThree.src = "./Pictures/Train44.png";

const landscapeImage = {
  img1: trainPartOne,
  img1height: 400,
  img1width: 2220,
  img2: trainPartTwo,
  img2height: 400,
  img2width: 3040,
  img3: trainPartThree,
  img3height: 400,
  img3width: 2240,
  x1: 0,
  x2: 0,
  x3: 0,
  speed: -0.7, // input the player's speed to moove the background Image
  canvas: gameLandscape.canvas,

  move: function () {
    this.x1 += this.speed;
    this.x2 = this.x1 + this.img1width + this.speed;
    this.x3 = this.x2 + this.img2width;
    susuwatari.speedX-=0.002
  },

  draw: function () {
    const ctx = gameLandscape.context;
    ctx.drawImage(this.img1, this.x1, 0, this.img1width, this.img1height);
    ctx.drawImage(this.img2, this.x2, 0, this.img2width, this.img2height);
    ctx.drawImage(this.img3, this.x3, 0, this.img3width, this.img3height);
  },
};



const susuImage = new Image();
susuImage.src = "./Pictures/SusuwatariV2.png";

const susuwatari = new ghibliChar(susuImage, 100, 240, 80, 65);

gameLandscape.start();

function jump (v) {
  susuwatari.speedY += v ;
  susuwatari.speedX +=0.5;
  landscapeImage.speed = -3;

}

document.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 38: // up arrow to make the Susuwatari jump

      jump (-3)  ;
      setTimeout(() => { jump (-4) }, 50); 
      setTimeout(() => { jump (-4)}, 100); 
      setTimeout(() => { jump (-5)}, 150);
      setTimeout(() => { jump (5) }, 200);
      setTimeout(() => { jump (4) }, 250);
      setTimeout(() => { jump (4) }, 300);
      setTimeout(() => { jump (3) }, 350);

      setTimeout(() => {
        susuwatari.speedY = 0;
        susuwatari.speedX = 0;  
        landscapeImage.speed = -0.7;
        susuwatari.y = 240 ; 
        console.log("9")
      }, 400);

      break;

    case 37: // left arrow
      susuwatari.speedX -= 1;
      landscapeImage.speed = -0.7;
      break;
    case 39: // right arrow
      susuwatari.speedX += 1;
      landscapeImage.speed = -2;
      break;
  }
});
document.addEventListener("keyup", (e) => {
  susuwatari.speedX = 0;
  susuwatari.speedY = 0;
  landscapeImage.speed = -0.7;
});


console.log(document.querySelector('button .start'))
