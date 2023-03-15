class Collectable {
    catched;
    x;y;
    size;
        
        constructor(x,y) {
            this.catched = false;
            this.size = 20;
            this.x = x;
            this.y = y;
        }
    
        draw() {
            noStroke();
            fill(255,172,65);
            if (!this.catched) circle(this.x,this.y+switchDist,this.size,this.size);

            if ((player.x <= this.x+20 && player.x >= this.x-20) && (player.y <= this.y+20 && player.y >= this.y - 20)) this.catched = true;
        }

        reset() {
            this.catched = false;
        }
}
