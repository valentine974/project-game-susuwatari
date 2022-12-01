const gravity = 1;
let gameLength = 0;
let points = 0;


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
