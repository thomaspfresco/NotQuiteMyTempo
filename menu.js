class Menu {
    sizeMax;
    sizeMin;
    inc;
    selected;
    upDown; //-1, 0 ou 1 (baixo, parado ou cima)

    auxLevels;

    constructor() {
        this.sizeMax = windowHeight/1.5;
        this.sizeMin = windowHeight/2;
        this.inc = this.sizeMax*1.5;

        this.selected = 0;
        this.upDown = 0;
       
        //definir posição dos niveis no menu
        for (let l of levels) {
            l.menuX = windowWidth/2 + this.inc*l.id;
            l.sizeMenu = this.sizeMin;
        }
    }

    draw() {
        fill(49,49,49);

        //update nivel em destaque
        if (currentLevel == -1) {
            for (let l of levels) {
                //início do jogo
               // if (l.id == 0 && l.completed == false) {
                    //this.selected = l.id;
                //console.log(l.menuX,l.sizeMenu)
                rect(l.menuX-l.sizeMenu/2, windowHeight/2-l.sizeMenu/2,l.sizeMenu,l.sizeMenu);
            }
        }
       
        fill(217,217,217);
        
        textSize(windowWidth/70);
        textAlign(RIGHT, CENTER);
        text("Level ", windowWidth/2,windowHeight/2+50);
        
        if (mouseX>windowWidth/2-this.size/2 && mouseX<windowWidth/2+this.size/2 &&
            mouseY>windowHeight/2-this.size/2 && mouseY<windowHeight/2+this.size/2 && mouseIsPressed) {
            currentLevel = 0;
        }
        this.updatePositions();
    }

    upPosition() {
        if (this.selected < levels.length-1) {
            this.selected+=1;
            this.upDown = 1;
            this.auxLevels = levels;
        }
    }

    downPosition() {
        if (this.selected > 0) {
            this.selected-=1;
            this.upDown = -1;
            this.auxLevels = levels;
        }
    }

    updatePositions() {

        //esquerda
        if (this.upDown == -1) {
            for (let i = 0; i < levels.length; i++) {

                if (levels[i].menuX>this.auxLevels[i].menuX+this.inc) levels[i].menuX+=10;
                else {
                    console.log("ai");
                    this.upDown  = 0;
                    break;
                }
            }
        }
        //direita
        else if (this.upDown == 1) {
            for (let i = 0; i < levels.length; i++) {
                console.log(levels[i].menuX,this.auxLevels[i].menuX);
                if (levels[i].menuX>this.auxLevels[i].menuX-this.inc) levels[i].menuX-=10;
                else {
                    this.upDown = 0;
                    break;
                }
            }
        }

    }
}