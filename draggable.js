class Draggable {
    constructor(rectX,rectY,type) {
      this.rectW = windowWidth/10;
      this.rectH = windowHeight/25;
      this.rectX = rectX;
      this.rectY = rectY;

      this.type=type;


      if (type == "blue") this.color = [0,0,255];
      else if (type == "neutro") this.color = [194,190,204];
      else if (type == "red") this.color = [255,0,0];
      else if (type == "orange") this.color = [255,128,0];
    }
  
    draw() {
      strokeWeight(2.5);
      fill(this.color);
      rect(this.rectX, this.rectY, this.rectW, this.rectH);
      console.log(this.type);
    }
  
    mouseDragged() {
      this.rectX = mouseX-this.rectW/2;
      this.rectY = mouseY-this.rectH/2;
      }

    mouseReleased(t) {
      for (let i = 0; i<t.sequence.length;i++) {
        let x = windowWidth/2+t.w*(i-4);
        if(
          this.rectX >= x - this.rectW/2  && this.rectX <= x + this.rectW/2 &&
          this.rectY >= t.yFinal - this.rectH && this.rectY <= t.yFinal + this.rectH &&
          t.sequence[i]==0
        )
        {
          this.rectX = x;
          this.rectY = t.yFinal;
          this.type=t.type;
          t.sequence[i]=1; //fica ativo
          break;
      }
      if(
        this.rectX >= x - this.rectW/2  && this.rectX <= x + this.rectW/2 &&
          this.rectY >= t.yFinal - this.rectH && this.rectY <= t.yFinal + this.rectH &&
          t.sequence[i]==1
        )
        {
          this.rectX = windowWidth/2;
          this.rectY = windowHeight/3;
          console.log("preenchido");
          break;
        }
     
      }
    }
  }