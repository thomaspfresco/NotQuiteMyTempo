class Player {
    x; y; //pos
    w; h; //tamanho
    vel; //velocidade de queda
    move; //distancia esquerda/direita
    walk; //velocidade de movimento
    jumping; //bool de controlo de salto e colisao~
    impulsePower = windowHeight/10;
    jumpSounds = [loadSound("Sounds/jump1.mp3"),loadSound("Sounds/jump2.mp3"),loadSound("Sounds/jump3.mp3"),loadSound("Sounds/jump4.mp3")];
    panning;
    acc = 1;
    inc = 0.07;
    distToDeath = 2*windowHeight;
    dead = false;

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
        fill(84,5,149);
        noStroke();
        rect(this.x, this.y-this.h+switchDist, this.w, this.h);
        
         // player movement
         this.vel *= 0.8;
         this.y += this.vel;
         this.x += this.move;

         this.panning = map(this.x, 0+frameSize, windowWidth-frameSize, -1.0, 1.0);

        // player velocity
        if (this.jumping) {
            if(this.acc<5) this.acc+=this.inc;
            this.vel += (this.acc*this.acc)/2;
        }
        else this.acc=1;
    }

    jump(){
        if (!this.jumping) {
        this.vel -= windowHeight/25;
        
        let aux = int(random(0,4));
        this.jumpSounds[aux].pan(this.panning);
        this.jumpSounds[aux].play();
        }
    }

    impulse(){
        this.vel=-this.impulsePower;
        impulse.play();
    }

    reset(initX,initY) {
        this.x = initX;
        this.y = initY;
        this.dead = false;
        this.acc=1;
        this.vel = 0;
    }

    death(){
        death.pan(this.panning);
        if(this.dead == false) death.play();
        this.dead = true;
       
    }
}
