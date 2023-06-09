class Player {
    x; y; //pos
    w; h; //tamanho
    deathX; deathY;
    vel; //velocidade de queda
    move; //distancia esquerda/direita
    walk; //velocidade de movimento
    jumping; //bool de controlo de salto e colisao
    drifting_left;
    drifting_right;
    decrement = 0.4;
    impulsePower = windowHeight/10;
    jumpSounds = [loadSound("Sounds/jump1.mp3"),loadSound("Sounds/jump2.mp3"),loadSound("Sounds/jump3.mp3"),loadSound("Sounds/jump4.mp3")];
    panning = 0.5;
    acc = windowHeight*1/947;
    inc = windowHeight*0.07/947;
    distToDeath = 2*windowHeight;
    dead = false;
    land = false;
    rotation = 0;
    start = false;
    startTimer = 0;

    constructor(w,h) {
        this.x = 0;
        this.y = 0;
        this.refW = w;
        this.refH = h;
        this.w = w;
        this.h = h;
        this.vel = 0;
        this.up = (windowHeight*90)/947;
        this.move = 0;
        this.walk = windowWidth*6/1920 + (windowHeight/947-1)*windowWidth/windowHeight*(-1);
        this.jumping = true;
        this.drifting_left = false;
        this.drifting_right = false;
    }

    draw() {
        //fill(84,5,149);
        fill(cPlayer);
        noStroke();
        //rect(this.x, this.y-this.h+switchDist, this.w, this.h,5);

        if (this.start) {
            print("ai");
            this.h = 0;
            this.w = 0;
            this.rotation = 0;
            this.startTimer = millis();
            this.start = false;
        }

        if (millis() - this.startTimer < 350) {
            this.vel = 0;
            if (this.rotation + 0.2 > PI) this.rotation = PI;
            else this.rotation += 0.2;
            if (this.h + 5 > this.refH) {
                this.w = this.refW;
                this.h = this.refH;
            }
            else {
                this.w += 5;
                this.h += 5;
            }
            push();
            translate(this.x+this.w/2, this.y-this.h+switchDist+this.h/2);
            rotate(this.rotation);
            translate(-this.w/2, -this.h/2);
            rect(0, 0, this.w, this.h);
            pop();
        } 

        else {

        push();
        translate(this.x+this.w/2, this.y-this.h+switchDist+this.h/2);
        rotate(this.rotation);
        translate(-this.w/2, -this.h/2);
        rect(0, 0, this.w, this.h);
        pop();
        
         // player movement
         this.vel *= windowHeight*0.8/947;
         this.y += this.vel;
         this.x += this.move;

         this.panning = map(this.x, 0+frameSize, windowWidth-frameSize, -1.0, 1.0);

        // player velocity
        if (this.jumping) {
            if (this.move < 0) {
                if (this.rotation - 0.08 < -PI/2) this.rotation = -PI/2;
                else this.rotation -= 0.08;
            }
            else if (this.move > 0) {
                if (this.rotation + 0.08 > PI/2) this.rotation = PI/2;
                else this.rotation += 0.08;
            }
            if(this.acc<windowHeight*5/947) this.acc+=this.inc;
            this.vel += (this.acc*this.acc)/2;
            if (millis()-airTime < 500) this.land = true;
            //print(this.land);
        }
        else {
            this.rotation = 0;
            this.acc=windowHeight*1/947;
            if (this.land) {
                makeParticles(12, this.x+this.w/2, this.y-this.h/2, cPlayer, false);
                this.land = false;
                landSound.pan(this.panning);
                landSound.play();
            }
        }

        //death position
        if (player.y < windowHeight) {
        player.deathX = player.x;
        player.deathY = player.y;
        }

        //add inertia with drifting
        if(this.drifting_left){

            //console.log("Drifting Left");
            //decrease velocity every tick until velocity is zero
            if(this.move<0){
                this.move+=this.decrement;
                if(rightPressed){
                    player.move = player.walk;
                    this.drifting_left=false;
                }
            }
            else{
                this.drifting_left=false;
                this.move=0;
            }
        }
        if(this.drifting_right){

            //console.log("Drifting Right");
            //decrease velocity every tick until velocity is zero
            if(this.move>0){
                this.move-=this.decrement;
                if(leftPressed){
                    player.move=-player.walk;
                    this.drifting_right=false;
                }
            }
            else{
                this.drifting_right=false;
                this.move=0;
            }
        }
    }
    }

    jump(){
        if (!this.jumping) {
        this.vel -= windowHeight/25;

        
        let aux = int(random(0,4));
        this.jumpSounds[aux].pan(this.panning);
        this.jumpSounds[aux].setVolume(0.2);
        this.jumpSounds[aux].play();
        //jumpSound.pan(this.panning);
        }
    }

    impulse(){
        this.vel=-this.impulsePower;
        impulse.play();
    }

    reset(initX,initY) {
        airTime = millis();
        this.x = initX;
        this.y = initY;
        this.dead = false;
        this.acc=windowHeight*1/947;
        this.vel = 0;
        this.rotation = 0;
        this.h = 0;
        this.w = 0;
        this.startTimer = millis();
        //spawnSound.pan(this.panning);
        spawnSound.play();
    }

    death(){
        if(this.dead == false) {
            death.pan(this.panning);
            death.play();
            makeParticles(15, this.deathX+this.w/2, this.deathY+this.h*2.5, cPlayer, true);
        }
        this.dead = true;
    }

}
