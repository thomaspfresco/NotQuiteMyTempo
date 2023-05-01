class Collectable {
    catched;
    x;y;
    size;
    createBlock;
        
        constructor(x,y) {
            this.createBlock = false;
            this.catched = false;
            this.size = windowWidth/40;;
            this.x = x;
            this.y = y;
        }
    
        draw() {
            noStroke();
            fill(255,172,65);
            if (!this.catched) circle(this.x,this.y+switchDist,this.size,this.size);

            if ((player.x <= this.x+20 && player.x >= this.x-20) && (player.y <= this.y+20 && player.y >= this.y - 20)) {
                if (this.catched == false) {
                    this.catched = true;
                    collect.pan(map(this.x, 0+frameSize, windowWidth-frameSize, -1.0, 1.0));
                    if (!collect.isPlaying()) collect.play();
                }
            }
        }

        reset() {
            this.catched = false;
            this.createBlock = false;
        }
}
