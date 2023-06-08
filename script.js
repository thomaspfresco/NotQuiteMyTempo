let frameSize; //tamanho moldura

let levels = [];
let particles = [];
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
let leftPressed = 0;
let rightPressed = 0;
let activeSS;

let airTime = 0;

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
  activeSS = false;
  light=loadFont('Fonts/Gilroy-Light.otf');
  bold=loadFont('Fonts/Gilroy-ExtraBold.otf');
  cufel=loadFont('Fonts/cufel.otf');
  textFont(cufel);

  frameSize = windowWidth/15;

  player = new Player(windowWidth/30,windowWidth/30);

  levels.push(new Level(0,"music name",8000,1,windowWidth/4.4,windowHeight/3,windowWidth-windowWidth/4,windowHeight/2.2));
  levels.push(new Level(1,"music name",7000,1,windowWidth/4.4,windowHeight/3,windowWidth-windowWidth/4,windowHeight/2.2));
  levels.push(new Level(2,"music name",5000,1,windowWidth/15,windowHeight/2+windowWidth/15,windowWidth-windowWidth/9,windowHeight-windowHeight/2.7));
  levels.push(new Level(3,"RICK ROLL",5000,1,windowWidth/15,windowHeight/2+windowWidth/15,windowWidth-windowWidth/9,windowHeight-windowHeight/2.7));


  menu = new Menu();
  splashScreen = new splashScreen("NOT QUITE MY TEMPO");
  
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

  if(activeSS){
    splashScreen.draw();
  }
  
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
      if(activeSS==false){
        menu.draw();
       }
      if (ambVol > 0) {
        if ( ambVol - 0.01 < 0) ambVol = 0;
        else ambVol -= 0.01;
      }
      if (menuVol < 0.5) menuVol += 0.0002;
    }
  }

  //desenho e gestao de particulas
  for (i=0; i<particles.length; i++) {
    var p = particles[i];
    p.render();
    p.update();
  }
  
	while(particles.length > 50) particles.shift();

  //cursor
  drawCursor();
  fill(0,0,0,blackOpac);
  rect(0,0,windowWidth,windowHeight);
  }


//CONTROLOS ---------- // ---------- // ----------


function mouseDragged(){
  levels[currentLevel].mouseDragged();
}
function mouseReleased(){
  if (currentLevel == 0) levels[currentLevel].eTimer = millis();
  levels[currentLevel].mouseReleased();
}
function keyPressed() {
  if (activeSS) {
    currentLevel = -2;
    activeSS = false;
    switchBlack = true;
  }
  if (currentLevel == -1) {
    if (key=='a' || key=="ArrowLeft" && key!='d' && key!="ArrowRight") menu.downPosition();
    if (key=='d' || key=="ArrowRight" && key!='a' && key!="ArrowLeft") menu.upPosition();
    if (key=='e' || key==' ' || key=="Enter") {
      currentLevel = menu.selected;
      levels[currentLevel].eTimer = millis();
      levels[currentLevel].reset();
      switchBlack = true;
    }
  }
  else {
    if (key == "Escape") {
      currentLevel = -1;
      switchBlack = true;
    }

    if (key=='a' || key=="ArrowLeft" && key!='d' && key!="ArrowRight") {
      if (player.drifting_right) player.drifting_right = false;
      if (player.drifting_left) player.drifting_right = false;
      player.move = -player.walk;
      leftPressed=1;
    }
    if (key=='d' || key=="ArrowRight" && key!='a' && key!="ArrowLeft") {
      if (player.drifting_left) player.drifting_left = false;
      player.move = player.walk;
      rightPressed=1;
    }
    if (key==' ' || key=='w' || key=='ArrowUp' && !player.jumping) {
      player.jump();
      airTime = millis();
    }
    //if (key=='e') switchCheck = true;
  }
}

function keyReleased() {
  if (currentLevel == -1) {

  }
  else {

    if (key=='a' || key=="ArrowLeft") {
      leftPressed = 0;
      if(rightPressed){
        player.move = player.walk;
      }
      else{ player.drifting_left = true;}
      
    }

    if (key=='d' || key=="ArrowRight") {
      rightPressed=0;
      if(leftPressed){
        player.move=-player.walk;
      }
      else{
        player.drifting_right = true;}
    }
    //if (key=='e') switchCheck = false;
    
  }
  if (key=='e') switchCheck = !switchCheck;
}

function drawCursor() {
  if (switchDist>=windowHeight || currentLevel == -1 || currentLevel == -2 && switchBlack == false) {
    fill(255,255,0);
    circle(mouseX, mouseY,windowHeight/30);
  }
}

function switchView() {
  if (switchCheck && switchDist<windowHeight){
    if(switchDist+switchInc > windowHeight)switchDist=windowHeight;
      else switchDist+=switchInc;
    }
 
  else if (!switchCheck && switchDist>0){
    if(switchDist-switchInc < 0) switchDist = 0;
    else switchDist-=switchInc;
  
}
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

function makeParticles(pcount, mx, my, cor, dying) {
  //print("make particles " + pcount);
 for(var i=0; i<pcount;i++) {
   var p = new Particle(mx, my, cor,dying);
   
   var angle = PI + random(-PI/2,PI/2);
   var speed;
   if (dying) speed = random(10,15);
   else speed = random(4,10);
   
   p.velX = sin(angle)*speed;
   p.velY = cos(angle)*speed;
   
   //p.s = random(8,18);
   
   particles.push(p);
 }
}

function Particle(x,y, cor, dying) {
  this.posX = x; 
	this.posY = y; 
	this.velX = 0; 
	this.velY = 0; 

  this.dying = dying;

  if(dying) this.shrink = .95; 
	else this.shrink = .82; 

  if(dying) this.s = windowHeight/35;
	else this.s = windowHeight/22; 	
	this.drag = 0.9; 
  this.alpha = 255;
	this.gravity = 0.3; 
  if(dying) this.fade = 0;
	else this.fade = 5;
  this.cor = cor;
  
   this.update = function() {
     this.velX *= this.drag; 
     this.velY *= this.drag;

     this.velY += this.gravity; 

     this.posX += this.velX;
     this.posY += this.velY; 

     this.s *= this.shrink;
     this.alpha -= this.fade; 	 
    };
  
    this.render = function() {
      fill(cor[0],cor[1],cor[2],this.alpha);
      //rect(this.posX, this.posY, this.size,this.size);
      if (this.dying) rect(this.posX+switchDist, this.posY+switchDist-200, this.s,this.s);
      else circle(this.posX+switchDist, this.posY+switchDist, this.s);
	};   
}