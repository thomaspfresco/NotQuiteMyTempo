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
    eAlpha;
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
        this.eAlpha = 0;

        this.completed = false;
        //this.drag = new Block(windowHeight,windowHeight/1.5,100,20);
        this.win = new Win(winX,winY);
        player.x = this.initX;
        player.y = this.initY;

        switch(id) {
            case 0:
                this.unlocked = true;
                this.eAlpha = 255;

                //timelines
                this.timelines.push(new Timeline("blue",[0,0,0,0,0,0,0,0],[note1,note2,note3,note4]));

                //posição relativa timelines
                this.setPos();

                this.createDraggables();

                //plataformas
                this.platforms.push(new Platform(windowHeight/3,windowHeight/2,windowWidth/6,windowHeight/35));
                this.platforms.push(new Platform(windowWidth-windowHeight/3-windowWidth/6,windowHeight/2,windowWidth/6,windowHeight/35));

                //blocos
                this.blueBlocks.push(new BlueBlock(windowWidth/2-windowWidth/12,windowHeight/2,windowWidth/6,windowHeight/35));
                
                this.collectables.push(new Collectable(windowWidth/3.2,windowHeight/2.5));

                break;
            case 1:
                this.unlocked = true;

                //timelines
                this.timelines.push(new Timeline("blue",[0,0,0,0,1,0,0,0],[note1,note2,note3,note4]));
                this.timelines.push(new Timeline("red",[0,0,0,1,1,0,0,0],[snare]));

                //posição relativa timelines
                this.setPos();

                this.createDraggables();

                //plataformas
                this.platforms.push(new Platform(windowHeight/3.5,windowHeight/2,windowWidth/6,windowHeight/35));
                this.platforms.push(new Platform(windowWidth-windowHeight/3-windowWidth/6,windowHeight/2,windowWidth/6,windowHeight/35));

                //blocos
                this.blueBlocks.push(new BlueBlock(windowWidth/2-windowWidth/12,windowHeight/2,windowWidth/6,windowHeight/35));
                this.damageBlocks.push(new DamageBlock(windowWidth/2.7,windowHeight/3,windowWidth/50,windowHeight/4));

                break;    
            case 2:
               // this.unlocked = true;

                //timelines
                this.timelines.push(new Timeline("orange",[0,1,0,0,0,1,0,0],[kick1]));
                this.timelines.push(new Timeline("blue",[1,0,0,0,0,0,0,0],[note1,note2,note3,note4]));
                this.timelines.push(new Timeline("red",[0,0,0,0,0,0,1,0],[snare]));

                //posição relativa timelines
                this.setPos();

                this.createDraggables();

                //plataformas
                this.platforms.push(new Platform(-windowHeight/4,windowHeight/2+windowHeight/4,windowHeight/2,windowHeight/35));
                this.platforms.push(new Platform(windowWidth/3.4,windowHeight-windowHeight/3,windowWidth/6,windowHeight/35));
                this.platforms.push(new Platform(windowWidth-windowWidth/4,windowHeight-windowHeight/3,windowWidth/6,windowHeight/35));

                //blocos
                this.impulseBlocks.push(new ImpulseBlock(windowWidth/6,windowHeight-windowHeight/6,windowWidth/10,windowHeight/35));
                this.blueBlocks.push(new BlueBlock(windowWidth-windowWidth/2.18,windowHeight-windowHeight/3,windowWidth/6,windowHeight/35));
                this.damageBlocks.push(new DamageBlock(windowWidth/2-windowWidth/100,windowHeight/2,windowWidth/50,windowHeight/4));
                
                this.collectables.push(new Collectable(windowWidth/3,windowHeight-windowHeight/2.6));

                break;

            default:
                this.unlocked = false;
                break;
        }   
    }

    draw() {
        this.instant = millis();
        if (millis()-this.eTimer>=3500) {
            if (this.eAlpha >= 0) this.eAlpha -= 5;
        }
     
        fill(49,49,49,this.eAlpha);
        
        noStroke();

        player.jumping = true;

        //verificar colisoes e desenhar plataformas fixas
        for (let p of this.platforms) {
          p.draw();
          if (p.collide(player)) {
            player.jumping = false;
            player.y = p.y;
          }
        }

        //desenhar timelines
        for (let t of this.timelines) {
            t.draw(this.activeSlot);
            if (t.type == "orange" && t.sequence[this.activeSlot] == 1) {
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
            else if (t.type == "orange" && t.sequence[this.activeSlot]==0){
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
            click.play();
            this.win.pulse();
            for (let t of this.timelines) t.canPlay = true;
            if (this.activeSlot < 8 - 1) this.activeSlot += 1;
            else this.activeSlot = 0;
        }

        //desenhar blocos de dano
        for (let db of this.damageBlocks){
            db.draw();
            if (db.collide(player)) {
                //player.jumping = false;
                player.y = windowHeight+player.h*2;
            }     
        }

        //desenhar blocos de impulso
        for (let ib of this.impulseBlocks){
            ib.draw();
            if (ib.collide(player)) {
                player.jumping = false;
                player.impulse();     
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
                    this.draggables.push(new Draggable(200, 200, -1, cHighlight, "none",false));
                    c.createBlock = true;
                }
            }
        }
        
        //jogador cai
        if (player.y > windowHeight) player.death();
        if (player.y > player.distToDeath) this.reset();

        this.win.draw();
        player.draw();

        //nivel ganho
        if (this.win.winner) {
            this.completed = true;
            currentLevel = -2;
            player.vel = 0;
            player.move = 0;
        }

        //drawFrame();
    }

    addPlatform(x,y,w,h) {
        this.platforms.push(new Platform(x,y,w,h));
    }

    reset() {        
        this.number_of_deaths += 1;
        console.log("reset");
        player.reset(this.initX,this.initY);
        
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
                if (t.sequence[i] == 1) this.draggables.push(new Draggable(windowWidth/2+t.w*(i-4), t.y, i, t.color, t.type,true));
             }
         }
         console.log(this.draggables);
        }
}

