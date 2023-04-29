class splashScreen {

    constructor(message) {

      this.message = message;
      this.words = [];
      this.highlight = 0;
      this.offsetX = 0;
      this.offsetY = 0;
      this.drag = true;
      this.draggable = new Draggable(10,10,300,40,"t","green");
      this.update();
      this.mousePressed();
      this.mouseReleased();
      this.player = new Player(20,40);
      this.platform = new Platform(windowWidth/3.2,windowHeight/1.3,windowWidth/3,8);
      this.player.x = windowWidth/3.1;
      this.player.y = windowHeight/1.3;
      this.collectable = new Collectable(windowWidth/1.6,windowHeight/1.35);
    }
    
    draw() {
      textFont(main);
      textSize(52);
      stroke(49,49,49);
      strokeWeight(1.5);
      //preencher letras titulo
      for (let i = 0; i < this.words.length-1; i++) {
        let word = this.words[i];

        //"TEMPO" vazio -> otimizar isto
        if(i == 3){
          noFill();
        }
        else if (i === this.highlight) {
          fill(49,49,49);
        }
        else{
        strokeWeight(1.5);
        noFill();
        }
        //posicao da proxima palavra
        text(word + " ", windowWidth/3 + posx, windowHeight/2);
        posx += textWidth(word + " ");
      }
      //avanco do preenchimento
      if (frameCount % 60 === 0) { 
        this.highlight = (this.highlight + 1) % this.words.length;
      }
      if (this.platform.collide(this.player)) {
        this.player.jumping = false;
        this.player.y = this.platform.y;
      }
  
      this.platform.draw();
      this.player.draw();
      this.collectable.draw();

      if (this.collectable.catched == true){
        this.draggable.display();
      }
    }

    update() {
      this.draggable.update();
      this.words = this.message.split(" ");
      this.highlight = 0;
    }

    mousePressed() {
      this.draggable.mousePressed();
    }
    
    mouseReleased() {
      this.draggable.mouseReleased();
    }
  }
  