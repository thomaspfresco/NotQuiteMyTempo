class splashScreen {
  alphaText =[0,0,0,0];
  end = false;
  sonsBlue = [note1,note2,note3,note4];
  sonsPlayer = player.jumpSounds;
  colors = [cBlue, cRed, cImpulse, cPlayer, cCollect];
  sounds = [this.sonsBlue[int(random(0,this.sonsBlue.length))],snare,impulse,this.sonsPlayer[int(random(0,this.sonsPlayer.length))],collect];
  cText = [c2];
  id = 0;
  color = this.colors[this.id];
  playSound = true;

  constructor(message) {
    this.complete = false;
    this.message = message;
    this.words = this.message.split(" ");
    this.highlight = 0;
   // this.fillWords();
    this.pressed = false;
    //this.alphaText= new Array(this.words.length).fill(50);
    
    //this.alphaText = new Array(this.words.length).fill(255);
    this.startY = windowHeight / 2;
    
   // this.isActive = false;
  }

  draw() {

    textFont(light);
    textSize(windowHeight / 50);
    noStroke();
    fill(c2);
    text("Press enter to continue", windowWidth/2-textWidth("Press enter to continue")/2, windowHeight-windowHeight/20);


    textFont(cufel);
    textSize(windowHeight / 10);
    noStroke();
  
    let totalWidth = 0;
    let startX = (windowWidth - totalWidth) / 2;
   
    //tam total
    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      totalWidth += textWidth(word + " ");
    }
  
    startX = (windowWidth - totalWidth) / 2;
  
    if (!this.pressed) {
      let startY = windowHeight / 2;
    
      for (let i = 0; i < this.words.length; i++) {
        let word = this.words[i];
        
        //se a palavra estiver destacada
        fill(c2[0],c2[1],c2[2],this.alphaText[i]);
        if (i == this.highlight) {
          //print(this.highlight);
          
          if (this.highlight == 0) {
            this.playSound = true;
            this.id = int(random(0,this.colors.length));
            this.color = this.colors[this.id];
          }

          if (this.highlight == 3) {
            fill(this.color[0],this.color[1],this.color[2],this.alphaText[i]);
            if (this.playSound) {
              this.sounds[this.id].play();
              this.playSound = false;
            }
            this.sounds = [this.sonsBlue[int(random(0,this.sonsBlue.length))],snare,impulse,this.sonsPlayer[int(random(0,this.sonsPlayer.length))],collect];
          }
          this.alphaText[i] = 255;
        
          /*if (this.highlight == this.words.length - 1) {
            //se for a ultima palavra
            fill(this.color[0], this.color[1], this.color[2], this.alphaText[i]);
            this.lastColor = [this.cText[0], this.cText[1], this.cText[2]];
          } else {
            if(this.highlight == this.words.length - 1){
              fill(this.lastColor[0], this.lastColor[1], this.lastColor[2], this.alphaText[i]);
            }else{
            fill(this.cText[0], this.cText[1], this.cText[2], this.alphaText[i]);
          }
          }*/
    
        } else {
          if (this.alphaText[i] - 15 < 50) this.alphaText[i] = 50;
          else this.alphaText[i] -= 15;
          
        }
        
        text(word + " ", startX, startY);
        startX += textWidth(word + " ");
      }

     //update da proxima palavra e reposicao de variaveis no final de cada loop
      if (frameCount % 60 == 0) {
        click.play();
        this.highlight = (this.highlight + 1) % this.words.length;      
      }
    }
    
    
  /*if(this.pressed ){
    let totalWidth = 0;
    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      totalWidth += textWidth(word + " ");
    }
    
    let startY = windowHeight / 2;
    
    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      noStroke();
    
      if (i <= this.highlight) {
        fill(this.cText[0], this.cText[1], this.cText[2]); // highlighted
        if(i == this.words.length-1)
        { fill(this.color)}
      } 
 
      else {
        fill(this.cText[0], this.cText[1], this.cText[2],50);
      }
    
      text(word + " ", startX, startY);
      startX += textWidth(word + " ");
    }
    
    if (frameCount % 60 == 0 && this.highlight < this.words.length - 1) {
      this.highlight++;
    }
    
    this.end = true;
  }*/
    noStroke();
  }
  

  update() {
    this.words = this.message.split(" ");
    this.highlight = 0;
    //this.alphaText = new Array(this.words.length).fill(255);
  }
  keyPressed() {
    console.log("s");
    
    this.pressed = true;
    this.alphaText = new Array(this.words.length).fill(255);
    this.color = this.colors[this.id];
    this.highlight = 0;
  }
  
}
