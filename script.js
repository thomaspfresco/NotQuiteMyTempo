let frameSize; //tamanho moldura

let levels = [];
let particles = [];
let currentLevel = -5; //nivel atual, -1 se for o menu

let switchCheck = false; //verifica se as vistas estao trocadas
let switchDist = 0; //valor total a subtrair
let switchInc = 75; //valor incrementados

let switchBlack = false;
let auxBlack = false;
let blackOpac = 0;
let timerBlack = 0;

let menuVol = 0;
let ambVol = 0;

let play;
let leftPressed = 0;
let rightPressed = 0;

let airTime = 0;

let tutorial = 0;
let tutorial2 = 0;
tutorialTimer = 0;

//cores
let c = [0,0,0];

let c1 = [180,180,180];
let c2 = [39,39,39];
let cBackground = c1;
let cHighlight = [180,180,180];

let cBlue = [57, 110, 160];
let cRed = [160,62,71];
let cImpulse = [65, 120, 74];
//cPlayer = [118,81,141];
let cPlayer = [129, 103, 151];
let cCollect = [220,172,65];
//cCollect = cHighlight;
//cWin = [0,165,0];
let cWin = [0,0,0];
let cCursor = [217,217,217];
let cursor;
let locker;

let finalTextAlpha = 0;

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

  switchSound = loadSound("Sounds/switch.mp3");
  landSound = loadSound("Sounds/land.mp3");
  spawnSound = loadSound("Sounds/spawn.mp3");
  swell = loadSound("Sounds/swell.mp3");
  pick = loadSound("Sounds/pick.mp3");
  drop = loadSound("Sounds/drop.mp3");

  win = loadSound("Sounds/win.mp3");
  enter = loadSound("Sounds/enter.mp3");
  select = loadSound("Sounds/select.mp3");
  collect = loadSound("Sounds/collect.mp3");
  death = loadSound("Sounds/death.mp3");
  impulse = loadSound("Sounds/impulse.mp3");
  move = loadSound("Sounds/move.mp3");

  kick1 = loadSound("Sounds/kick1.mp3");
  kick2 = loadSound("Sounds/kick2.mp3");
  snare = loadSound("Sounds/snare.mp3");
} 

function setup() {
  frameRate(60);
  createCanvas(windowWidth, windowHeight);
  light=loadFont('Fonts/Gilroy-Light.otf');
  bold=loadFont('Fonts/Gilroy-ExtraBold.otf');
  cufel=loadFont('Fonts/cufel.otf');

  cursor = loadImage('Images/cursor.png');
  locker = loadImage('Images/locker.png');
  headphones = loadImage('Images/headphones.png');

  frameSize = windowWidth/15;

  player = new Player(windowWidth/30,windowWidth/30);

  //levels.push(new Level(0,"music name",8000,1,windowWidth/4.4,windowHeight/3,windowWidth-windowWidth/4,windowHeight/2.2));
  levels.push(new Level(0,"grave",12000,1,windowWidth/4,windowHeight/2.5,windowWidth/2 + windowWidth/4.6,windowHeight/2.5));
  levels.push(new Level(1,"largo",7000,1,windowWidth/4.4,windowHeight/2.5,windowWidth/3 + windowWidth/5  + windowWidth/5 - windowWidth/7 + windowWidth/6,windowHeight/2.5));
  levels.push(new Level(2,"lento",7500,1,windowWidth/4.4,windowHeight/2.5,windowWidth/3-windowWidth/7 + windowWidth/5 + windowWidth/9 +windowWidth/3 -windowWidth/12 ,windowHeight/2 - windowHeight/15));
  levels.push(new Level(3,"adagio",5000,1,windowWidth/4.6,windowHeight/1.5,windowWidth/3 + windowWidth/5  + windowWidth/5 - windowWidth/7 + windowWidth/6,windowHeight/2.5));
  levels.push(new Level(4,"andante",8000,1,windowWidth/4.6,windowHeight/2.5,windowWidth/3 + windowWidth/5  + windowWidth/5 - windowWidth/7 + windowWidth/6,windowHeight/2.5));
  levels.push(new Level(5,"moderato",8000,1,windowWidth/4.4,windowHeight/1.5,windowWidth/3 + windowWidth/5  + windowWidth/5 - windowWidth/7 + windowWidth/6,windowHeight/2.5));
  levels.push(new Level(6,"allegretto",8000,1,windowWidth/4.4-windowWidth/15-windowWidth/15,windowHeight/1.5 ,windowWidth -windowWidth/15-windowWidth/15,windowHeight/1.5));
  levels.push(new Level(7,"allegro",6500,1,windowWidth/4.4-windowWidth/8.5,windowHeight/1.5,windowWidth/4.4-windowWidth/15-windowWidth/28,windowHeight/4));
  levels.push(new Level(8,"vivace",5000,1,windowWidth/4.4-windowWidth/15-windowWidth/12,windowHeight/1.5 ,windowWidth-windowWidth/15-windowWidth/13,windowHeight/4));
  levels.push(new Level(9,"presto",3000,1,windowWidth/4.4-windowWidth/15-windowWidth/15,windowHeight/1.5 ,windowWidth -windowWidth/15-windowWidth/15,windowHeight/1.5));

  //levels.push(new Level(6,"Level 7",8000,1,windowWidth/4.4-windowWidth/15,windowHeight/3 ,windowWidth/4.4-windowWidth/15,windowHeight/2));


  menu = new Menu();
  splashScreen = new splashScreen("NOT QUITE MY TEMPO");
  
  click.setVolume(0.2);
  win.setVolume(0.1);
  impulse.setVolume(0.1);
  select.setVolume(0.15);
  enter.setVolume(0.2);
  snare.setVolume(0.25);
  move.setVolume(0.2);

  swell.setVolume(0.2);
  switchSound.setVolume(0.1);
  landSound.setVolume(0.1);

  spawnSound.setVolume(0.2);
  
  menuMusic.loop();
  ambient.loop();
}

