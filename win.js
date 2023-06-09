class Win {
    winner;
    x;y;
    size;
    counter = 0;
    counter2 = 0;
    alphaWin = 255;
    sizeWin;
    
    constructor(x,y) {
        this.winner = false;
        this.size = windowWidth/40;
        this.sizeWin = this.size;
        this.x = x;
        this.y = y;
    }

    draw() {
        this.counter+=0.01;
        this.counter2+=0.04;
        noStroke();
        fill(cWin);
        push();
        translate(this.x,sin(this.counter2)*windowHeight/125+this.y+switchDist);
        rotate(this.counter);
        translate(-this.size/2,-this.size/2);
        rect(0,0,this.size,this.size);
        pop();
        
        push();
        translate(this.x,sin(this.counter2)*windowHeight/125+this.y+switchDist);
        rotate(PI/4 + this.counter);
        translate(-this.size/2,-this.size/2);
        rect(0,0,this.size,this.size);
        pop();

        stroke(cWin[0],cWin[1],cWin[2],this.alphaWin);
        strokeWeight(3);
        noFill();

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

        this.alphaWin-=5;
        this.sizeWin+=0.5;

        if (((player.x >this.x-this.size && player.x  < this.x +this.size/2 ) || (player.x+player.w < this.x+this.size && player.x+player.w > this.x -this.size/2  )) && player.y - player.h/2 > this.y && player.y - player.h/2 < this.y + this.size) {
            if (this.winner == false) win.play();
            this.winner = true;
            switchBlack = true;
        }
    }

    pulse() {
        this.sizeWin = this.size;
        this.alphaWin = 255;
    }
}