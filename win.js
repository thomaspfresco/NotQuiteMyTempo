class Win {
    winner;
    x;y;
    size;
    
    constructor(x,y) {
        this.winner = false;
        this.size = 40;
        this.x = x;
        this.y = y;
    }

    draw() {
        noStroke();
        fill(0,150,0);
        circle(this.x,this.y+switchDist,this.size,this.size);
        if ((player.x <= this.x+20 && player.x >= this.x-20) && (player.y <= this.y+20 && player.y >= this.y - 20)) this.winner = true;
    }
}