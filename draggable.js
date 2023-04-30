class Draggable {
    constructor(rectX,rectY) {
      this.rectW = windowWidth/10;
      this.rectH = windowHeight/25;
      this.rectX = rectX;
      this.rectY = rectY;

 
      this.current=0;
      this.color = [194,190,204];

    }
  
    draw() {
      strokeWeight(2.5);
      fill(this.color);
      rect(this.rectX, this.rectY, this.rectW, this.rectH);
    }
  
    mouseDragged() {
      this.rectX = mouseX-this.rectW/2;
      this.rectY = mouseY-this.rectH/2;
      }

    mouseReleased(t) {
      for (let i = 0; i<t.sequence.length;i++) {
        let x = windowWidth/2+t.w*(i-4);
        //preenche
        if(
          this.rectX >= x - this.rectW/2  && this.rectX <= x + this.rectW/2 &&
          this.rectY >= t.yFinal - this.rectH && this.rectY <= t.yFinal + this.rectH &&
          t.sequence[i]==0
        )
        {
          this.rectX = x;
          this.rectY = t.yFinal;
          this.color=t.color;
          t.sequence[i]=1; //fica ativo
          this.current=i;
          break;
      }
      //não preenche
      if(
        this.rectX >= x - this.rectW/2  && this.rectX <= x + this.rectW/2 &&
          this.rectY >= t.yFinal - this.rectH && this.rectY <= t.yFinal + this.rectH &&
          t.sequence[i]==1
        )
        {
          this.rectX = windowWidth/2;
          this.rectY = windowHeight/2.5;
          this.type=t.type;
          this.color = [194,190,204];
    }
    else{ 
   
      if (t.sequence[i] == 1 && this.current == i) {
        this.color = [194,190,204];
        t.sequence[i] = 0;
    }

  }
  }
}
}
