const gravity = 1;
let gameLength = 0;
let points = 0;

// ALL CLASSES 
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

class Player {
  constructor(image, image2, x, y, width, height) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 1;
    this.img = image;
    this.img2 = image2;
    this.ground = 245;
  }

  update() {
    const ctx = gameLandscape.context;
    if (points < 1) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } else {
      this.height = 110;
      this.width = 70;
      this.ground = 200;
      ctx.drawImage(this.img2, this.x, this.y, this.width, this.height);
    }
  }

  newPos() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.y <= 0) {
      this.speedY = 0;
    }

    if (this.y + this.height + this.speedY < this.ground + this.height) {
      this.speedY += gravity;
    } else {
      this.speedY = 0;
    }

    // update the player speed and allow to jump & move at same time
    // + avoid the player to collide with the sides
    if (arrows.left.pressed && this.x >= 200) {
      this.speedX = -5;
    } else if (arrows.right.pressed && this.x <= 300) {
      this.speedX = 5;
    } else {
      this.speedX = 0;
      
      if (arrows.right.pressed) {
        gameLength += 5;
        landscapeImage.speed = -4.5;
        platforms.forEach((platform) => {
          platform.x -= 5;
        });
        fires.forEach((fire) => {
          fire.x -= 5;
        });
        starFood.forEach((star) => {
          star.x -= 5;
        });
      } else if (arrows.left.pressed) {
        gameLength -= 5;
        landscapeImage.speed = 4.5;
        platforms.forEach((platform) => {
          platform.x += 5;
        });
        fires.forEach((fire) => {
          fire.x += 5;
        });
        starFood.forEach((star) => {
          star.x += 5;
        });
      } else {
        landscapeImage.speed = 0;
      }
    }

    // collide with the platforms
    platforms.forEach((platform) => {
      if (
        this.y + this.height <= platform.y &&
        this.y + this.height + this.speedY >= platform.y &&
        this.x + this.width >= platform.x+25 &&
        this.x <= platform.x + platform.width-25
      ) {
        this.speedY = 0;
      }
    });
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

  crashWith(fire) {
    return !(
      this.bottom() < fire.top() ||
      this.top() > fire.bottom() ||
      this.right() < fire.left() ||
      this.left() > fire.right()
    );
  }
}


// ADD ALL OBJECTS

const gameLandscape = {
  canvas: document.createElement("canvas"),  
  time : 0,

  start: function () {
    this.canvas.width = 800;
    this.canvas.height = 400;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 25); 
    this.timeInterval = setInterval(updateTime, 1000);
  },
  clear: function () {
    landscapeImage.move();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    landscapeImage.draw();
  },
  stop: function () {

    clearInterval(this.interval); 
    clearInterval (this.timeInterval);
    this.context.fillStyle = 'rgba(0,0,0,0.85)'
    this.context.fillRect(0,0,this.canvas.width, this.canvas.height)
    this.context.font =('40px Lucida Sans')
    this.context.textBaseline = 'middle'

    if(points <10){
      this.context.fillStyle = '#AA4774'
      this.context.fillText('Calcifer burnt you!', 200, 180, 400) 
      this.context.font =('30px Lucida Sans')
      this.context.fillText(`You caugth ${points} stars over 10, try again...`, 200, 240, 400) }
    else {
      this.context.fillStyle = '#6B84C8'
      this.context.fillText('You made it, well done!', 200, 180, 400)  
      this.context.font =('30px Lucida Sans')
      this.context.fillText(`You took ${this.time}s to complete the level.`, 200, 240, 400) 
      
    }


  },

  score: function () {
    points +=1
  },

  displayScore : function (){

    console.log(points)
    this.context.font = '30px serif';
    this.context.fillStyle = 'black';

    this.context.fillText(`Score: ${points}`, 50, 50);
  }
};

const calciferImageOne = new Image();
calciferImageOne.src = "../Pictures/calcifer.png";

const calciferImageTwo = new Image();
calciferImageTwo.src = "../Pictures/calcifer2.png";



const fires = [
  new GhibliChar(calciferImageOne, calciferImageTwo, 550, 250, 60, 65),
  new GhibliChar(calciferImageOne, calciferImageTwo, 750, 250, 60, 65),
  new GhibliChar(calciferImageOne, calciferImageTwo, 1360, 95, 60, 65),
  new GhibliChar(calciferImageOne, calciferImageTwo, 1900, 250, 60, 65),
  new GhibliChar(calciferImageOne, calciferImageTwo, 2150, 130, 60, 65),
  new GhibliChar(calciferImageOne, calciferImageTwo, 2550, 250, 60, 65),
  new GhibliChar(calciferImageOne, calciferImageTwo, 3050, 250, 60, 65),
];

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

  const platformImage = new Image();
