class Draggable {
    constructor(rectX,rectY,type) {
      this.rectW = windowWidth/12;
      this.rectH = windowHeight/35;
      this.rectX = rectX;
      this.rectY = rectY;

      this.type=type;

      if (type == "blue") this.color = [0,0,255];
      else if (type == "red") this.color = [255,0,0];
      else if (type == "orange") this.color = [255,128,0];
    }
  
    draw() {
      strokeWeight(2.5);
    
      // desenha o  draggable 
      stroke(125,0,110);
      fill(this.color);
      rect(this.rectX, this.rectY, this.rectW, this.rectH);
    }
  
    mouseDragged() {
      this.rectX = mouseX;
      this.rectY = mouseY;
      
    }


    mouseReleased(t) {
     
      for (let i = 0; i<t.sequence.length;i++) {
 
        console.log("Timeline.sequence[i] "+t.x);  
        if(
          this.rectX >= t[i].type
        )
        break;
      }
    
     /* for (let i of this.timeline) {
        let rectObj = this.timeline[i];
        //Se o draggable estiver dentro de uma celula que nao esteja preenchida
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
         if (
          this.rectX >= rectObj.x &&
          this.rectX <= rectObj.x + this.rectW &&
          this.rectY >= rectObj.y &&
          this.rectY <= rectObj.y + this.rectH &&
          rectObj.filled
        ) {
          this.rectX = rectObj.x + this.rectW / 2;
          this.rectY = rectObj.y+50 + this.rectH / 2;
          rectObj.filled = true;
          break;
        }
         else {
          rectObj.filled = false;
          if (i === 4 || i === 6){rectObj.filled = true;}
        }
          
          
       
      }*/
    }
  }