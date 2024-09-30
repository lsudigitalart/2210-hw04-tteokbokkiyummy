let playerX, playerY;
let catSit, fishImg, catWalkLeft, catWalkRight, winScreen;
let dots = [];
let numDots = 10;
let catSize = 50;
let playerSpeed = 5; 
let score = 0;
let catState;
let fishMinSize = 20;
let fishMaxSize = 60;

function preload() {
  catSit = loadImage('catSit.png');
  fishImg = loadImage('fish.png');
  catWalkLeft = loadImage('catWalkLeft.png')
  catWalkRight = loadImage('catWalkRight.png')
  winScreen = loadImage('winScreen.png')
}

function setup() {
  createCanvas(500, 500);

  // cat starting point 
  playerX = width / 2;
  playerY = height / 2;

  catState = catSit;

  // where are my fish
  for (let i = 0; i < numDots; i++) {
    let dot = {
      x: random(width),
      y: random(height),
      size: random(20, 80)
    };
    dots.push(dot);
  }
}

function draw() {
  background(220);

  // cat in canvas 
  image(catState, playerX - catSize / 2, playerY - catSize / 2, catSize, catSize);

  movePlayer();
  changeFishSize();

  // to eat dot
  for (let i = dots.length - 1; i >= 0; i--) {
    let dot = dots[i];

    //delete later
    // fill(255, 0, 0);
    // ellipse(dot.x, dot.y, dot.size);

    image(fishImg, dot.x-dot.size/2, dot.y-dot.size/2,dot.size,dot.size);

    // cat eat fish, make new fish 
    if (dist(playerX, playerY, dot.x, dot.y) < (catSize / 4 + dot.size / 4)) {
      dots.splice(i, 1); // Remove the dot

      score++;

      let newFish = {
        x : random (width),
        y : random (height),
        size : random (fishMinSize,fishMaxSize)
      };
      dots.push (newFish);

    }
  }

  textSize(25);
  fill(56,82,178);
  text(score,450,25)

}

//move cat
function movePlayer() {
  let moving = false; 

  if (keyIsDown(LEFT_ARROW)) {
    playerX -= playerSpeed;
    catState=catWalkLeft;
    moving = true;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    playerX += playerSpeed;
    catState=catWalkRight;
    moving = true;
  }
  if (keyIsDown(UP_ARROW)) {
    playerY -= playerSpeed;
    catState=catWalkLeft;
    moving = true; 
  }
  if (keyIsDown(DOWN_ARROW)) {
    playerY += playerSpeed;
    catState=catWalkRight;
    moving = true; 
  }
  
  if (!moving){
    catState = catSit;
  }

  // canvas constrain 
  playerX = constrain(playerX,0, width);
  playerY = constrain(playerY,0,height);

  }

  //fish get smaller as score goes up 
  function changeFishSize() {
  if (score >= 60) {
    fishMinSize = 20;
    fishMaxSize = 40;
  } else if (score >= 30) {
    fishMinSize = 30;
    fishMaxSize = 60;
  }

  if (score >= 100){
    background(255);
    image(winScreen,0,0,width,height)
    return;
  }  
}