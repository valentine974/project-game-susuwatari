
const platformImage = new Image();
platformImage.src = "./img/Platform.png";

const boxImage = new Image();
boxImage.src = "./img/Cart.png";
 

const backgroundImage1 = new Image();
backgroundImage1.src = "./img/Background/1.png";

const backgroundImage2 = new Image();
backgroundImage2.src = "./img/Background/2.png";

const backgroundImage3 = new Image();
backgroundImage3.src = "./img/Background/3.png";

const backgroundImage4 = new Image();
backgroundImage4.src = "./img/Background/4.png";

const backgroundImage5 = new Image();
backgroundImage5.src = "./img/Background/5.png"; 

const backgroundImage6 = new Image();
backgroundImage6.src = "./img/Background/ManoMano.png"; 

const tileImage1 = new Image();
tileImage1.src = "./img/Tiles/IndustrialTile_31.png"; 

const tileImage2 = new Image();
tileImage2.src = "./img/Tiles/IndustrialTile_32.png"; 

const tileImage3 = new Image();
tileImage3.src = "./img/Tiles/IndustrialTile_33.png"; 

const tileImage4 = new Image();
tileImage4.src = "./img/Tiles/IndustrialTile_40.png"; 

const tileImage5 = new Image();
tileImage5.src = "./img/Tiles/IndustrialTile_41.png";  

const tileImage6 = new Image();
tileImage6.src = "./img/Tiles/IndustrialTile_42.png";  

const tileImage7 = new Image();
tileImage7.src = "./img/Tiles/IndustrialTile_49.png"; 

const tileImage8 = new Image();
tileImage8.src = "./img/Tiles/IndustrialTile_50.png";  

const tileImage9 = new Image();
tileImage9.src = "./img/Tiles/IndustrialTile_51.png";  

const tileImage10 = new Image();
tileImage10.src = "./img/Tiles/IndustrialTile_09.png"; 

const tileImage11 = new Image();
tileImage11.src = "./img/Tiles/IndustrialTile_74.png"; 

const tileImage12 = new Image();
tileImage12.src = "./img/Tiles/IndustrialTile_75.png"; 

const tileImage13 = new Image();
tileImage13.src = "./img/Tiles/IndustrialTile_76.png"; 

const truckImage1 = new Image();
truckImage1.src = "./img/Trucks/Bodies/3_3.png";   

const truckImage2 = new Image();
truckImage2.src = "./img/Trucks/Bodies/10_2.png";  

const truckImage3 = new Image();
truckImage3.src = "./img/Trucks/Chassis/4.png";  

const productImage1 = new Image();
productImage1.src = "./img/Objects/Barrel1.png";  

const productImage2 = new Image();
productImage2.src = "./img/Objects/Fire-extinguisher1.png"; 

const productImage3 = new Image();
productImage3.src = "./img/Objects/Pointer1.png"; 

const productImage4 = new Image();
productImage4.src = "./img/Objects/Bucket.png"; 

const productImage5 = new Image(); 
productImage5.src = "./img/Objects/Mop.png"; 

const happyCustomer1 = new Image();
happyCustomer1.src = "./img/Personnages/3/Idle.png";

const happyCustomer2 = new Image();
happyCustomer2.src = "./img/Personnages/4/Idle.png";

const happyCustomer3 = new Image();
happyCustomer3.src = "./img/Personnages/11/Idle.png";

const happyCustomer4 = new Image();
happyCustomer4.src = "./img/Personnages/6/Idle.png";

const artifices = new Image();
artifices.src = "./img/artifice.png";

  
 

const gravity = 1.5;
let gameLength = 0;
let points = 0;

// ALL CLASSES 


class Objects {
  constructor(x, y ,img) {
    this.width = img.width*1.5;
    this.height = img.height*1.5;
    this.x = x;
    this.y = y; 
    this.img = img; 
  }  

