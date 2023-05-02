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

            if (((player.x+player.w/2 <= this.x+this.size+this.size/2 && player.x+player.w/2 >= this.x-this.size)) && (player.y <= this.y+this.size && player.y >= this.y)) {
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
