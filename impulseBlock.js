class ImpulseBlock {
  x; y; w; h;
  active;
  color;
  alphaImpulse = 50;
  alphaCircle = 0;
  sizeCircle;
  impulsePower;

  margin; //margem de tolerância

  constructor(x,y,w,h,impulsePower) {
    this.active = false;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.impulsePower = impulsePower;

    this.sizeCircle = this.w/2;

    this.margin = 5;
  }

  draw() {
    if (this.active) {
      this.alphaCircle-=20;
      this.sizeCircle+=10;
      noFill();
      stroke(cImpulse[0],cImpulse[1],cImpulse[2],this.alphaCircle);
      strokeWeight(5);
      circle(this.x+this.w/2, this.y+switchDist+this.h/2, this.sizeCircle);
      noStroke();
      this.alphaImpulse = 255;
      fill(cImpulse[0],cImpulse[1],cImpulse[2],this.alphaImpulse);
  }
  else {
      if (this.alphaImpulse > 50) this.alphaImpulse -= 15;
      noStroke();
      fill(cImpulse[0],cImpulse[1],cImpulse[2],this.alphaImpulse);
  }
    rect(this.x, this.y+switchDist, this.w, this.h);
  }

  collide(p) {
    //console.log("p.y",p.y );
    if (((p.x >this.x && p.x < this.x +this.w ) || (p.x+p.w < this.x+this.w && p.x+p.w > this.x )) && p.y > this.y && p.y < this.y + this.h && this.active) {
        this.sizeCircle = this.w/2;
        this.alphaCircle = 255;
        player.impulse(this.impulsePower);
        if (currentLevel == 3) {
          if (tutorial == 15) {
            tutorial = 16;
            tutorialTimer = millis();
          }
        }
        return true;
      }
    else {
      return false;
    }
      
    }

}
