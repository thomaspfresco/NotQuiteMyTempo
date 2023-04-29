class Timeline {

    type;
    sequence;
    color;
    w;h;
    pos;
    x;y;


    constructor(type,sequence,pos) {
        this.type = type;
        this.sequence = sequence;
        this.w = windowWidth/12;
        this.h = windowHeight/35;
        this.pos = pos;
        this.x = 0;
        this.y = 0;

        if (type == "blue") this.color = [0,0,255];
        else if (type == "red") this.color = [255,0,0];
        else if (type == "orange") this.color = [255,128,0];
    }

    draw(current,pos) {

        stroke(this.color);
        strokeWeight(2);

        for (let i = 0; i < this.sequence.length; i++)  {
         
            if (current == i && this.sequence[i] == 1) {
                note1.setVolume(0.05);
                if(!note1.isPlaying())note1.play();
                fill(this.color);
            }
            else if (current == i) {
                fill(this.color);
            }
            //bloqueados
            else if (this.sequence[i] == 1) {
                fill(this.color);
            }
            else {
                noFill();
            }

            this.x = windowWidth/2+this.w*(i-4);
            this.y = windowHeight/2;
          //  console.log("[TIMELINE X] "+this.x);
          //  console.log("[TIMELINE Y] "+this.y);
            rect(this.x, this.y-pos, this.w, this.h);
        }
        
    }
}