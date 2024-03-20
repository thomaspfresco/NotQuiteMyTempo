class DamageBlock {
    x; y; w; h;
    active;
    color;
    alphaRed = 50;
  
    margin; //margem de tolerância
  
    constructor(x,y,w,h) {
      this.active = false;
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
  
      this.margin = 5;
    }
  
    draw() {
      if (this.active) {
        noStroke();
        this.alphaRed = 255;
        fill(cRed[0],cRed[1],cRed[2],this.alphaRed);
      }
      else {
        if (this.alphaRed > 50) this.alphaRed -= 15;
        noStroke();
        fill(cRed[0],cRed[1],cRed[2],this.alphaRed);
      }
      rect(this.x, this.y+switchDist, this.w, this.h);
    }
  
    collide(p) {

      if (((p.x >this.x && p.x < this.x +this.w ) || (p.x+p.w < this.x+this.w && p.x+p.w > this.x )) && p.y > this.y && p.y < this.y + this.h && this.active) {
          return true;
        }
      //bloco no interior do player
      else if (this.x > p.x && this.x +this.w < p.x+p.w && this.y < p.y && this.y+this.h>p.y && this.active) {
        return true;
      }
      else {
        return false;
      }
        
      }
  
  }
  