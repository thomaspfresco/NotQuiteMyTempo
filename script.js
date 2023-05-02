let frameSize; //tamanho moldura

let levels = [];
let currentLevel = -1; //nivel atual, -1 se for o menu

let switchCheck = false; //verifica se as vistas estao trocadas
let switchDist = 0; //valor total a subtrair
let switchInc = 75; //valor incrementados

let switchBlack = false;
let auxBlack = false;
let blackOpac = 0;
let timerBlack = 0;

let menuVol = 0.5;
let ambVol = 0;

let play;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function preload() {
  menuMusic = loadSound("Sounds/menu.mp3");
  click = loadSound("Sounds/click.mp3");
  ambient = loadSound("Sounds/ambient.mp3");
  
  note1 = loadSound("Sounds/note1.mp3");
  note2 = loadSound("Sounds/note2.mp3");
  note3 = loadSound("Sounds/note3.mp3");
  note4 = loadSound("Sounds/note4.mp3");

  win = loadSound("Sounds/win.mp3");
  collect = loadSound("Sounds/collect.mp3");
  death = loadSound("Sounds/death.mp3");
  impulse = loadSound("Sounds/impulse.wav");

  kick1 = loadSound("Sounds/kick1.mp3");
  kick2 = loadSound("Sounds/kick2.mp3");
  snare = loadSound("Sounds/snare.mp3");
} 

function setup() {
  frameRate(60);
  createCanvas(windowWidth, windowHeight);

  light=loadFont('Fonts/Gilroy-Light.otf');
  bold=loadFont('Fonts/Gilroy-ExtraBold.otf');
  textFont(bold);

  frameSize = windowWidth/15;

  player = new Player(windowWidth/30,windowWidth/30);

  levels.push(new Level(0,"music name",6000,1,windowWidth/4.4,windowHeight/3,windowWidth-windowWidth/4,windowHeight/2.2));
  levels.push(new Level(1,"music name",4000,1,windowWidth/15,windowHeight/2+windowWidth/15,windowWidth-windowWidth/9,windowHeight-windowHeight/2.7));
  levels.push(new Level(2,"music name",6000,1,frameSize+42,frameSize*2,windowWidth-frameSize,frameSize*4));

  menu = new Menu();

  //splashScreen = new splashScreen("ola eva");
  
  click.setVolume(0.2);
  win.setVolume(0.2);
  impulse.setVolume(0.1);
  
  menuMusic.loop();
  ambient.loop();
}

function draw() {
  ambient.setVolume(ambVol);
  menuMusic.setVolume(menuVol);

  //menuMusic.setVolume(0.3-map(blackOpac,0,255,0,0.3));

  background(217,217,217);

  switchToBlack();

  if (currentLevel != -1 && currentLevel != -2) {

    if (switchBlack) {
      switchToBlack();
    }
    else {
      if (menuVol > 0) {
        if ( menuVol - 0.01 < 0) menuVol = 0;
        else menuVol -= 0.01;
      }
      if (ambVol < 0.5) ambVol += 0.001;
      levels[currentLevel].draw();
      switchView();
    }
  }
  else {
    if (switchBlack) {
      switchToBlack();
    }
    else {
      //splashScreen.draw();
      menu.draw();
      if (ambVol > 0) {
        if ( ambVol - 0.01 < 0) ambVol = 0;
        else ambVol -= 0.01;
      }
      if (menuVol < 0.5) menuVol += 0.0002;
    }
  }

  //cursor

  fill(0,0,0,blackOpac);
  rect(0,0,windowWidth,windowHeight);
  }


//CONTROLOS ---------- // ---------- // ----------


function mouseDragged(){
  levels[currentLevel].mouseDragged();
}
function mouseReleased(){
  levels[currentLevel].mouseReleased();
}
function keyPressed() {
  if (currentLevel == -1) {
    if (key=='a' || key=="ArrowLeft" && key!='d' && key!="ArrowRight") menu.downPosition();
    if (key=='d' || key=="ArrowRight" && key!='a' && key!="ArrowLeft") menu.upPosition();
    if (key=='e' || key==' ' || key=="Enter") {
      currentLevel = menu.selected;
      levels[currentLevel].reset();
      switchBlack = true;
    }
  }
  else {
    if (key=='a' || key=="ArrowLeft" && key!='d' && key!="ArrowRight") {
      player.move = -player.walk;
    }
    if (key=='d' || key=="ArrowRight" && key!='a' && key!="ArrowLeft") {
      player.move = player.walk;
    }
    if (key==' ' && !player.jumping) player.jump();
    //if (key=='e') switchCheck = true;
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
    //if (key=='e') switchCheck = false;
    if (key=='e') switchCheck = !switchCheck;
  }
}

function drawCursor() {
  if (switchDist>=windowHeight || currentLevel == -1 || currentLevel == -2 && switchBlack == false) {
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

function switchToBlack() {
  if (switchBlack) {
    if (blackOpac >= 255) {
      switchBlack = false;
      timerBlack = millis();
    }
    else blackOpac+=9;
  }

  else if (millis() - timerBlack > 1000) {
    auxBlack = true;
  }

  if (auxBlack) {
    if (blackOpac <= 0) {
      auxBlack = false;
    }
    else blackOpac-=9;
  } 
}