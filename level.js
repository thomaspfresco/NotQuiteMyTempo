class Level {
    timelines = [];
    collectables = [];
    platforms = [];
    blueBlocks = [];
    impulseBlocks = [];
    draggables = [];

    songName;

    id; //identificacao
    loopLength; //tempo do loop em milissegundos
    instant; //instante atual
    interClock; //tempo entre slots
    nChuncks; //numero de ecra que ocupa o nivel
    completed; //indica se o nivel foi completo
    unlocked; //indica se e possivel jogar o nivel
    activeSlot; //slot atual em todas as timelines
    initX;initY; // posicao inicial do jogador no nivel
    winX;winY; //posicao da meta do nivel

    win; //objeto win
    drag; //bloco de arrasto

    menuX; //pos x do nivel no menu
    sizeMenu; //nivel em destaque no menu

    constructor(id,songName,loopLength,nTimelines,nChuncks,initX,initY,winX,winY) {
        this.id = id;
        this.songName = songName;
        this.nTimelines = nTimelines;
        this.loopLength = loopLength;
        this.nChuncks = nChuncks;
        this.initX = initX;
        this.initY = initY;
        this.winX = winX;
        this.winY = winY;
        
        this.instant = 0;
        this.interClock = 0;
        this.activeSlot = 0;

        this.completed = false;
        //this.drag = new Block(windowHeight,windowHeight/1.5,100,20);
        this.win = new Win(frameSize*6,winY);
        this.draggable = new Draggable(windowWidth/2,windowHeight/2-400,"orange");
        player.x = this.initX;
        player.y = this.initY;

        switch(id) {
            case 0:
                this.unlocked = true;

                //plataformas
                this.platforms.push(new Platform(frameSize,windowHeight/2,windowWidth/12,windowHeight/35));
                this.platforms.push(new Platform(frameSize*3,windowHeight/2,windowWidth/12,windowHeight/35));
                this.platforms.push(new Platform(frameSize*4,windowHeight/2,windowWidth/12,windowHeight/35));

                //timelines
                this.timelines.push(new Timeline("orange",[0,0,1,0,0,1,0,1],500));
                this.timelines.push(new Timeline("blue",[0,1,0,0,1,0,0,0],600));
               
                //blocos
                this.impulseBlocks.push(new ImpulseBlock(frameSize+windowWidth/12,windowHeight/2,windowWidth/24,windowHeight/35));
                this.blueBlocks.push(new BlueBlock(frameSize*5.4,windowHeight/2,windowWidth/12,windowHeight/35));
                
                this.collectables.push(new Collectable(frameSize,windowHeight/2-25));

                //this.draggables.push(new Draggable(windowWidth/12,windowHeight/35,windowWidth/2,windowHeight/2-400));

                break;
            default:
                this.unlocked = false;
                break;
        }

    }

    draw() {
        this.instant = millis();
        
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
            t.draw(this.activeSlot,t.pos);
            if (t.type == "orange" && t.sequence[this.activeSlot] == 1) {
                for (let ib of this.impulseBlocks) ib.active = true;
            }
            else if (t.type == "blue" && t.sequence[this.activeSlot] == 1) {
                for (let bb of this.blueBlocks) bb.active = true;
            }
            else if (t.type == "orange" && t.sequence[this.activeSlot]==0){
                for (let ib of this.impulseBlocks) ib.active = false;
            }
            else for (let bb of this.blueBlocks) bb.active = false;
        
        }

        //avanco timelines
        if (this.instant - this.interClock >= this.loopLength / 8) {
            this.interClock = this.instant;
            click.play();
            if (this.activeSlot < 8 - 1) this.activeSlot += 1;
            
            else this.activeSlot = 0;
        }


        //desenhar blocos laranja
        for (let ib of this.impulseBlocks){
            ib.draw();
            if (ib.collide(player)) {
                player.jumping = false;
                player.impulsePower=60;
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


        //desenhar coletaveis e draggable
        for (let c of this.collectables){
            c.draw();
            if(c.catched){
            this.draggable.draw();
        }}

        //jogador cai
        if (player.y > windowHeight+frameSize) this.reset();

        this.win.draw();
        player.draw();

        //nivel ganho
        if (this.win.winner) {
            this.completed = true;
            currentLevel = -2;
            player.vel = 0;
            player.move = 0;
        }
    }

    addPlatform(x,y,w,h) {
        this.platforms.push(new Platform(x,y,w,h));
    }

    reset() {
        player.x = this.initX;
        player.y = this.initY;
        for (let c of this.collectables) c.reset();
    }

    //arrastar o bloco draggable
    mouseDragged() {
    
        this.draggable.mouseDragged();
      }
      
    mouseReleased() {
        for(let t of this.timelines){
            console.log(t.sequence.length);
            this.draggable.mouseReleased(t);
        }
      

      }
      



}

