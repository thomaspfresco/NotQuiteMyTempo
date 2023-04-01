class Block {
    constructor(x,y,w,h) {
      this.rectW = w;
      this.rectH = h;
      this.rectX = x;
      this.rectY = y;
      this.gridWidth = 500;
      this.gridHeight = 100;
      this.gridX = 50;
      this.gridY = 200;
      this.timeline = [];
  
      // cria a timeline
      for (let i = 0; i < 8; i++) {
        let x = (windowWidth - this.gridWidth) / 2 + i * this.rectW;
        let y = (windowHeight - this.gridHeight) / 2;
        this.timeline.push({ x: x, y: y, filled: false });
      }
      this.timeline[2].filled = true; 
      this.timeline[6].filled = true; 
    }
  
    draw() {
      strokeWeight(1.5);
      stroke(0, 255, 0);
      noFill();

      // draw the draggable rectangle
      stroke(0, 255, 0);
      fill(0, 255, 0);
      rect(this.rectX, this.rectY, this.rectW, this.rectH);
  
    //  drawCursor();
    }
  
    mouseDragged() {
      this.rectX = mouseX;
      this.rectY = mouseY;
    }
  
    mouseReleased() {
      for (let i = 0; i < this.timeline.length; i++) {
        let rectObj = this.timeline[i];
        if (
          this.rectX >= rectObj.x &&
          this.rectX <= rectObj.x + this.rectW &&
          this.rectY >= rectObj.y &&
          this.rectY <= rectObj.y + this.rectH &&
          !rectObj.filled
        ) {
          this.rectX = rectObj.x + this.rectW / 2;
          this.rectY = rectObj.y + this.rectH / 2;
          rectObj.filled = true;
          break;
        }
      }
    }
  }