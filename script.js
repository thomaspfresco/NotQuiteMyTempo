let frameSize; //tamanho moldura

let levels = [];
let currentLevel = 0; //nivel atual, -1 se for o menu

let switchCheck = false; //verifica se as vistas estao trocadas
let switchDist = 0; //valor a subtrair

function setup() {
  frameRate(60);
  createCanvas(windowWidth, windowHeight);

  light=loadFont('Fonts/Gilroy-Light.otf');
  bold=loadFont('Fonts/Gilroy-ExtraBold.otf');

  frameSize = windowWidth/8;

  player = new Player(15,30);
  menu = new Menu();

  levels.push(new Level(1,2000,1,1,frameSize+42,frameSize*2,windowWidth-frameSize,frameSize*4));
}

function draw() {
  background(217,217,217);
  if (currentLevel != -1) levels[currentLevel].draw();
  else menu.draw();
 
  //switchView()
  }


//CONTROLOS ---------- // ---------- // ----------

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
  if (key='e') {
    switchCheck = true;
  }
}

function keyReleased() {
  if (key=='a') {
    player.move = 0;
  }
  if (key=='d') {
    player.move = 0;
  }
  if (key='e') {
    switchCheck = false;
  }
}

function switchView() {
  if (switchCheck && switchDist<windowHeight) switchDist+=75;
  else if(!switchCheck && switchDist>0) switchDist-=75;
  
}

/*function drawFrame() {
    fill(49,49,49);
    noStroke();
    rect(0,0,frameSize,windowHeight);
    rect(0,0,windowWidth,frameSize);
    rect(windowWidth-frameSize,0,frameSize,windowHeight);
    rect(0,windowHeight-frameSize,windowWidth,frameSize);
}*/