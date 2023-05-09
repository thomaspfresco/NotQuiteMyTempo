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

            if (((player.x >this.x-this.size && player.x  < this.x +this.size/2 ) || (player.x+player.w < this.x+this.size && player.x+player.w > this.x -this.size/2  )) && player.y - player.h/2 > this.y && player.y - player.h/2 < this.y + this.size) {
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
