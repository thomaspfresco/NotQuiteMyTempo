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
    strokes;

    constructor(type,sequence,sounds) {
        this.type = type;
        this.sequence = sequence;
        this.original = clone(sequence);
        this.w = windowWidth/10;
        this.h = windowHeight/20;
        this.x = 0;
        this.y = 0;
        this.sounds = sounds;

        this.strokes = [windowHeight/100,windowHeight/100,windowHeight/100,windowHeight/100,windowHeight/100,windowHeight/100,windowHeight/100,windowHeight/100];

        if (type == "blue") this.color = cBlue;
        else if (type == "red") this.color = cRed;
        else if (type == "orange") this.color = cImpulse;
    }

    draw(current) {

        stroke(cBackground);
        strokeWeight(this.strokes[i]);

        this.strokes[current] = windowHeight/500;

        for (let i = 0; i < this.sequence.length; i++)  {
         
            if (current == i && this.sequence[i] == 1) {
                if (this.canPlay) {
                    if (this.sounds.length > 1) this.sounds[int(random(0,this.sounds.length))].play();
                    else this.sounds[0].play();
                }
                this.canPlay = false;
                fill(this.color);
                strokeWeight(this.strokes[i]);
                
            }
            else if (current == i) {
                fill(this.color);
                strokeWeight(this.strokes[i]);
            }
            //bloqueados
            else if (this.sequence[i] == 1) {
                fill(this.color);
                strokeWeight(this.strokes[i]);
            }
            else {
                strokeWeight(this.strokes[i]);
                fill(this.color[0],this.color[1],this.color[2],50);
            }

            if (current != i) {
                if (this.strokes[i] + 1 > windowHeight/100) this.strokes[i] = windowHeight/100;
                else this.strokes[i] += 1;
            }

            this.x = windowWidth/2+this.w*(i-4);
            this.yFinal = this.y+switchDist-windowHeight;

           // console.log("[TIMELINE X] "+this.x);
          //  console.log("[TIMELINE Y] "+this.y);
          if (current != i) rect(this.x, this.yFinal, this.w, this.h);

        }
        if (this.sequence[current] == 0) fill(this.color[0],this.color[1],this.color[2],50);
        else fill(this.color[0],this.color[1],this.color[2]);
        stroke(cHighlight);
        strokeWeight(windowHeight/300);
        rect(windowWidth/2+this.w*(current-4), this.yFinal, this.w, this.h);
    }

    reset() {
        this.sequence = clone(this.original);
    }
}