function draw() {

  /*if (allCompleted() && currentLevel == levels.length-1) {
    switchToBlack();
    currentLevel = -4;
  }*/

  document.body.style.cursor = "none";

  ambient.setVolume(ambVol);
  menuMusic.setVolume(menuVol);

  //menuMusic.setVolume(0.3-map(blackOpac,0,255,0,0.3));

  background(cBackground);

  switchToBlack();
  if (currentLevel == -5) {
    textFont(light);
    textSize(windowHeight / 50);
    noStroke();
    fill(c2);

    if (millis() < 7000) {
      image(headphones,windowWidth/2-windowHeight/10, windowHeight/2-windowHeight/10-windowHeight/15,windowHeight/5,windowHeight/5);
      text("Please use headphones for a better experience.", windowWidth/2-textWidth("Please use headphones for a better experience.")/2, windowHeight/2+windowHeight/15);
    }
    if (millis() > 6500 && millis() < 6600) {
      switchBlack = true;
    }

    if (millis() > 6600 && switchBlack == false && blackOpac >= 255) currentLevel = -3;
  }

  else if (currentLevel == -4) {
    finalTextAlpha+=2;
    fill(c2[0],c2[1],c2[2],finalTextAlpha);
    text("Thanks for playing!", windowWidth/2,windowHeight/2);
    if (ambVol > 0) {
      if ( ambVol - 0.01 < 0) ambVol = 0;
      else ambVol -= 0.01;
    }
    if (menuVol > 0) {
      if ( menuVol - 0.01 < 0) menuVol = 0;
      else menuVol -= 0.01;
    }
  }

  else if (currentLevel == -3) {
    document.body.style.cursor = "";
    textFont(cufel);
    splashScreen.draw();
  }
  
  else if (currentLevel >= 0) {
    if (switchBlack) {
      switchToBlack();
    }
    else {
      if (menuVol > 0) {
        if ( menuVol - 0.01 < 0) menuVol = 0;
        else menuVol -= 0.01;
      }
      if (ambVol < 0.8) ambVol += 0.004;
      levels[currentLevel].draw();
      switchView();
    }
  }
  else {
    if (switchBlack) {
      switchToBlack();
    }
    else {
        menu.draw();
      if (ambVol > 0) {
        if ( ambVol - 0.01 < 0) ambVol = 0;
        else ambVol -= 0.01;
      }
      if (menuVol < 0.6) menuVol += 0.0006;
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
  fill(c[0],c[1],c[2],blackOpac);
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
  if (blackOpac <= 0 && switchBlack == false) {
  if (currentLevel == -3) {
    if (key=='e' || key==' ' || key=="Enter") {
    currentLevel = -1;
    c = [0,0,0];
    switchBlack = true;
    enter.play();
    }
  }

  else if (currentLevel == -1) {
    if (key=='a' || key=="ArrowLeft" && key!='d' && key!="ArrowRight") menu.downPosition();
    if (key=='d' || key=="ArrowRight" && key!='a' && key!="ArrowLeft") menu.upPosition();
    if (key==' ' || key=="Enter") {
      switchCheck = false;
      currentLevel = menu.selected;
      levels[currentLevel].eTimer = millis();
      levels[currentLevel].number_of_deaths = 0;
      levels[currentLevel].reset();
      levels[currentLevel].activeSlot = 0;
      if (currentLevel == 1) {
        if (tutorial == 2) {
          tutorial = 3;
          tutorialTimer = millis();
        }
      }
      if (currentLevel == 2) {
        if (tutorial == 6) {
          tutorial = 7;
          tutorialTimer = millis();
        }
      }
        if (currentLevel == 3) {
          if (tutorial == 14) {
            tutorial = 15;
            tutorialTimer = millis();
          }
      }
      if (currentLevel == 4) {
        if (tutorial == 16) {
          tutorial = 17;
          tutorialTimer = millis();
        }
    }
      
      //player.counterLand = 0;
      select.play();
      c = [0,0,0];
      switchBlack = true;
    }
  }
  else if (currentLevel >= 0 && levels[currentLevel].win.winner == false && switchCheck == false){
    if (key == "Escape") {
      if (tutorial > 15) {
      select.play();
      currentLevel = -1;
      c = [0,0,0];
      document.body.style.cursor = "";
      switchBlack = true;
      }
    }

    if (key=='a' || key=="ArrowLeft" && key!='d' && key!="ArrowRight") {
      if (tutorial > 0  && tutorial != 3 && tutorial != 4 && tutorial != 8  && tutorial != 10) {
      player.drifting_right = false;
      player.drifting_left = false;
      player.move = -player.walk;
      leftPressed=1;
      }
      if (tutorial == 1) {
        tutorial = 2;
        tutorialTimer = millis();
      }
    }
    if (key=='d' || key=="ArrowRight" && key!='a' && key!="ArrowLeft") {
      if (tutorial > 0 && tutorial != 3 && tutorial != 4  && tutorial != 8  && tutorial != 10) {
      player.drifting_left = false;
      player.drifting_right = false;
      player.move = player.walk;
      rightPressed=1;
      }
      if (tutorial == 1) {
        tutorial = 2;
        tutorialTimer =millis();
      }
    }
    if (key==' ' || key=='w' || key=='ArrowUp' && !player.jumping) {
      if (tutorial != 3 && tutorial != 4 && tutorial != 8  && tutorial != 10) {
      player.jump();
      airTime = millis();
      }
    
      if (tutorial == 0) {
        tutorial = 1;
        tutorialTimer = millis();
      }

    }
    //if (key=='e') switchCheck = true;
  }
}
}

function keyReleased() {
  if (currentLevel == -1) {

  }
  else if (currentLevel >= 0 && levels[currentLevel].win.winner == false) {

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
    if (key=='e') {
      if (tutorial > 2 && tutorial != 7 && tutorial != 9 && tutorial != 10 && tutorial != 11) {
      switchCheck = !switchCheck;
      switchSound.play();
      }
      if (tutorial == 3) {
        tutorial = 4;
        tutorialTimer =millis();
      }
      if (tutorial == 4 && millis()-tutorialTimer>=2000) {
        tutorial = 5;
        tutorialTimer =millis();
      }
      if (tutorial == 8) {
        tutorial = 9;
        tutorialTimer =millis();
      }
      if (tutorial == 12) {
        tutorial = 13;
        tutorialTimer =millis();
      }
    }
    
  }
}

function drawCursor() {
  if (switchDist>=windowHeight || currentLevel == -1 || currentLevel == -2 && switchBlack == false && blackOpac <= 0) {
    //fill(255,255,0);
    document.body.style.cursor = "";
    //circle(mouseX, mouseY,windowHeight/30);
    //image(cursor,mouseX, mouseY,windowHeight/30,windowHeight/30);
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
    if (currentLevel >= 0) cBackground = c2;
    else cBackground = c1;
  }

  if (auxBlack) {
    if (blackOpac <= 0) {
      auxBlack = false;
    }
    else blackOpac-=9;
  } 
}

function allCompleted() {
  let aux = true;
  for (let l of levels) if (l.completed == false) aux = false;
  return aux;
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