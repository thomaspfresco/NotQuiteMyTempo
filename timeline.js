class Timeline {

    type;
    original;
    sequence;
    color;
    w;h;
    x;y;
    yFinal = 0;
    canPlay = true;
    sounds;

    constructor(type,sequence,sounds) {
        this.type = type;
        this.sequence = sequence;
        this.original = clone(sequence);
        this.w = windowWidth/10;
        this.h = windowHeight/25;
        this.x = 0;
        this.y = 0;
        this.sounds = sounds;

        if (type == "blue") this.color = [0,0,255];
        else if (type == "red") this.color = [255,0,0];
        else if (type == "orange") this.color = [255,128,0];
    }

    draw(current) {

        stroke(this.color);
        strokeWeight(2);

        for (let i = 0; i < this.sequence.length; i++)  {
         
            if (current == i && this.sequence[i] == 1) {
                if (this.canPlay) {
                    if (this.sounds.length > 1) this.sounds[int(random(0,this.sounds.length))].play();
                    else this.sounds[0].play();
                }
                this.canPlay = false;
                fill(this.color);
                strokeWeight(2);
                
            }
            else if (current == i) {
                fill(this.color);
                strokeWeight(2);
            }
            //bloqueados
            else if (this.sequence[i] == 1) {
                fill(this.color);
                strokeWeight(2);
            }
            else {
                strokeWeight(2);
                noFill();
            }

            this.x = windowWidth/2+this.w*(i-4);
            this.yFinal = this.y+switchDist-windowHeight;

           // console.log("[TIMELINE X] "+this.x);
          //  console.log("[TIMELINE Y] "+this.y);
            rect(this.x, this.yFinal, this.w, this.h);
        }
    }

    reset() {
        this.sequence = clone(this.original);
    }
}