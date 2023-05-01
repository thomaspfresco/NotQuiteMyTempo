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
        if ((player.x <= this.x+20 && player.x >= this.x-20) && (player.y <= this.y+20 && player.y >= this.y - 20)) {
            if (this.winner == false) win.play();
            this.winner = true;
            switchBlack = true;
        }
    }
}