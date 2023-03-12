let frameSize; //tamanho moldura
let tabPressed = false;

function setup() {
  frameRate(60);
  createCanvas(windowWidth, windowHeight);

  frameSize = windowWidth/8;

  player = new Player(frameSize+42,frameSize,15,30);

  level1 = new Level(1,120,1,1);
}

function draw() {
  background(217,217,217);
  level1.draw();
  drawFrame();
  }

function drawFrame() {
    fill(49,49,49);
    noStroke();
    rect(0,0,frameSize,windowHeight);
    rect(0,0,windowWidth,frameSize);
    rect(windowWidth-frameSize,0,frameSize,windowHeight);
    rect(0,windowHeight-frameSize,windowWidth,frameSize);
}

//CONTROLOS

function keyPressed() {
  if (key=='a' && key!='d') {
    player.move = -player.walk;
  }
  if (key=='d' && key!='a') {
    player.move = player.walk;
  }
  if (key==' ' && !player.jumping) {
    //vel -= 15;
    player.vel -= 14;
  }
  if (key="e") {
    tabPressed = true;
  }
}

function keyReleased() {
  if (key=='a') {
    player.move = 0;
  }
  if (key=='d') {
    player.move = 0;
  }
  if (key="e") {
    tabPressed = false;
  }
}