platformImage.src = "../Pictures/cloud.png";

const platforms = [
  new Platform(platformImage, 350, 250, 150, 30),
  new Platform(platformImage, 500, 175, 150, 30),
  new Platform(platformImage, 700, 125, 150, 30),
  new Platform(platformImage, 1350, 150, 150, 30),
  new Platform(platformImage, 1600, 220, 150, 30),
  new Platform(platformImage, 1850, 125, 150, 30),
  new Platform(platformImage, 2100, 180, 150, 30),
  new Platform(platformImage, 2350, 250, 150, 30),
  new Platform(platformImage, 2650, 250, 150, 30),
  new Platform(platformImage, 2800, 180, 150, 30),
  new Platform(platformImage, 3000, 125, 150, 30),
];


const starFoodImage = new Image();
starFoodImage.src = "../Pictures/food.png";

const starFood = [
  new GhibliChar(starFoodImage,starFoodImage, 570, 100, 55, 45),
  new GhibliChar(starFoodImage,starFoodImage, 950, 255, 55, 45),
  new GhibliChar(starFoodImage,starFoodImage, 1450, 90, 55, 45),
  new GhibliChar(starFoodImage,starFoodImage, 1550, 60, 55, 45),
  new GhibliChar(starFoodImage,starFoodImage, 1900, 60, 55, 45),
  new GhibliChar(starFoodImage,starFoodImage, 2150, 255, 55, 45),
  new GhibliChar(starFoodImage,starFoodImage, 2550, 150, 55, 45),
  new GhibliChar(starFoodImage,starFoodImage, 2900, 255, 55, 45),
  new GhibliChar(starFoodImage,starFoodImage, 3050, 60, 55, 45),
  new GhibliChar(starFoodImage,starFoodImage, 3700, 220, 110, 90),
];

// create the player 
const susuImage = new Image();
susuImage.src = "../Pictures/SusuwatariV2.png";

const susuImageTwo = new Image();
susuImageTwo.src = "../Pictures/SusuwatariV3.png";

// susuwatari is the name of the coal character 
const susuwatari = new Player(susuImage, susuImageTwo, 160, 245, 80, 65);

//launch the game

gameLandscape.start(); 

 

//update the game

function updateGameArea() {
  gameLandscape.clear();
  susuwatari.newPos();
  fires.forEach((fire) => {
    fire.newPos();
    fire.update();
  });
  starFood.forEach((star) => {
    star.newPos();
    star.update();
  });
  platforms.forEach((platform) => {
    platform.draw();
  });
  susuwatari.update();
  checkGameOver();
  checkPoints();
  gameLandscape.displayScore();
}

// functions to check if crashed, nb of points & update the chrono

function checkGameOver() {
  const crashed = fires.some(function (fire) {
    return susuwatari.crashWith(fire);
  });

  if (crashed) {
    gameLandscape.stop();
  }
}

function checkPoints() {
  if (points < 10) {
    for (let i = 0; i < starFood.length; i++) {
      if (susuwatari.crashWith(starFood[i])) {
        starFood.splice(starFood[i], 1);
        gameLandscape.score();
        break;
      }
    }
  } else {
    gameLandscape.stop();
  }
}

function updateTime (){
  gameLandscape.time +=1
}


// event listener for moving the player 

const arrows = {
  left: {
    pressed: false,
  },
  right: {
    pressed: false,
  },
};

document.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 38: // up arrow to make the Susuwatari
      susuwatari.speedY -= 15;  
      break;

    case 37: // left arrow
      arrows.left.pressed = true;
      break;
    case 39: // right arrow
      arrows.right.pressed = true;

      break;
  }
});


document.addEventListener("keyup", (e) => {
  switch (e.keyCode) {
    case 38: // up arrow to make the Susuwatari  jump
      susuwatari.speedX = 0;
      susuwatari.speedY = 0;
      landscapeImage.speed = 0;

      break;

    case 37: // left arrow
      arrows.left.pressed = false;
      landscapeImage.speed = 0;
      break;
    case 39: // right arrow
      arrows.right.pressed = false;
      landscapeImage.speed = 0;

      break;
  }
});
