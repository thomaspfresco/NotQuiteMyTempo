class Player {
    x; y; //pos
    w; h; //tamanho
    vel; //velocidade de queda
    move; //distancia esquerda/direita
    walk; //velocidade de movimento
    jumping; //bool de controlo de salto e colisao
    drifting_left;
    drifting_right;
    decrement = 0.3;
    impulsePower = windowHeight/10;
    jumpSounds = [loadSound("Sounds/jump1.mp3"),loadSound("Sounds/jump2.mp3"),loadSound("Sounds/jump3.mp3"),loadSound("Sounds/jump4.mp3")];
    panning;
    acc = windowHeight*1/947;
    inc = windowHeight*0.07/947;
    distToDeath = 2*windowHeight;
    dead = false;

    constructor(w,h) {
        this.x = 0;
        this.y = 0;
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
        fill(84,5,149);
        noStroke();
        rect(this.x, this.y-this.h+switchDist, this.w, this.h);
        
         // player movement
         this.vel *= windowHeight*0.8/947;
         this.y += this.vel;
         this.x += this.move;

         this.panning = map(this.x, 0+frameSize, windowWidth-frameSize, -1.0, 1.0);

        // player velocity
        if (this.jumping) {
            if(this.acc<windowHeight*5/947) this.acc+=this.inc;
            this.vel += (this.acc*this.acc)/2;
        }
        else this.acc=windowHeight*1/947;

        //add inertia with drifting
        if(this.drifting_left){

            console.log("Drifting Left");
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
        this.acc=windowHeight*1/947;
        this.vel = 0;
    }

    death(){
        death.pan(this.panning);
        if(this.dead == false) death.play();
        this.dead = true;
       
    }

}
