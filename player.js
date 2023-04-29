class Player {
    x; y; //pos
    w; h; //tamanho
    vel; //velocidade de queda
    move; //distancia esquerda/direita
    walk; //velocidade de movimento
    jumping; //bool de controlo de salto e colisao~
    impulsePower;
    jumpSounds = [loadSound("Sounds/jump1.mp3"),loadSound("Sounds/jump2.mp3"),loadSound("Sounds/jump3.mp3"),loadSound("Sounds/jump4.mp3")];
    panning;

    constructor(w,h) {
        this.x = 0;
        this.y = 0;
        this.w = w;
        this.h = h;
        this.vel = 0;
        this.up = 90;
        this.move = 0;
        this.walk = 6;
        this.jumping = true;
    }

    draw() {
        fill(255, 0, 0);
        noStroke();
        rect(this.x, this.y-this.h+switchDist, this.w, this.h);
        
         // player movement
         this.vel *= 0.9;
         this.y += this.vel;
         this.x += this.move;

        // player velocity
        if (this.jumping) {
            this.vel += 1.7;
        }
       
    }

    playJumpSound() {
        this.panning = map(this.x, 0+frameSize, windowWidth-frameSize, -1.0, 1.0);
        let aux = int(random(0,4));
        this.jumpSounds[aux].pan(this.panning);
        this.jumpSounds[aux].play();
    }

    impulse(){
        this.vel=-this.impulsePower;
    }

}
