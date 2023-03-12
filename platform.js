class Platform {
  x; y; w; h;

  constructor (x,y,w,h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  
  draw() {
    noStroke();
    fill(49,49,49);
    rect(this.x, this.y, this.w, this.h);
  }
    
  collide(p) {
      if (player.x > this.x && p.y > this.y &&
        p.x < this.x+this.w && p.y < this.y+this.h) {
          return true;
        }
        return false;
    }
  }
  