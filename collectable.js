class Collectable {
    catched;
    x;y;
    size;
    createBlock;
    counter = 0;
    alphaCollected = 255;
    alpha2 = 255;
    sizeCollected;
        
        constructor(x,y) {
            this.createBlock = false;
            this.catched = false;
            this.size = windowWidth/40;
            this.sizeCollected = this.size;
            this.x = x;
            this.y = y;
        }
    
        draw() {
            noStroke();
            fill(cCollect[0],cCollect[1],cCollect[2],this.alpha2);

            this.counter+=0.04;

            if (!this.catched) {
                noStroke();
                fill(cCollect[0],cCollect[1],cCollect[2],this.alpha2);
                
                circle(this.x,(sin(this.counter)*windowHeight/100+this.y)+switchDist,this.size,this.size);

                if (this.alpha2 < 255) this.alpha2 += 15;
                
                stroke(cCollect[0],cCollect[1],cCollect[2],this.alphaCollected);
                strokeWeight(5);
                noFill();
                
                circle(this.x,sin(this.counter)*windowHeight/100+this.y+switchDist,this.sizeCollected,this.sizeCollected);

                this.alphaCollected+=30;
                if (this.sizeCollected > 0)this.sizeCollected-=10;
            }
            else{
                noFill();
                stroke(cCollect[0],cCollect[1],cCollect[2],this.alphaCollected);
                strokeWeight(5);
                circle(this.x,sin(this.counter)*windowHeight/100+this.y+switchDist,this.sizeCollected,this.sizeCollected);
                this.alphaCollected-=20;
                this.sizeCollected+=10;
                if (this.alphaCollected < 0) this.alpha2 = 0;
            }

            if (((player.x >this.x-this.size && player.x  < this.x +this.size/2 ) || (player.x+player.w < this.x+this.size && player.x+player.w > this.x -this.size/2  )) && player.y - player.h/2 > this.y && player.y - player.h/2 < this.y + this.size) {
                if (this.catched == false) {
                    this.catched = true;
                    this.alphaCollected = 255;
                    this.sizeCollected = this.size;
                    collect.pan(map(this.x, 0+frameSize, windowWidth-frameSize, -1.0, 1.0));
                    collect.play();
                    if (tutorial == 7) {
                        tutorial = 8;
                        tutorialTimer = millis();
                      }
                }
            }
        }

        reset() {
            this.catched = false;
            this.createBlock = false;
            this.alphaCollected = 0;
            this.sizeCollected = this.size*3;
        }
}
