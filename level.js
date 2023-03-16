class Level {
    timelines = [];
    collectables = [];
    platforms = [];
    blueBlocks = [];

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

        this.win = new Win(winX,winY);
        player.x = this.initX;
        player.y = this.initY;

        switch(id) {
            case 0:
                this.unlocked = true;

                this.platforms.push(new Platform(frameSize,windowHeight/2,100,10));
                this.platforms.push(new Platform(frameSize*2,windowHeight/2,100,10));
                this.platforms.push(new Platform(frameSize*3,windowHeight/2,100,10));
                this.platforms.push(new Platform(frameSize*4,windowHeight/2+50,100,10));

                this.timelines.push(new Timeline("blue",[1,0,0,0,1,0,0,0]));

                this.blueBlocks.push(new BlueBlock(frameSize*4,windowHeight/2,50,50));

                this.collectables.push(new Collectable(frameSize*2+50,windowHeight/2));
                break;
            default:
                this.unlocked = false;
                break;
        }
        //this.timelines = Array.from(new Array(8), () => new Array(nTimelines));
    
    /*for (let i = 0; i < 8; i++) {
        for (let j = 0; j < nTimelines; j++) {
            timeline[i][j] = [-1,-1];
        }
    }*/

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
            t.draw(this.activeSlot);
            if (t.type == "blue" && t.sequence[this.activeSlot] == 1) {
                for (let bb of this.blueBlocks) bb.active = true;
            }
            else for (let bb of this.blueBlocks) bb.active = false;
        }

        //avanco timelines
        if (this.instant - this.interClock >= this.loopLength / 8) {
            this.interClock = this.instant;
            if (this.activeSlot < 8 - 1) this.activeSlot += 1;
            else this.activeSlot = 0;
        }


        //desenhar blocos azuis
        for (let bb of this.blueBlocks) {
            bb.draw();
            if (bb.collide(player)) {
                player.jumping = false;
                player.y = bb.y;
            }
        }

        //desenhar coletaveis
        for (let c of this.collectables) c.draw();

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
}

