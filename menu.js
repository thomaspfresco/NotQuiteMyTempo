class Menu {
    x; y;
    blockSize;
    constructor() {
        this.x = windowWidth/2-75;
        this.y =  windowHeight/2-75;
        this.blockSize = 150;
    }

    draw() {
        fill(49,49,49);
        rect(this.x,this.y,this.blockSize,this.blockSize);
        fill(217,217,217);
        textFont(bold);
        textSize(windowWidth/70);
        textAlign(RIGHT, CENTER);
        text("Level 1", windowWidth/2,windowHeight/2+50);
        if (mouseX>windowWidth/2-this.blockSize/2 && mouseX<windowWidth/2+this.blockSize/2 &&
            mouseY>windowHeight/2-this.blockSize/2 && mouseY<windowHeight/2+this.blockSize/2 && mouseIsPressed) {
            currentLevel = 0;
        }
    }
}