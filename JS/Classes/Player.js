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
