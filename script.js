let iscolliding = false;   // to stop falling down while colliding
let pos;                   // player position
let platforms = [];        // container for platform elements
let vel = 0;               // velocity (falling down...)
let move = 0;              // moving left/right
let walk = 4;              // speed of moving left/right

let frameSize = 12; //tamanho moldura

function setup() {
    frameRate(60); 
  createCanvas(windowWidth, windowHeight);
  pos = {                  // player position initialization
    x: width/2+20,
    y: height/2-100
  }
  // generate random platforms
  for (let i=0; i<=width/100; i++) {
    platforms.push(new Platform(i*100, random(height-50)+50));
  }
}

function draw() {
  background(50);
  // check for collisions
  iscolliding = false;
  // do for all platforms
  for (let p of platforms) {
    p.show();               // draw platform
    if (p.collide(pos)) {   // check collision
      iscolliding = true;
      pos.y = p.pos.y;
    }
  }
  // draw player
  fill(255, 0, 0);
  stroke(0);
  ellipse(pos.x, pos.y-8, 16, 16);
  // player velocity
  if (!iscolliding) {
    //vel += 0.5;
    vel += 0.55;
  }
  // player movement
  vel *= 0.9;
  pos.y += vel;
  pos.x += move;

  // dont allow player to jump outside scope
  pos.y = Math.max(pos.y, 10);
  // endgame condition
  if (pos.y > height+10) {
    pos.y = height+10; //
    // noLoop();
  }
  //console.log(`player location: x=${pos.x} y=${pos.y}`);
  drawFrame();
}

function keyPressed() {
  if (key=='a' && key!='d') {
    move = -walk;
  }
  if (key=='d' && key!='a') {
    move = walk;
  }
  if (key==' ' && iscolliding) {
    //vel -= 15;
    vel -= 14;
  }
}

function keyReleased() {
  if (key=='a') {
    move = 0;
  }
  if (key=='d') {
    move = 0;
  }
}

function drawFrame() {
    fill(255);
    noStroke();
    rect(0,0,windowWidth/frameSize,windowHeight);
    rect(0,0,windowWidth,windowWidth/frameSize);
    rect(windowWidth-windowWidth/frameSize,0,windowWidth/frameSize,windowHeight);
    rect(0,windowHeight-windowWidth/frameSize,windowWidth,windowWidth/frameSize);
}