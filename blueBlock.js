class BlueBlock {
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
        fill(0,0,250);
    }
    else {
        stroke(0,0,250);
        strokeWeight(2); 
        noFill();
    }
    rect(this.x, this.y+switchDist, this.w, this.h);
  }
    
  collide(p) {

    //console.log("p.y",p.y );
    if (((p.x >this.x && p.x < this.x +this.w ) || (p.x+p.w < this.x+this.w && p.x+p.w > this.x )) && p.y > this.y && p.y < this.y + this.h && this.active) {
        
        return true;
      }
    else {
      return false;
    }
      
    }
}