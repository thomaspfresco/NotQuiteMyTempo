class Timeline {

    type;
    sequence;
    color;
    w;h;

    constructor(type,sequence) {
        this.type = type;
        this.sequence = sequence;
        this.w = windowWidth/12;
        this.h = windowHeight/35;

        if (type == "blue") this.color = [0,0,255];
        else if (type == "red") this.color = [255,0,0];
    }

    draw(current) {
        stroke(this.color);
        strokeWeight(2);

        for (let i = 0; i < this.sequence.length; i++)  {
            if (current-1 == i) {
                fill(this.color);
            }
            else if (this.sequence[i] == 1) {
                fill(this.color);
            }
            else {
                noFill();
            }

            if (i < 5) rect(windowWidth/2-this.w*abs(i-4),windowHeight/2+switchDist,this.w,this.h);
            else rect(windowWidth/2+this.w*(i-4),windowHeight/2+switchDist,this.w,this.h);
        }
        /*for (let i = 0; i < this.sequence.length; i++) {
            rect();
            if (i == current);
        }*/
    }
}