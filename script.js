let frameSize; //tamanho moldura
let tabPressed = false;

let levels = [];
let currentLevel = -1; //nivel atual, -1 se for o menu

function setup() {
  frameRate(60);
  createCanvas(windowWidth, windowHeight);

  light=loadFont('Fonts/Gilroy-Light.otf');
  bold=loadFont('Fonts/Gilroy-ExtraBold.otf');

  frameSize = windowWidth/8;

  player = new Player(15,30);
  menu = new Menu();

  levels.push(new Level(1,120,1,1,frameSize+42,frameSize*2,windowWidth-frameSize,frameSize*4));
}

function draw() {
  background(217,217,217);
  if (currentLevel != -1) levels[currentLevel].draw();
  else menu.draw();
  //drawFrame();
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



/*function drawFrame() {
    fill(49,49,49);
    noStroke();
    rect(0,0,frameSize,windowHeight);
    rect(0,0,windowWidth,frameSize);
    rect(windowWidth-frameSize,0,frameSize,windowHeight);
    rect(0,windowHeight-frameSize,windowWidth,frameSize);
}*/