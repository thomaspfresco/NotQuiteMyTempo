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
        if (((player.x+player.w/2 <= this.x+this.size+this.size/2 && player.x+player.w/2 >= this.x-this.size/2)) && (player.y <= this.y+this.size && player.y >= this.y)) {
            if (this.winner == false) win.play();
            this.winner = true;
            switchBlack = true;
        }
    }
}