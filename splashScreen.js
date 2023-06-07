class splashScreen {
  constructor(message) {

    this.message = message;
    this.words = [];
    this.highlight = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.update();

  }

  draw() {
    textFont(cufel);
    textSize(70);
  
    let totalWidth = 0;
    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      totalWidth += textWidth(word + " ");
    }
  
    let startX = (windowWidth - totalWidth) / 2;
    let startY = windowHeight / 2;
  
    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      noStroke();
      //stroke(49, 49, 49);
      //strokeWeight(1.5);
      if (i === this.highlight) {
        fill(49, 49, 49); // highlighted
      } else {
        noFill();
      }
  
      // Posição da próxima palavra
      text(word + " ", startX, startY);
      startX += textWidth(word + " ");
    }
  
    if (frameCount % 60 == 0) {
      this.highlight = (this.highlight + 1) % this.words.length;
    }
    noStroke();
  }
  

  update() {
    this.words = this.message.split(" ");
    this.highlight = 0;}

}