  update() {
    const ctx = gameLandscape.context;
     
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    
  }
  draw() {
    const ctx = gameLandscape.context;  
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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

class Player {
  constructor(image,x, y) {
    this.width = 90;
    this.height = 90;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 1;
    this.img = image; 
    this.ground = 400;
  }

  update() {
    const ctx = gameLandscape.context;
    
    this.width = 90;
    this.height = 90;
    this.ground = 400;
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    
  }
  crashWith(product) {
    return !(
      this.bottom() < product.top() ||
      this.top() > product.bottom() ||
      this.right() < product.left() ||
      this.left() > product.right()
    );
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
    if (arrows.left.pressed && this.x >= 50) {
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
        products.forEach((product) => {
          product.x -= 5;
        });
      } else if (arrows.left.pressed && gameLength >0) {
        gameLength -= 5;
        landscapeImage.speed = 4.5;
        platforms.forEach((platform) => {
          platform.x += 5;
        }); 
        products.forEach((product) => {
          product.x += 5;
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
        this.x + this.width >= platform.x &&
        this.x <= platform.x + platform.width
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

    if(points <5){
      this.context.fillStyle = 'red'
      this.context.fillText('LOST PRODUCTS !', 200, 180, 400) 
      this.context.font =('30px Lucida Sans')
      this.context.fillText(`You caugth ${points} products over 5, try again...`, 200, 240, 400) }
    else {
      this.context.fillStyle = '#6B84C8'
      this.context.fillText('You collected all the products', 200, 120, 400)  
      this.context.fillText('and delivered on time!', 200, 180, 400)  
      this.context.font =('30px Lucida Sans')
      this.context.fillText(`You took ${this.time}s to complete the level.`, 200, 240, 400) 
      
    }


  },

  score: function () {
    points +=1
  },

  displayScore : function (){
 
    this.context.font = '30px serif';
    this.context.fillStyle = 'red';

    this.context.fillText(`Products: ${points}/5`, 600, 50);
  }
};

 


const landscapeImage = { 
    height: 400,
    width: 800,   
  
  
    draw: function () {
      const ctx = gameLandscape.context;
      ctx.drawImage(backgroundImage1, 0, 0, this.width, this.height); 
      ctx.drawImage(backgroundImage2, 0, 0, this.width, this.height); 
      ctx.drawImage(backgroundImage3, 0, 0, this.width, this.height); 
      ctx.drawImage(backgroundImage4, 0, 0, this.width, this.height); 
      ctx.drawImage(backgroundImage5, 0, 0, this.width, this.height); 
      ctx.drawImage(backgroundImage6, 0, 0, 300, 100); 
    },
  };



const platforms = [
  new Objects (-45,380, platformImage ),
  new Objects (200,150, tileImage10 ),
  new Objects (250,150, tileImage10 ),
  new Objects (300,150, tileImage10 ),
     new Objects (440,260, tileImage1 ),
     new Objects (485,260, tileImage2 ),
     new Objects (530,260, tileImage3 ) ,
     new Objects (440,305, tileImage4 ) ,
     new Objects (485,305, tileImage5 ) ,
     new Objects (530,305, tileImage6 ) ,
     new Objects (440,350, tileImage7 ) ,
     new Objects (485,350, tileImage8 ) ,
     new Objects (530,350, tileImage9 ) ,
     new Objects (290,355, platformImage ),
     new Objects (625,380, platformImage ),
     new Objects (720,150, tileImage11 ) ,
     new Objects (765,150, tileImage12 ) ,
     new Objects (810,150, tileImage13 ) ,
     new Objects (1160,380, platformImage ),
     new Objects (1500,280, tileImage10 ),
     new Objects (1550,280, tileImage10 ),
     new Objects (1600,280, tileImage10 ), 
     new Objects (1700,200, tileImage10 ),
     new Objects (1750,200, tileImage10 ),
     new Objects (1800,200, tileImage10 ),  
     new Objects (1900,150, tileImage10 ),
     new Objects (1950,150, tileImage10 ),
     new Objects (2000,150, tileImage10 ),  
     new Objects (1680,320, truckImage2 ),
     new Objects (1790,320, truckImage1 ),
     new Objects (2200,0, artifices ) ,
     new Objects (2200,380, platformImage ),
     new Objects (2335,380, platformImage ) ,
     new Objects (2335,310, happyCustomer1 ),
     new Objects (2385,310, happyCustomer2 ) ,
     new Objects (2375,310, happyCustomer3 )  ,
     new Objects (2365,310, happyCustomer4 ) 
  
];

const happyCustomers = [
  
 ]

 
const products = [
  new Objects (250,110, productImage1 ),
  new Objects (770,100, productImage3 ),
  new Objects (1500,320, productImage2 ),
  new Objects (1870,280, productImage5 ),
  new Objects (2000,95, productImage4 )]


// create the player  
const boxMM = new Player(boxImage,  160, 245);

//launch the game

gameLandscape.start(); 

 

//update the game

function updateGameArea() {
  gameLandscape.clear();
  platforms.forEach((platform) => {
    platform.draw();
  });
  products.forEach((product) => {
    product.draw(); 
  });
  happyCustomers.forEach((customer) => {
    customer.draw(); 
    customer.update(); 
  });
  boxMM.newPos(); 
  boxMM.update(); 
  checkPoints();
  gameLandscape.displayScore();
}

// functions to check if crashed, nb of points & update the chrono



function checkPoints() {
  if (points < 6 && gameLength<=2100 && boxMM.y<gameLandscape.canvas.height) {
    for (let i = 0; i < products.length; i++) {
      if (boxMM.crashWith(products[i])) {
        console.log(products[i])
        products.splice(products[i], 1);
        gameLandscape.score();
  
      }
    }
  
  }else {
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
    case 38: // up arrow to make the boxMM
    boxMM.speedY -= 20;  
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
    case 38: // up arrow to make the boxMM  jump
    boxMM.speedX = 0;
    boxMM.speedY = 0; 

      break;

    case 37: // left arrow
      arrows.left.pressed = false; 
      break;
    case 39: // right arrow
      arrows.right.pressed = false; 

      break;
  }
});

