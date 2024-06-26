class Menu {
    sizeMax;
    sizeMin;
    inc;
    selected;
    upDown; //-1, 0 ou 1 (baixo, parado ou cima)

    auxLevels;

    osc = windowHeight/150;
    counter = 0;

    velocity;

    constructor() {
        this.sizeMax = windowHeight/1.5;
        this.sizeMin = windowHeight/2;
        this.inc = this.sizeMax*1.5;

        this.selected = 0;
        this.upDown = 0;

        this.velocity = 75;
       
        //definir posição dos niveis no menu
        for (let l of levels) {
            l.menuX = windowWidth/2 + this.inc*l.id;
            l.sizeMenu = this.sizeMin;
        }
    }

    draw() {
        //console.log(this.selected);
        //update nivel em destaque
        if (currentLevel == -1 || currentLevel == -2) {

            this.counter+=0.04;

            //nivel novo desbloqueado
            if (currentLevel == -2) {
                levels[this.selected+1].unlocked = true;
                this.upPosition();
                currentLevel = -1;
            }

            for (let l of levels) {
                noStroke();
                
                if (l.completed) fill(cPlayer);
                else if (l.unlocked) fill(49,49,49,255);
                else fill(49,49,49,100);
                noStroke();

                if (l.id == this.selected) rect(l.menuX-l.sizeMenu/2, windowHeight/2-l.sizeMenu/2+sin(this.counter)*this.osc,l.sizeMenu,l.sizeMenu);
                else rect(l.menuX-l.sizeMenu/2, windowHeight/2-l.sizeMenu/2,l.sizeMenu,l.sizeMenu);
                
                fill(230,230,230);
                noStroke();
                textFont(cufel);
                textSize(l.sizeMenu);
                textAlign(CENTER,CENTER);

                //if (l.id+1 < 10) aux = '0'+(l.id+1);
                //else aux = l.id+1;
                let aux = l.id+1;
                if (l.id == this.selected) text(aux, l.menuX,windowHeight/2.55 +sin(this.counter)*this.osc);
                else text(aux, l.menuX,windowHeight/2.5);
                
                if (l.unlocked) fill(49,49,49,255);
                else fill(49,49,49,100);
                noStroke();
                textFont(cufel);
                textSize(l.sizeMenu/12);
                textAlign(CENTER,CENTER);
                //text(l.id+1+". "+l.songName, l.menuX+l.sizeMenu/25,windowHeight/2 + l.sizeMenu/1.8+sin(this.counter)*this.osc);
                if (l.id == this.selected) text(l.songName, l.menuX,windowHeight/2 + l.sizeMenu/1.8+sin(this.counter)*this.osc);
                else text(l.songName, l.menuX,windowHeight/2 + l.sizeMenu/1.8);

                
                //assinalar nivel concluido
                /*if (l.completed) {
                    fill(0,150,0,255);
                    circle(l.menuX, windowHeight/2+sin(this.counter)*this.osc,l.sizeMenu/4);
                }*/
            }

            //escolher nivel
            if (mouseX>windowWidth/2-levels[this.selected].sizeMenu/2 && mouseX<windowWidth/2+levels[this.selected].sizeMenu/2 &&
            mouseY>windowHeight/2-levels[this.selected].sizeMenu/2 && mouseY<windowHeight/2+levels[this.selected].sizeMenu/2 && mouseIsPressed) {
                mouseIsPressed = false;
                currentLevel = this.selected;
                levels[currentLevel].reset();
                c = [0,0,0];
                switchBlack = true;
                select.play();
                if (currentLevel == 1) {
                    if (tutorial == 2) {
                      tutorial = 3;
                      tutorialTimer = millis();
                    }
                  }
                  if (currentLevel == 2) {
                    if (tutorial == 6) {
                      tutorial = 7;
                      tutorialTimer = millis();
                    }
                  }
                    if (currentLevel == 3) {
                      if (tutorial == 14) {
                        tutorial = 15;
                        tutorialTimer = millis();
                      }
                  }
                  if (currentLevel == 4) {
                    if (tutorial == 16) {
                      tutorial = 17;
                      tutorialTimer = millis();
                    }
                }
            }

            //movimentar com o rato
            if (mouseX>windowWidth/2+levels[this.selected].sizeMenu/2 && mouseIsPressed) this.upPosition();
            if (mouseX<windowWidth/2-levels[this.selected].sizeMenu/2 && mouseIsPressed) this.downPosition();

            this.updatePositions();
        }
    }

    upPosition() {
        if (this.selected < levels.length-1 && this.upDown == 0) {
           if (levels[this.selected+1].unlocked) {
            this.selected+=1;
            levels[this.selected].win.winner = false;
            this.upDown = 1;
            this.auxLevels = clone(levels);
            if (currentLevel != -2) move.play();
           }
        }
    }

    downPosition() {
        if (this.selected > 0 && this.upDown == 0) {
            this.selected-=1;
            levels[this.selected].win.winner = false;
            this.upDown = -1;
            this.auxLevels = clone(levels);
            if (currentLevel != -2) move.play();
        }
    }

    updatePositions() {

        //esquerda
        if (this.upDown == -1) {
            for (let i = 0; i < levels.length; i++) {
                if (levels[i].menuX+this.velocity*player.ratioHeight<this.auxLevels[i].menuX+this.inc) levels[i].menuX+=this.velocity*player.ratioHeight;            
                else {
                    levels[i].menuX+=this.auxLevels[i].menuX+this.inc-levels[i].menuX;
                    this.upDown = 0;
                }
            }
        }

        //direita
        else if (this.upDown == 1) {
            for (let i = 0; i < levels.length; i++) {
                if (levels[i].menuX-this.velocity*player.ratioHeight>this.auxLevels[i].menuX-this.inc) levels[i].menuX-=this.velocity*player.ratioHeight;            
                else {
                    levels[i].menuX-=levels[i].menuX-this.auxLevels[i].menuX+this.inc;
                    this.upDown = 0;
                }
            }
        }

        for (let i = 0; i < levels.length; i++) {
        if (i == this.selected && levels[i].sizeMenu<this.sizeMax) levels[i].sizeMenu+=20*player.ratioHeight/2; 
        else if (i != this.selected && levels[i].sizeMenu>this.sizeMin) levels[i].sizeMenu-=20*player.ratioHeight/2; 
        }

    }
}