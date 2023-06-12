class Player {


    x; y; //pos
    lastX; lastY; //ultima posicao
    inst = 0; //instante atual
    w; h; //tamanho
    deathX; deathY;
    vel; //velocidade de queda
    move; //distancia esquerda/direita
    walk; //velocidade de movimento
    jumping; //bool de controlo de salto e colisao
    drifting_left;
    drifting_right;
    decrement;
    jumpSounds = [loadSound("Sounds/jump1.mp3"),loadSound("Sounds/jump2.mp3"),loadSound("Sounds/jump3.mp3"),loadSound("Sounds/jump4.mp3")];
    panning = 0.5;

    myHeight;
    myWidth;
    ratioHeight;
    ratioWidth;
    acc = 1;
    inc = 0.07;
    distToDeath = 2*windowHeight;
    dead = false;
    land = false;
    rotation = 0;
    start = false;
    startTimer = 0;
    setTimerJump = false;
    timerJump = 0;

    counterLand = 0;

    constructor(w,h) {
        this.x = windowWidth/4;
        this.y = windowHeight/2.5;
        this.lastX = 0;
        this.lastY = 0;
        this.myHeight = 947;
        this.myWidth = 1920;
        this.ratioHeight = windowHeight/this.myHeight;
        this.ratioWidth = windowWidth/this.myWidth;
        this.refW = w;
        this.refH = h;
        this.w = w;
        this.h = h;
        this.vel = 0;
        this.up = 90;
        this.move = 0;
        this.walk = 6;
        this.jumping = true;
        this.drifting_left = false;
        this.drifting_right = false;
        this.decrement = this.walk/15;
    }

    draw() {
        //fill(84,5,149);
        fill(cPlayer);
        noStroke();

        //print(this.x,this.lastX);
        //print(this.y,this.lastY);
        //rect(this.x, this.y-this.h+switchDist, this.w, this.h,5);

        if (this.start) {
            //print("ai");
            this.h = 0;
            this.w = 0;
            this.rotation = 0;
            this.startTimer = millis();
            this.start = false;
            if(this.ratioHeight > 1){
                this.ratioHeight = this.ratioHeight -this.ratioHeight/3;
            }else if(this.ratioHeight < 1){
                this.ratioHeight = this.ratioHeight +this.ratioHeight/3;
            }
    
            if(this.ratioWidth > 1){
                this.ratioWidth = this.ratioWidth - this.ratioWidth/2;
            }else if(this.ratioWidth < 1){
                this.ratioWidth = this.ratioWidth +this.ratioWidth/2;
            }
    
            this.up = this.up*this.ratioHeight;
            this.walk = this.walk*this.ratioWidth;

        }

        if (millis() - this.startTimer < 500) {
            this.vel = 0;
            this.move = 0;
            this.drifting_left = false;
            this.drifting_right = false;
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
        if(millis()- this.timerJump>100)rotate(this.rotation);
        translate(-this.w/2, -this.h/2);
        rect(0, 0, this.w, this.h);
        pop();
        
         // player movement
        this.vel *= 0.8*this.ratioHeight;
         this.y += this.vel;
         this.x += this.move;

         this.panning = map(this.x, 0+frameSize, windowWidth-frameSize, -1.0, 1.0);

        // player velocity
        if (this.jumping) {
            if (this.setTimerJump) this.timerJump = millis();
            this.setTimerJump = false;
            
            if (this.move < 0) {
                if (this.rotation - 0.08 < -PI/2) this.rotation = -PI/2;
                else this.rotation -= 0.08;
            }
            else if (this.move > 0) {
                if (this.rotation + 0.08 > PI/2) this.rotation = PI/2;
                else this.rotation += 0.08;
            }

            if(millis()- this.timerJump>100) this.land = true;

            //print(this.land);
            if(this.acc<windowHeight/15) this.acc+=this.inc;
            this.vel += (this.acc*this.acc)/2;
        }
        else {
            this.setTimerJump = true;
            this.rotation = 0;
            this.acc=1.6*this.ratioHeight;
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

    this.lastX = this.x;
    this.lastY = this.y;
    }

    jump(){
        if (!this.jumping) {
        this.vel -= windowHeight/16;
        let aux = int(random(0,4));
        this.jumpSounds[aux].pan(this.panning);
        this.jumpSounds[aux].setVolume(0.3);
        this.jumpSounds[aux].play();
        //jumpSound.pan(this.panning);
        }
    }

    impulse(imp){
        this.vel=-imp;
        impulse.play();
    }

    reset(initX,initY) {
        airTime = millis();
        this.x = initX;
        this.y = initY;
        this.dead = false;
        this.acc=1.6*this.ratioHeight;
        this.vel = 0;
        this.rotation = 0;
        this.h = 0;
        this.w = 0;
        this.startTimer = millis();
        this.drifting_left = false;
        this.drifting_right = false;
        //spawnSound.pan(this.panning);
        if (this.counterLand == 1) spawnSound.play();
        else this.counterLand = 1;
    }

    death(){
        if(this.dead == false) {
            death.pan(this.panning);
            death.play();
            makeParticles(15, this.deathX+this.w/2, this.deathY+this.h*3.5, cPlayer, true);
        }
        this.dead = true;
    }

}
