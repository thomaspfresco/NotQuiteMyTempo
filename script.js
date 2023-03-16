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
  textFont(bold);

  frameSize = windowWidth/8;

  player = new Player(15,30);

  levels.push(new Level(0,"Keep Walking",6000,1,1,frameSize+42,frameSize*2,windowWidth/2-frameSize*2,frameSize*2));
  levels.push(new Level(1,"Keep",6000,1,1,frameSize+42,frameSize*2,windowWidth-frameSize,frameSize*4));
  levels.push(new Level(2,"Walking",6000,1,1,frameSize+42,frameSize*2,windowWidth-frameSize,frameSize*4));

  menu = new Menu();
}

function draw() {
  background(217,217,217);
  if (currentLevel != -1 && currentLevel != -2) {
    levels[currentLevel].draw();
  }
  else menu.draw();
 
  switchView();
  //drawFrame();

  //cursor
  drawCursor();
  }


//CONTROLOS ---------- // ---------- // ----------

function keyPressed() {
  if (currentLevel == -1) {
    if (key=='a' || key=="ArrowLeft" && key!='d' && key!="ArrowRight") menu.downPosition();
    if (key=='d' || key=="ArrowRight" && key!='a' && key!="ArrowLeft") menu.upPosition();
    if (key=='e' || key==' ' || key=="Enter") {
      currentLevel = menu.selected;
      levels[currentLevel].reset();
    }
  }
  else {
    if (key=='a' || key=="ArrowLeft" && key!='d' && key!="ArrowRight") {
      player.move = -player.walk;
    }
    if (key=='d' || key=="ArrowRight" && key!='a' && key!="ArrowLeft") {
      player.move = player.walk;
    }
    if (key==' ' && !player.jumping) {
      player.vel -= windowHeight/55;
    }
    if (key=='e') switchCheck = true;
  }
}

function keyReleased() {
  if (currentLevel == -1) {

  }
  else {
    if (key=='a' || key=="ArrowLeft") {
      player.move = 0;
    }
    if (key=='d' || key=="ArrowRight") {
      player.move = 0;
    }
    if (key=='e') switchCheck = false;
  }
}

function drawCursor() {
  if (switchDist>=windowHeight || currentLevel == -1 || currentLevel == -2) {
    fill(255,255,0);
    circle(mouseX, mouseY,windowHeight/30);
  }
}

function switchView() {
  if (switchCheck && switchDist<windowHeight) switchDist+=switchInc;
  else if (!switchCheck && switchDist>0) switchDist-=switchInc;
  
}

function drawFrame() {
    fill(49,49,49);
    noStroke();
    rect(0,0,frameSize,windowHeight);
    rect(0,0,windowWidth,frameSize);
    rect(windowWidth-frameSize,0,frameSize,windowHeight);
    rect(0,windowHeight-frameSize,windowWidth,frameSize);
}

function clone(obj) {
  let buf; // the cloned object
  if (obj instanceof Array) {
    buf = []; // create an empty array
    var i = obj.length;
    while (i --) {
      buf[i] = clone(obj[i]); // recursively clone the elements
    }
    return buf;
  } else if (obj instanceof Object) {
    buf = {}; // create an empty object
    for (const k in obj) {
      if (obj.hasOwnProperty(k)) { // filter out another array's index
        buf[k] = clone(obj[k]); // recursively clone the value
      }     
    }
    return buf;
  } else {
    return obj;
  }
}