class DamageBlock {
    x; y; w; h;
    active;
    color;
  
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
          fill(255, 0, 0);
      }
      else {
          stroke(255, 0, 0);
          strokeWeight(2); 
          noFill();
      }
      rect(this.x, this.y+switchDist, this.w, this.h);
    }
  
    collide(p) {
      if (p.x > this.x+this.margin && p.y > this.y &&
          p.x < this.x+this.w+this.margin && p.y < this.y+this.h && this.active) {
  
        return true;
      }
      return false;
    }
  
  }
  