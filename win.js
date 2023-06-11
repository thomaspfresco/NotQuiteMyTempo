class Win {
    winner;
    end;
    x;y;
    size;
    counter = 0;
    counter2 = 0;
    counter3 = 0;
    alphaWin = 255;
    sizeWin;
    sizeLux = 0;
    incRot = 0.01;
    incLux = 5;
    up = 0;
    incUp = 0.001;
    
    constructor(x,y) {
        this.winner = false;
        this.end = false;
        this.size = windowWidth/40;
        this.sizeWin = this.size;
        this.x = x;
        this.y = y;
    }

    draw() {

        this.counter+=this.incRot;
        this.counter2+=0.04;
        if (this.winner) {
            this.counter3 += 0.1;
            noStroke();
            fill(255,255,255);
            push();
            translate(this.x-this.sizeLux-sin(this.counter3)*windowWidth/500/2,0);
            rect(0,0,this.sizeLux*2+sin(this.counter3)*windowWidth/500,windowHeight);
            pop();
            this.up-= this.incUp;
            this.incUp = this.incUp * 1.042;
            this.incRot = this.incRot * 1.02;
            this.incLux = this.incLux * 0.94;
            if (this.sizeLux + this.incLux > this.size * 2) this.sizeLuz = this.size*2;
            else this.sizeLux += this.incLux;
            if (player.w - 7< 0) player.w=0;
            else player.w -= 7;
            if (player.h - 7< 0) player.h=0;
            else player.h -= 7;
        }

        noStroke();
        fill(cWin);
        push();
        translate(this.x,sin(this.counter2)*windowHeight/125+this.y+switchDist+this.up);
        rotate(this.counter);
        translate(-this.size/2,-this.size/2);
        rect(0,0,this.size,this.size);
        pop();
        
        push();
        translate(this.x,sin(this.counter2)*windowHeight/125+this.y+switchDist+this.up);
        rotate(PI/4 + this.counter);
        translate(-this.size/2,-this.size/2);
        rect(0,0,this.size,this.size);
        pop();

        stroke(cWin[0],cWin[1],cWin[2],this.alphaWin);
        strokeWeight(3);
        noFill();
        if (this.winner == false) {
        push();
        translate(this.x,sin(this.counter2)*windowHeight/125+this.y+switchDist);
        rotate(this.counter);
        translate(-this.sizeWin/2,-this.sizeWin/2);
        rect(0,0,this.sizeWin,this.sizeWin);
        pop();
        
        push();
        translate(this.x,sin(this.counter2)*windowHeight/125+this.y+switchDist);
        rotate(PI/4 + this.counter);
        translate(-this.sizeWin/2,-this.sizeWin/2);
        rect(0,0,this.sizeWin,this.sizeWin);
        pop();
        }

        this.alphaWin-=5;
        this.sizeWin+=0.5;

        if (this.up<-windowHeight*3) {
            this.end = true;
            c = [255,255,255];
            switchBlack = true;
        }

        if (((player.x >this.x-this.size && player.x  < this.x +this.size/2 ) || (player.x+player.w < this.x+this.size && player.x+player.w > this.x -this.size/2  )) && player.y - player.h/2 > this.y && player.y - player.h/2 < this.y + this.size) {
            if (this.winner == false) {
                win.play();
                //swell.play(); 
            }
            this.winner = true;
        }
    }

    reset() {
        this.winner = false;
        this.end = false;
        this.sizeLux = 0;
        this.incRot = 0.01;
        this.incLux = 3;
        this.up = 0;
        this.incUp = 0.015;
        this.counter3 = 0;
    }

    pulse() {
        this.sizeWin = this.size;
        this.alphaWin = 255;
    }
}