class Win {
    winner;
    x;y;
    size;
    
    constructor(x,y) {
        this.winner = false;
        this.size = windowWidth/35;
        this.x = x;
        this.y = y;
    }

    draw() {
        noStroke();
        fill(0,150,0);
        circle(this.x,this.y+switchDist,this.size,this.size);
        if (((player.x >this.x-this.size && player.x  < this.x +this.size/2 ) || (player.x+player.w < this.x+this.size && player.x+player.w > this.x -this.size/2  )) && player.y - player.h/2 > this.y && player.y - player.h/2 < this.y + this.size) {
            if (this.winner == false) win.play();
            this.winner = true;
            switchBlack = true;
        }
    }
}