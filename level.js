class Level {
    timelines = [];
    collectables = [];
    platforms = [];
    id; //identificacao
    tempo; //BMPs
    nChuncks; //numero de ecra que ocupa o nivel
    completed; //indica se o nivel foi completo
    unlocked; //indica se e possivel jogar o nivel
    switchDist; //distancia a percorre na troca de vistas
    switchDist; //distancia a percorre na troca de vistas

    constructor(id,tempo,nTimelines,nChuncks) {
        this.id = id;
        this.nTimelines = nTimelines;
        this.tempo = tempo;
        this.nChuncks = nChuncks;

        this.completed = false;

        switch(id) {
            case 1:
                this.unlocked = true;
                this.platforms.push(new Platform(frameSize,windowHeight/2,100,10));
                this.platforms.push(new Platform(frameSize*2,windowHeight/2,100,10));
                this.platforms.push(new Platform(frameSize*3,windowHeight/2,100,10));
                this.platforms.push(new Platform(frameSize*4,windowHeight/2+50,100,10));
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

        player.draw();
    }

    addPlatform(x,y,w,h) {
        this.platforms.push(new Platform(x,y,w,h));
    }
}