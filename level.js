class Level {
    timelines = [];
    collectables = [];
    platforms = [];
    blueBlocks = [];
    impulseBlocks = [];
    damageBlocks = [];
    draggables = [];

    songName;

    vol;

    id; //identificacao
    loopLength; //tempo do loop em milissegundos
    loopLengthReduce; //tempo do loop reduzido em 20% em milissegundos
    final_loop;
    instant; //instante atual
    interClock; //tempo entre slots
    nChuncks; //numero de ecra que ocupa o nivel
    completed; //indica se o nivel foi completo
    unlocked; //indica se e possivel jogar o nivel
    activeSlot; //slot atual em todas as timelines
    initX;initY; // posicao inicial do jogador no nivel
    winX;winY; //posicao da meta do nivel
    tutorialAlpha;
    win; //objeto win
    drag; //bloco de arrasto
    number_of_deaths; //numero de mortes no nivel
    menuX; //pos x do nivel no menu
    sizeMenu; //nivel em destaque no menu

    constructor(id,songName,loopLength,nChuncks,initX,initY,winX,winY) {
        this.id = id;
        this.songName = songName;
        this.loopLength = loopLength;
        this.loopLengthReduce = this.loopLength + this.loopLength*0.3;
        this.nChuncks = nChuncks;
        this.initX = initX;
        this.initY = initY;
        this.winX = winX;
        this.winY = winY;

        this.final_loop = 0;
        this.number_of_deaths=0;
        this.instant = 0;
        this.interClock = 0;
        this.activeSlot = 0;
        this.tutorialAlpha = 0;

        this.completed = false;

        //this.completed = true;
        this.unlocked = false;

        //if (this.id == 9) this.completed = false;
    
        this.win = new Win(winX,winY);
        player.x = this.initX;
        player.y = this.initY;

            switch(id) {
                case 0:
                    this.unlocked = true;
    
                    //timelines
                    this.timelines.push(new Timeline("blue",[0,0,0,0,0,0,0,0],[note1,note2,note3,note4]));
    
                    //posição relativa timelines
                    this.setPos();
    
                    this.createDraggables();
    
                    //plataformas
                    this.platforms.push(new Platform(windowWidth/2-windowWidth/1.6/2,windowHeight/2,windowWidth/1.6,windowHeight/35));
                    //this.platforms.push(new Platform(windowWidth/3 + windowWidth/5  + windowWidth/5 - windowWidth/7,windowHeight/2,windowWidth/5,windowHeight/35));
    
                    //blocos
                    //this.blueBlocks.push(new BlueBlock(windowWidth/3 + windowWidth/5 - windowWidth/7  ,windowHeight/2,windowWidth/5,windowHeight/35));
                    
    
                    //Collectables
                    //this.collectables.push(new Collectable(windowWidth/3.2,windowHeight/2.5));
                    break;
                case 1:
                    //this.unlocked = true;
    
                    //timelines
                    this.timelines.push(new Timeline("red",[1,1,0,0,1,1,0,0],[snare]));
    
                    //posição relativa timelines
                    this.setPos();
    
                    this.createDraggables();
    
                    //plataformas
                    this.platforms.push(new Platform(windowWidth/2-windowWidth/1.5/2,windowHeight/2,windowWidth/1.5,windowHeight/35));
    
                    //blocos
                    this.damageBlocks.push(new DamageBlock(windowWidth/2-windowHeight/35/2,windowHeight/4,windowHeight/35,windowHeight/4+5));
    
                    break;    
                case 2:
                       
                    //this.unlocked = true;
    
                //timelines
                this.timelines.push(new Timeline("blue",[0,0,0,0,0,0,0,0],[note1,note2,note3,note4]));

                //posição relativa das timelines
                this.setPos();

                this.createDraggables();

                //plataformas

                this.platforms.push(new Platform(windowWidth/5.5,windowHeight/2,windowWidth/5,windowHeight/35));
                this.platforms.push(new Platform(windowWidth-windowWidth/5.5-windowWidth/5,windowHeight/2,windowWidth/5,windowHeight/35));


                //blocos
                this.blueBlocks.push(new BlueBlock(windowWidth/2-windowWidth/16,windowHeight/2,windowWidth/8,windowHeight/35));

                

                //collectables
                this.collectables.push(new Collectable(windowWidth/3,windowHeight/2.5));

                break;
    
                case 3:
                    
                    //this.unlocked = true;
    
                    //timelines
                    this.timelines.push(new Timeline("impulse",[0,0,1,1,0,0,0,0],[kick1]));
    
                    //posição relativa timelines
                    this.setPos();
    
                    this.createDraggables();
    
                    //plataformas
                    this.platforms.push(new Platform(windowWidth/3-windowWidth/7,windowHeight/2+windowHeight/4,windowWidth/5,windowHeight/35));
                    this.platforms.push(new Platform(windowWidth/3-windowWidth/7 + windowWidth/5 + windowWidth/9, windowHeight/2,windowWidth/3,windowHeight/35));
    
                    //blocos
                    this.impulseBlocks.push(new ImpulseBlock(windowWidth/3-windowWidth/7 + windowWidth/5,windowHeight/2+windowHeight/4,windowWidth/10,windowHeight/35,26*player.ratioHeight));
                    
    
                    break;
    
                case 4:
                    
                    //this.unlocked = true;
    
                    //timelines
                    this.timelines.push(new Timeline("blue",[0,0,0,0,0,0,0,0],[note1,note2,note3,note4]));
                    this.timelines.push(new Timeline("red",[0,0,1,0,0,0,1,0],[snare]));
    
                    //posição relativa das timelines
                    this.setPos();
    
                    this.createDraggables();
    
                    //plataformas
                    this.platforms.push(new Platform(windowWidth/5.5,windowHeight/2,windowWidth/5,windowHeight/35));
                    this.platforms.push(new Platform(windowWidth-windowWidth/5.5-windowWidth/5,windowHeight/2,windowWidth/5,windowHeight/35));
    
                    //blocos
                    this.damageBlocks.push(new DamageBlock(windowWidth/5.5+windowWidth/5/2-windowHeight/35/2,windowHeight/4+5,windowHeight/35,windowHeight/4));
                    this.blueBlocks.push(new BlueBlock(windowWidth/2-windowWidth/16,windowHeight/2,windowWidth/8,windowHeight/35));
    
    
                    //collectables
                    this.collectables.push(new Collectable(windowWidth/3,windowHeight/2.5));
    
                    break;
    
                case 5: 
    
                    //this.unlocked = true;
    
                    //timelines
                    this.timelines.push(new Timeline("blue",[0,0,0,0,0,0,0,0],[note1,note2,note3,note4]));
                    this.timelines.push(new Timeline("impulse",[0,0,1,0,0,0,1,0],[kick1]));
    
                    //posição relativa das timelines
                    this.setPos();
    
                    this.createDraggables();
    
                    //plataformas
                    this.platforms.push(new Platform(windowWidth/3-windowWidth/7,windowHeight/2+windowHeight/4,windowWidth/5,windowHeight/35));
                    this.platforms.push(new Platform(windowWidth/3-windowWidth/7 + windowWidth/5 + windowWidth/9 + windowWidth/5.5, windowHeight/2,windowWidth/7,windowHeight/35));
                    //blocos
                    //impulse block
                    this.impulseBlocks.push(new ImpulseBlock(windowWidth/3-windowWidth/7 + windowWidth/5,windowHeight/2+windowHeight/4,windowWidth/10,windowHeight/35,28*player.ratioHeight));
                    this.blueBlocks.push(new BlueBlock(windowWidth/3-windowWidth/7 + windowWidth/5 + windowWidth/9, windowHeight/2,windowWidth/7,windowHeight/35));
    
                    //collectables
                    this.collectables.push(new Collectable(windowWidth/3,windowHeight/1.55));
    
                    break;
    
    
                case 6:
                    
                    //this.unlocked = true;
    
                    //timelines
                    this.timelines.push(new Timeline("blue",[0,0,0,0,0,0,0,0],[note1,note2,note3,note4]));
                    this.timelines.push(new Timeline("red",[0,0,1,0,0,0,1,0],[snare]));
                    this.timelines.push(new Timeline("impulse",[0,0,1,1,0,0,0,0],[kick1]));
                    
    
                    //posição relativa das timelines
                    this.setPos();
    
                    this.createDraggables();
    
                    //plataformas
                    this.platforms.push(new Platform(windowWidth/3-windowWidth/7-windowWidth/15-windowWidth/15,windowHeight/2+windowHeight/4,windowWidth/9,windowHeight/35));
                    this.platforms.push(new Platform(windowWidth/2.1-windowWidth/15-windowWidth/8,windowHeight/1.92,windowWidth/15,windowHeight/35));
                    //platform to the right of the blue block
                    this.platforms.push(new Platform(windowWidth/2.2, windowHeight/3.14,windowWidth/9,windowHeight/35));
    
                    //higher platform to the right
                    this.platforms.push(new Platform(windowWidth/2.1 + windowHeight/8 + windowWidth/12 + windowWidth/9 +  windowWidth/30 + windowWidth/5.5-windowWidth/15-windowWidth/12,windowHeight/2+windowHeight/4,windowWidth/8,windowHeight/35));
                    
    
                    //blocos
                    this.impulseBlocks.push(new ImpulseBlock(windowWidth/3-windowWidth/7 + windowWidth/9-windowWidth/15-windowWidth/15,windowHeight/2+windowHeight/4,windowWidth/15,windowHeight/35,28*player.ratioHeight));
                    this.damageBlocks.push(new DamageBlock(windowWidth/4,windowHeight/2.8,windowHeight/35,windowHeight/4));
                    this.impulseBlocks.push(new ImpulseBlock(windowWidth/2.1-windowWidth/15-windowWidth/8+windowWidth/15,windowHeight/1.92,windowWidth/15,windowHeight/35,28*player.ratioHeight));
                    this.damageBlocks.push(new DamageBlock(windowWidth/2.2+windowWidth/9,windowHeight/3.14,windowWidth/5,windowHeight/35));
                    
                    //blue block below the higher platform, a little below the win level
                    this.blueBlocks.push(new BlueBlock(windowWidth/2.1 + windowHeight/8 + windowWidth/12 + windowWidth/9 +  windowWidth/30 -windowWidth/15-windowWidth/12,windowHeight/2+windowHeight/4,windowWidth/5.5,windowHeight/35));
                    //collectables
                    //collectible on top of the higher platform
                    this.collectables.push(new Collectable(windowWidth/2.2+windowWidth/9/2, windowHeight/4));
                    break;
                case 7:
                    
                    //this.unlocked = true;
    
                    //timelines
                    this.timelines.push(new Timeline("blue",[0,0,0,1,0,0,0,0],[note1,note2,note3,note4]));
                    this.timelines.push(new Timeline("red",[0,1,1,0,1,0,1,0],[snare]));
                    this.timelines.push(new Timeline("impulse",[0,0,0,0,0,0,0,0],[kick1]));
                    
    
                    //posição relativa das timelines
                    this.setPos();
    
                    this.createDraggables();
    
                    //plataformas
                    this.platforms.push(new Platform(windowWidth/3-windowWidth/7-windowWidth/15-windowWidth/15,windowHeight/2+windowHeight/4,windowWidth/7,windowHeight/35));
                    this.platforms.push(new Platform(windowWidth/2-windowWidth/80*2,windowHeight/2+windowHeight/4,windowWidth/10,windowHeight/35));
                    this.platforms.push(new Platform(windowWidth/1.55,windowHeight/2+windowHeight/4,windowWidth/7,windowHeight/35));
                    this.platforms.push(new Platform(windowWidth/1.55,windowHeight/3.07,windowWidth/7,windowHeight/35));
                    this.platforms.push(new Platform(windowWidth/3-windowWidth/7-windowWidth/15-windowWidth/15,windowHeight/3.07,windowWidth/7,windowHeight/35));


                    //platform to the right of the blue block
                   // this.platforms.push(new Platform(windowWidth/2.2, windowHeight/3.2,windowWidth/9,windowHeight/35));
    
                    //higher platform to the right
                    //this.platforms.push(new Platform(windowWidth/2.1 + windowHeight/8 + windowWidth/12 + windowWidth/9 +  windowWidth/30 + windowWidth/5.5-windowWidth/15-windowWidth/12,windowHeight/2+windowHeight/4,windowWidth/8,windowHeight/35));
                    
    
                    //blocos
                    this.damageBlocks.push(new DamageBlock(windowWidth/1.66,windowHeight/1.8,windowHeight/35,windowHeight/3.5));
                    this.impulseBlocks.push(new ImpulseBlock(windowWidth/1.55+windowWidth/7,windowHeight/2+windowHeight/4,windowWidth/8,windowHeight/35,36*player.ratioHeight));
                    this.damageBlocks.push(new DamageBlock(windowWidth/1.66,windowHeight/1.8,windowHeight/35,windowHeight/3.5));

                    
                    //blue block below the higher platform, a little below the win level
                    this.blueBlocks.push(new BlueBlock(windowWidth/3.5-windowWidth/80,windowHeight/2+windowHeight/4,windowWidth/8,windowHeight/35));
                    this.blueBlocks.push(new BlueBlock(windowWidth/2-windowWidth/80*2,windowHeight/3.07,windowWidth/10,windowHeight/35));
                    this.blueBlocks.push(new BlueBlock(windowWidth/3.5-windowWidth/80,windowHeight/3.07,windowWidth/8,windowHeight/35));

                    //collectables
                    //collectible on top of the higher platform
                    this.collectables.push(new Collectable(windowWidth-windowWidth/3.5, windowHeight/4));
                    this.collectables.push(new Collectable(windowWidth/2+windowWidth/37, windowHeight/1.5));
                    break;
                case 8:
                    
                    //this.unlocked = true;
    
                    //timelines
                    this.timelines.push(new Timeline("blue",[0,0,0,1,0,0,0,0],[note1,note2,note3,note4]));
                    this.timelines.push(new Timeline("red",[1,0,1,0,1,0,0,0],[snare]));
                    this.timelines.push(new Timeline("impulse",[0,0,0,0,0,0,0,0],[kick1]));
                    
    
                    //posição relativa das timelines
                    this.setPos();
    
                    this.createDraggables();
    
                    //plataformas
                    this.platforms.push(new Platform(windowWidth/3-windowWidth/7-windowWidth/15-windowWidth/15,windowHeight/2+windowHeight/4,windowWidth/6,windowHeight/35));
                    this.platforms.push(new Platform(windowWidth/2.2,windowHeight/3.07,windowWidth/8,windowHeight/35));
                    //platform to the right of the blue block
                    //this.platforms.push(new Platform(windowWidth/2.2, windowHeight/3.2,windowWidth/9,windowHeight/35));
    
                    //higher platform to the right
                    this.platforms.push(new Platform(windowWidth-windowWidth/12-windowWidth/8,windowHeight/3.07,windowWidth/8,windowHeight/35));
                    
    
                    //blocos
                    this.impulseBlocks.push(new ImpulseBlock(windowWidth/3.5-windowWidth/80,windowHeight/2+windowHeight/4,windowWidth/8,windowHeight/35,34*player.ratioHeight));
                    this.damageBlocks.push(new DamageBlock(windowWidth/1.6,windowHeight/3.07,windowWidth/8,windowHeight/35));
                    this.impulseBlocks.push(new ImpulseBlock(windowWidth/1.6,windowHeight/2,windowWidth/8,windowHeight/35,24*player.ratioHeight));

                    
                    //blue block below the higher platform, a little below the win level
                    this.blueBlocks.push(new BlueBlock(windowWidth/3.5-windowWidth/80,windowHeight/3.07,windowWidth/8,windowHeight/35));
                    //collectables
                    //collectible on top of the higher platform
                    this.collectables.push(new Collectable(windowWidth/5.6, windowHeight/1.5));
                    break;
                case 9:
                    
                    //this.unlocked = true;
    
                    //timelines
                    //plataforma
                    this.timelines.push(new Timeline("blue",[1,0,0,0,0,1,0,1],[note1,note2,note3,note4]));
                    //dano
                    this.timelines.push(new Timeline("red",[0,1,0,1,0,1,0,0],[snare]));
                    //impulso
                    this.timelines.push(new Timeline("impulse",[0,0,0,0,0,0,0,0],[kick1]));
                    
    
                    //posição relativa das timelines
                    this.setPos();
    
                    //1
                    this.createDraggables();
    
                    //plataforma de começo
                    //this.platforms.push(new Platform(windowWidth / 3 - windowWidth / 7 - windowWidth / 8.5, windowHeight / 2 + windowHeight / 4, windowWidth / 9, windowHeight / 35));
                    this.blueBlocks.push(new BlueBlock(windowWidth / 3 - windowWidth / 7- windowWidth / 8.5, windowHeight/1.2, windowWidth / 9, windowHeight / 35));
                    //plataforma de começo
                    
                
                    //plataforma suporte a de impulso
                    this.platforms.push(new Platform(windowWidth / 3 - windowWidth / 7 - windowWidth / 8 + windowWidth / 6 + windowWidth / 10-windowWidth/12,windowHeight/1.2,windowWidth/12,windowHeight/35));
                    //primeiro bloco de impulso
                    this.impulseBlocks.push(new ImpulseBlock(windowWidth / 3 - windowWidth / 7 - windowWidth / 8 + windowWidth / 6 + windowWidth / 10-windowWidth/12+windowWidth/12,windowHeight/1.2,windowWidth/18,windowHeight/35,25*player.ratioHeight));

                    // segundo(smaller and further away)
                    this.impulseBlocks.push(new ImpulseBlock(windowWidth/8+windowWidth / 3 - windowWidth / 7 - windowWidth /8 + windowWidth / 6 + windowWidth / 9 + windowWidth / 6-windowWidth / 18 + windowWidth / 30, windowHeight /1.2, windowWidth / 18, windowHeight / 35,25*player.ratioHeight));
                    //sugunda plataforma de suporte
                    this.platforms.push(new Platform(-windowWidth / 18 + windowWidth / 3 - windowWidth / 7 - windowWidth /8 + windowWidth / 6 + windowWidth / 9 + windowWidth / 6-windowWidth / 18 + windowWidth / 30+windowWidth / 18,windowHeight/1.2,windowWidth/8,windowHeight/35));
                    
                    //red block between those 2
                    this.damageBlocks.push(new DamageBlock(windowWidth / 3 - windowWidth / 7 - windowWidth / 8 + windowWidth / 6 + windowWidth / 10 - windowWidth / 16 + windowWidth / 12 + windowWidth / 18 + windowWidth / 55, windowHeight / 2.8, windowHeight / 35, windowHeight / 4));
    
                    //collectable on top of the first blue platform
                    this.collectables.push(new Collectable(windowWidth/4.4-windowWidth/20-windowWidth/21, windowHeight/1.3));
                    this.platforms.push(new Platform(windowWidth / 2.1 + windowHeight / 8 + windowWidth / 12 + windowWidth / 9 - windowWidth / 3 + windowWidth / 30 + windowWidth / 5.5 - windowWidth / 12 + windowWidth / 4.5,windowHeight/1.2,windowWidth/6.5,windowHeight/35));
                    //last blue plataform
                   // this.blueBlocks.push(new BlueBlock(windowWidth / 2.1 + windowHeight / 8 + windowWidth / 12 + windowWidth / 9 -windowWidth / 3 + windowWidth / 30 + windowWidth / 5.5 - windowWidth / 15 + windowWidth / 8, windowHeight / 1.2, windowWidth / 10, windowHeight / 35));

                    //this.win = new Win(windowWidth / 2.1 + windowHeight / 8 + windowWidth / 12 + windowWidth / 9 - windowWidth / 3 + windowWidth / 30 + windowWidth / 5.5 - windowWidth / 15 + windowWidth / 8 + windowWidth / 8+windowWidth / 9/2,windowHeight/1.3);
                    break;
                
                default:
                    this.unlocked = false;
                    break;
            }  
    }

    draw() {
        this.instant = millis();

        this.win.draw();

        noStroke();

        if (currentLevel == this.id) player.jumping = true;

        //desenhar timelines
        for (let t of this.timelines) {
            t.draw(this.activeSlot);
            if (t.type == "impulse" && t.sequence[this.activeSlot] == 1) {
                for (let ib of this.impulseBlocks) ib.active = true;
            }
            else if (t.type == "blue" && t.sequence[this.activeSlot] == 1) {
                for (let bb of this.blueBlocks) bb.active = true;
            }
            else if (t.type == "red" && t.sequence[this.activeSlot] == 1) {
                for (let db of this.damageBlocks) db.active = true;
            }
            else if (t.type == "red" && t.sequence[this.activeSlot] == 0) {
                for (let db of this.damageBlocks) db.active = false;
            }
            else if (t.type == "impulse" && t.sequence[this.activeSlot]==0){
                for (let ib of this.impulseBlocks) ib.active = false;
            }
            else for (let bb of this.blueBlocks) bb.active = false;
        }

        //avanco timelines

        if(this.number_of_deaths >= 5){
            this.final_loop = this.loopLengthReduce;
        }else{
            this.final_loop = this.loopLength;
        }
        if (this.instant - this.interClock >= this.final_loop / 8) {
            this.interClock = this.instant;
            if (this.win.winner == false) {
            click.play();
            this.win.pulse();
            for (let t of this.timelines) t.canPlay = true;
            if (this.activeSlot < 8 - 1) {
                this.activeSlot += 1;
                for (let d of this.draggables) d.pop(this.activeSlot);
            }
            else this.activeSlot = 0;
            }
        }
 

        //desenhar blocos de dano
        for (let db of this.damageBlocks){
            db.draw();
            if (db.collide(player)) {
                player.jumping = false;
                player.y = windowHeight+player.h*10;
            }     
        }
    
       //verificar colisoes e desenhar plataformas fixas
        for (let p of this.platforms) {
          p.draw();
          if (p.collide(player)) {
            player.jumping = false;
            player.y = p.y;
          }
        }

        //desenhar blocos de impulso
        for (let ib of this.impulseBlocks){
            ib.draw();
            if (ib.collide(player)) {
                player.jumping = false;
            }     
        }

        //desenhar blocos azuis
        for (let bb of this.blueBlocks) {
            bb.draw();
            if (bb.collide(player)) {
                player.jumping = false;
                player.y = bb.y;
            }
        }

        //desenhar draggables
        for (let d of this.draggables) d.draw(this.draggables);


        //desenhar coletaveis
        for (let c of this.collectables){
            c.draw();
            if (c.catched && switchDist>=windowHeight) {
                if(c.createBlock == false) {
                    this.draggables.push(new Draggable(200, 200, -1, cHighlight, "none",false,false));
                    c.createBlock = true;
                }
            }
        }
        
        //jogador cai
        if (player.y > windowHeight) player.death();
        if (player.y > player.distToDeath) this.reset();

        player.draw();

        //nivel ganho
        if (this.win.winner) {
            if (currentLevel == 1) {
                if (tutorial == 3) {
                  tutorial = 4;
                  tutorialTimer = millis();
                }
              }
            player.move = 0;
            player.x = this.win.x-player.w/2;
            player.y = this.win.y+player.h/2;

        }

        if (this.win.end) {
            player.move = 0;
            player.vel = 0;
            if (currentLevel+1 < levels.length) {
                if (this.completed && levels[currentLevel+1].completed == false) currentLevel = -1;
                else if (this.completed == false) {
                    this.completed = true;
                    levels[currentLevel+1].unlocked = true;
                    currentLevel = -2;
                }
            }
            else this.completed = true;

            if (allCompleted() && this.id == levels.length - 1) {
                currentLevel = -4;
                switchBlack = true;
            }
        }


        if (millis()-tutorialTimer>=1500) {
            if (this.tutorialAlpha < 255) this.tutorialAlpha += 5;
            if (this.tutorialAlpha >= 255) {

                if (tutorial == 5 && millis()-tutorialTimer>=4000) {
                    tutorial = 6;
                    tutorialTimer = millis();
                }

                if (tutorial == 11 && millis()-tutorialTimer>=5000) {
                    tutorial = 12;
                    tutorialTimer = millis();
                }
                
                if (tutorial == 13 && millis()-tutorialTimer>=5000) {
                    tutorial = 14;
                    tutorialTimer = millis();
                }

                if (tutorial == 17 && millis()-tutorialTimer>=5000) {
                    tutorial = 18;
                    tutorialTimer = millis();
                }
            }
        }
        else if (this.tutorialAlpha - 5 < 0) {
            this.tutorialAlpha = 0;
            tutorial2 = tutorial;
        }
        else this.tutorialAlpha -=5;

       /* if (this.tutorialAlpha < 0) {
            this.tutorialTimer = millis();
            this.tutorialAlpha();
            this.tutorialAlpha = 0;
        } */
    
        textSize(windowHeight/45);
        textAlign(CENTER,CENTER);
        fill(c1[0],c1[1],c1[2],this.tutorialAlpha);
        textFont(light);

        switch (tutorial2) {    
            case 0:
                text("Press Up Key, W or Spacebar to jump.",windowWidth/2,windowHeight-windowHeight/10);
                break;
            case 1:
                text("Use Left and Right Keys or A and D to move.",windowWidth/2,windowHeight-windowHeight/10);
                break;
            case 2:
                text("",windowWidth/2,windowHeight-windowHeight/10);
                break;
            case 3:
                text("Press E to switch the Game View.",windowWidth/2,windowHeight-windowHeight/10);
            break;
            case 4:
                text("Here you will see and change the World's Configuration. Press E to go back.",windowWidth/2,windowHeight-windowHeight/10);
            break;
            case 5:
                text("Red things hurt you. Be careful.",windowWidth/2,windowHeight-windowHeight/10);
                break;
            case 6:
                text("",windowWidth/2,windowHeight-windowHeight/10);
                break;
            case 7:
                text("Catch the Yellow Collectable.",windowWidth/2,windowHeight-windowHeight/10);
                break;
            case 8:
                text("Switch the Game View. (Press E)",windowWidth/2,windowHeight-windowHeight/10);
                break;
            case 9:
                text("Use your mouse to drag the block you earned to any available slot of the Blue Timeline.",windowWidth/2,windowHeight-windowHeight/10);
                break;
            case 10:
                text("You may change the position of the unlocked blocks how many times you want. Try it.",windowWidth/2,windowHeight-windowHeight/10);
                break;
            case 11:
                text("If you die, the level restarts. You lose your progress here as well.",windowWidth/2,windowHeight-windowHeight/10);
                break;
            case 12:
                text("Now go back. (Press E)",windowWidth/2,windowHeight-windowHeight/10);
                break;
            case 13:
                text("When active, Blue Blocks don´t let you fall.",windowWidth/2,windowHeight-windowHeight/10);
                break;
            case 14:
                text("",windowWidth/2,windowHeight-windowHeight/10);
            break;
            case 15:
                text("Green Blocks give you an impulse.",windowWidth/2,windowHeight-windowHeight/10);
                break;
            case 16:
                text("",windowWidth/2,windowHeight-windowHeight/10);
            break;
            case 17:
                text("Enjoy the game. Press Enter anytime to leave.",windowWidth/2,windowHeight-windowHeight/10);
            break;
            case 18:
                text("",windowWidth/2,windowHeight-windowHeight/10);
            break;


        }


    }

    addPlatform(x,y,w,h) {
        this.platforms.push(new Platform(x,y,w,h));
    }

    reset() {     
        this.number_of_deaths += 1;
        //console.log("reset");
        player.reset(this.initX,this.initY);
        this.win.reset();
        
        this.draggables = [];
        
        for (let t of this.timelines) t.reset();
        for (let c of this.collectables) c.reset();

        this.createDraggables();
    }

    //arrastar o bloco draggable
    mouseDragged() {
        for (let d of this.draggables) d.mouseDragged();
      } 
      
    mouseReleased() {
        for(let t of this.timelines){
            for (let d of this.draggables) d.mouseReleased(this.draggables,this.timelines);
        }
      }
    
    setPos() {
        if(this.timelines.length == 1) {
            this.timelines[0].y = windowHeight/2-this.timelines[0].h/2;
        }
        else if(this.timelines.length == 2) {
            this.timelines[0].y= windowHeight/2 - this.timelines[0].h  -this.timelines[0].h/2;
            this.timelines[1].y= windowHeight/2 + this.timelines[0].h  -this.timelines[0].h/2;
        }
        else if(this.timelines.length == 3) {
            this.timelines[0].y = windowHeight/2 - 2*this.timelines[0].h  -this.timelines[0].h/2;
            this.timelines[1].y = windowHeight/2 - this.timelines[0].h/2;
            this.timelines[2].y = windowHeight/2 + 2*this.timelines[0].h  -this.timelines[0].h/2;
        }
    }
    
    createDraggables() {
        for (let t of this.timelines) {
            for (let i = 0; i < t.sequence.length; i++)  {
                if (t.sequence[i] == 1) this.draggables.push(new Draggable(windowWidth/2+t.w*(i-4), t.y, i, t.color, t.type,true,true));
             }
         }
         //console.log(this.draggables);
        }
}

