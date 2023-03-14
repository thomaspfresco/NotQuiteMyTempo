class Level {
    timelines = [];
    collectables = [];
    platforms = [];
    blueBlocks = [];

    id; //identificacao
    tempo; //BMPs
    nChuncks; //numero de ecra que ocupa o nivel
    completed; //indica se o nivel foi completo
    unlocked; //indica se e possivel jogar o nivel
    switchDist; //distancia a percorre na troca de vistas

    initX;initY; // posicao inicial do jogador no nivel
    winX;winY; //posicao da meta do nivel

    win; //objeto win

    constructor(id,tempo,nTimelines,nChuncks,initX,initY,winX,winY) {
        this.id = id;
        this.nTimelines = nTimelines;
        this.tempo = tempo;
        this.nChuncks = nChuncks;
        this.initX = initX;
        this.initY = initY;
        this.winX = winX;
        this.winY = winY;

        this.completed = false;

        this.win = new Win(winX,winY);
        player.x = this.initX;
        player.y = this.initY;

        switch(id) {
            case 1:
                this.unlocked = true;
                this.platforms.push(new Platform(frameSize,windowHeight/2,100,10));
                this.platforms.push(new Platform(frameSize*2,windowHeight/2,100,10));
                this.platforms.push(new Platform(frameSize*3,windowHeight/2,100,10));
                this.platforms.push(new Platform(frameSize*4,windowHeight/2+50,100,10));

                this.blueBlocks.push(new BlueBlock(frameSize*4,windowHeight/2,50,50));

                this.collectables.push(new Collectable(frameSize*2+50,windowHeight/2-25));
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
        player.jumping = true;

        //verificar colisoes e desenhar plataformas fixas
        for (let p of this.platforms) {
          p.draw();
          if (p.collide(player)) {
            player.jumping = false;
            player.y = p.y;
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

        //desenhar coletaveis
        for (let c of this.collectables) c.draw();

        if (player.y > windowHeight+frameSize) {
            player.x = this.initX;
            player.y = this.initY;
        }

        this.win.draw();
        player.draw();
    }

    addPlatform(x,y,w,h) {
        this.platforms.push(new Platform(x,y,w,h));
    }

    switchView() {

    }
}