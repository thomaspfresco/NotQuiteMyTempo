class Platform {
  x; y; w; h;

  margin; //margem de tolerância

  constructor(x,y,w,h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    
    this.margin = 5;
  }
  
  draw() {
    noStroke();
    fill(49,49,49);
    rect(this.x, this.y+switchDist, this.w, this.h);
  }
    
  collide(p) {
      if (p.x > this.x+this.margin && p.y > this.y &&
        p.x < this.x+this.w+this.margin && p.y < this.y+this.h) {
          return true;
        }
        return false;
    }
  }
  