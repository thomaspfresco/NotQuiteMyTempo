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
    fill(cHighlight);
    rect(this.x, this.y+switchDist, this.w, this.h);
  }
    
  collide(p) {

    //console.log("p.y",p.y );
    if (((p.x >this.x && p.x < this.x +this.w ) || (p.x+p.w < this.x+this.w && p.x+p.w > this.x )) && (p.y > this.y && p.y < this.y + this.h)) {
        
        return true;
      }
    else {
      return false;
    }
      
    }
  }
  