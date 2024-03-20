class Draggable {
  check = false;
  dragging = false;
  type;
  current;
  inside;
  playPick = true;
  locked;
  lockerOffset = 1;

  constructor(rectX, rectY, current, color, type, inside, locked) {
    this.rectW = windowWidth / 10;
    this.rectH = windowHeight / 20;
    this.rectX = rectX;
    this.rectY = rectY;
    this.inside = inside;
    this.locked = locked;

    if (!inside) {
      // centro do ecra em baixo da timeline
      this.rectX = windowWidth / 2 - this.rectW / 2;
      this.rectY = windowHeight / 2 + 3 * this.rectH;
    } else {
      this.rectX = rectX;
      this.rectY = rectY;
    }

    this.type = type;
    this.current = current;
    this.color = color;
  }

  countD(draggables) {
    let count = 0;
    for (let draggable of draggables) {
      if (!draggable.inside) {
        count++;
      }
    }
    return count;
  }

  draw(draggables) {

    if (this.lockerOffset+0.01*player.ratioHeight > 1) this.lockerOffset = 1;
    else this.lockerOffset += 0.01*player.ratioHeight;

    strokeWeight(2.5);
    fill(this.color);
    noStroke();
    if (this.inside == false || this.dragging) rect(this.rectX,this.rectY + switchDist - windowHeight,this.rectW,this.rectH);

    if (mouseX > this.rectX &&
      mouseX < this.rectX + this.rectW &&
      mouseY > this.rectY &&
      mouseY < this.rectY + this.rectH &&
      mouseIsPressed && this.locked) {
      if (this.playPick) {
        this.playPick = false;
        pick.play();
        this.lockerOffset = 0.7;
      }
    }
    else if (
      mouseX > this.rectX &&
      mouseX < this.rectX + this.rectW &&
      mouseY > this.rectY &&
      mouseY < this.rectY + this.rectH &&
      mouseIsPressed && 
      this.locked == false &&
      this.checkDrag(draggables) == false
    ) {
      for (let d of draggables) d.check = false;
      this.check = true;
    }
  
    if (this.locked) {
      imageMode(CENTER);
      image(locker,this.rectX+this.rectW/2,this.rectY-windowHeight+switchDist+this.rectH/2,locker.width/(60*this.lockerOffset)*player.ratioHeight,locker.height/(60*this.lockerOffset)*player.ratioHeight);
    }
  }

  mouseDragged() {
    if (this.check) {
      this.dragging = true;
      this.rectX = mouseX - this.rectW / 2;
      this.rectY = mouseY - this.rectH / 2;
    }
  }

  mouseReleased(draggables, timelines) {
    //drop.play();
    this.playPick = true;
  
    if (this.dragging) {
      let r = this.detT(timelines);
      let count = this.countD(draggables);
  
      // timeline para timeline
      if (
        r[0].type.localeCompare("none") != 0 &&
        this.type.localeCompare("none") != 0 &&
        r[0].sequence[r[2]] == 0
      ) {
        
        this.rectX = r[1];
        this.rectY = r[0].y;
        this.color = r[0].color;
  
        this.findTimeline(timelines, this.type).sequence[this.current] = 0;
  
        this.type = r[0].type;
        r[0].sequence[r[2]] = 1;
        this.current = r[2];
        this.inside = true;
        if (tutorial == 9) {
          tutorial = 10;
          tutorialTimer =millis();
        }
        if (tutorial == 10 && millis()-tutorialTimer>=2000) {
          tutorial = 11;
          tutorialTimer =millis();
        }
        drop.play();
      }
  
      // fora da timeline
      else if (
        r[0].type.localeCompare("none") != 0 &&
        this.type.localeCompare("none") == 0 &&
        r[0].sequence[r[2]] == 0
      ) {
        this.rectX = r[1];
        this.rectY = r[0].y;
        this.color = r[0].color;

        //this.findTimeline(timelines, this.type).sequence[this.current] = 0;
  
        this.type = r[0].type;
        r[0].sequence[r[2]] = 1;
        this.current = r[2];
        this.inside = true;
        if (tutorial == 9) {
          tutorial = 10;
          tutorialTimer =millis();
        }
        if (tutorial == 10 && millis()-tutorialTimer>=2000) {
          tutorial = 11;
          tutorialTimer =millis();
        }
        drop.play();
      }
  
      // celula jÃ¡ preenchida
      else if (
        r[0].type.localeCompare("none") != 0 &&
        r[0].sequence[r[2]] == 1
      ) {
        this.rectX = this.bX; //pos inicial
        this.rectY = this.bY;
        if (this.findTimeline(timelines, this.type).sequence[this.current] == 1) this.inside = true;
        else this.inside = false;
        if (this.playPick) {
          this.playPick = false;
          pick.play();
          this.lockerOffset = 0.7
        }
      }
  
      // fora para fora
      else if (r[0].type == "none") {
        let timeline = this.findTimeline(timelines, this.type);
        if (
          timeline &&
          this.current >= 0 &&
          this.current < timeline.sequence.length
        ) {
          timeline.sequence[this.current] = 0;
        }
  
        let outsideDraggables = draggables.filter(
          (draggable) => !draggable.inside
        );
        let count = this.countD(outsideDraggables);
        let spacing = 30;
        const totalWidth = count * (this.rectW + spacing);
        let startX = windowWidth / 2 - totalWidth / 2 + spacing / 2;
  
        outsideDraggables.forEach((draggable, index) => {
          draggable.rectX = startX + index * (this.rectW + spacing);
          draggable.rectY = windowHeight / 2 + 3 * this.rectH;
        });
  
        this.inside = false;
        this.type = "none";
        this.color = cHighlight;
      }
  
      let outsideDraggables = draggables.filter(
        (draggable) => !draggable.inside
      );
  
      count = this.countD(outsideDraggables);
  
      let spacing = 30;
      const totalWidth = count * (this.rectW + spacing);
      let startX = windowWidth / 2 - totalWidth / 2 + spacing / 2;
  
      outsideDraggables.forEach((draggable, index) => {
        draggable.rectX = startX + index * (this.rectW + spacing);
        draggable.rectY = windowHeight / 2 + 3 * this.rectH;
      });
    }
    
    this.check = false;
    this.dragging = false;
    this.bX = this.rectX;
    this.bY = this.rectY;
  }
  

  findTimeline(timelines, type) {
    for (let t of timelines) {
      if (type.localeCompare(t.type) == 0) return t;
    }
    return null;
  }

  detT(timelines) {
    for (let t of timelines) {
      for (let i = 0; i < t.sequence.length; i++) {
        let x = windowWidth / 2 + t.w * (i - 4);
        if (
          this.rectX >= x - this.rectW / 2 &&
          this.rectX <= x + this.rectW / 2 &&
          this.rectY >= t.yFinal - this.rectH &&
          this.rectY <= t.yFinal + this.rectH
        )
          return [t, x, i];
      }
    }
    return [new Timeline("none", [0, 0, 0, 0, 0, 0, 0, 0], []), 0, 0];
  }

  pop(activeSlot) {
    if (activeSlot == this.current) this.lockerOffset = 0.7;
  }

  checkDrag(draggables) {
    for(let d of draggables) if (d.check) return true;
    return false;
  }
}