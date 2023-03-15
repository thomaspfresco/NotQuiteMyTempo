let frameSize; //tamanho moldura

let levels = [];
let currentLevel = -1; //nivel atual, -1 se for o menu

let switchCheck = false; //verifica se as vistas estao trocadas
let switchDist = 0; //valor total a subtrair
let switchInc = 75; //valor incrementados

function setup() {
  frameRate(60);
  createCanvas(windowWidth, windowHeight);

  light=loadFont('Fonts/Gilroy-Light.otf');
  bold=loadFont('Fonts/Gilroy-ExtraBold.otf');

  frameSize = windowWidth/8;

  player = new Player(15,30);
  menu = new Menu();

  levels.push(new Level(1,4000,1,1,frameSize+42,frameSize*2,windowWidth-frameSize,frameSize*4));
}

function draw() {
  background(217,217,217);
  if (currentLevel != -1) levels[currentLevel].draw();
  else menu.draw();
 
  switchView();
  //drawFrame();
  }


//CONTROLOS ---------- // ---------- // ----------

function keyPressed() {
  if (key=='a' || key=="ArrowLeft" && key!='d' && key!="ArrowRight") {
    player.move = -player.walk;
  }
  if (key=='d' || key=="ArrowRight" && key!='a' && key!="ArrowLeft") {
    player.move = player.walk;
  }
  if (key==' ' && !player.jumping) {
    player.vel -= 14;
  }
  if (key=='e') switchCheck = true;
}

function keyReleased() {
  if (key=='a' || key=="ArrowLeft") {
    player.move = 0;
  }
  if (key=='d' || key=="ArrowRight") {
    player.move = 0;
  }
  if (key=='e') switchCheck = false;
}

function switchView() {
  if (switchCheck && switchDist<windowHeight) switchDist+=75;
  else if (!switchCheck && switchDist>0) switchDist-=75;
  
}

function drawFrame() {
    fill(49,49,49);
    noStroke();
    rect(0,0,frameSize,windowHeight);
    rect(0,0,windowWidth,frameSize);
    rect(windowWidth-frameSize,0,frameSize,windowHeight);
    rect(0,windowHeight-frameSize,windowWidth,frameSize);
}