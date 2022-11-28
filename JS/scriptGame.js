const gravity = 1;
let gameLength = 0;
let points = 0;

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

// const calciferImage = new Image();
// calciferImage.src = "../Pictures/calcifer.gif";

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

const susuImage = new Image();
susuImage.src = "../Pictures/SusuwatariV2.png";

const susuImageTwo = new Image();
susuImageTwo.src = "../Pictures/SusuwatariV3.png";

const susuwatari = new Player(susuImage, susuImageTwo, 160, 245, 80, 65);

gameLandscape.start();

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
