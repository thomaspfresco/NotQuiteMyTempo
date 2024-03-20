class BlueBlock {
  x; y; w; h;
  active;
  color;
  alphaBlue = 50;

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
        this.alphaBlue = 255;
        fill(cBlue[0],cBlue[1],cBlue[2],this.alphaBlue);
    }
    else {
        if (this.alphaBlue > 50) this.alphaBlue -= 15;
        noStroke();
        fill(cBlue[0],cBlue[1],cBlue[2],this.alphaBlue);
        //strokeWeight(2); 
        //noFill();
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