class Draggable {
  check = false;
  dragging = false;
  type;
  current;
  inside;

  constructor(rectX, rectY, current, color, type, inside) {
    this.rectW = windowWidth / 10;
    this.rectH = windowHeight / 25;
    this.rectX = rectX;
    this.rectY = rectY;
    this.inside = inside;
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
    strokeWeight(2.5);
    fill(this.color);
    noStroke();
    rect(
      this.rectX,
      this.rectY + switchDist - windowHeight,
      this.rectW,
      this.rectH
    );

    if (
      mouseX > this.rectX &&
      mouseX < this.rectX + this.rectW &&
      mouseY > this.rectY &&
      mouseY < this.rectY + this.rectH &&
      mouseIsPressed
    ) {
      for (let d of draggables) d.check = false;
      this.check = true;
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
    if (this.dragging) {
      let r = this.detT(timelines);
      let count = this.countD(draggables);
      console.log(count);
      //timeline para timeline
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
      }

      //fora para timeline
      else if (
        r[0].type.localeCompare("none") != 0 &&
        this.type.localeCompare("none") == 0 &&
        r[0].sequence[r[2]] == 0
      ) {
        this.rectX = r[1];
        this.rectY = r[0].y;
        this.color = r[0].color;

        this.type = r[0].type;
        r[0].sequence[r[2]] = 1;
        this.current = r[2];
        this.inside = true;
      }

      //bloqueio
      else if (
        r[0].type.localeCompare("none") != 0 &&
        r[0].sequence[r[2]] == 1
      ) {
        this.rectX = this.bX;
        this.rectY = this.bY;
        this.inside = true;
      } else if (r[0].type == "none") {
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

        this.rectX = startX + count * (this.rectW + spacing);
        this.rectY = windowHeight / 2 + 3 * this.rectH;
        this.inside = false;
        this.type = "none";
        this.color = [49, 49, 49];
        this.inside = false;
      }
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
}
