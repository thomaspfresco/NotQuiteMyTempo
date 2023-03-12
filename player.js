class Player {
    x; y; //pos
    w; h; //tamanho
    vel; //velocidade de queda
    move; //distancia esquerda/direita
    walk; //velocidade de movimento
    jumping; //bool de controlo de salto e colisao

    constructor(x,y,w,h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this. vel = 0;
        this.move = 0;
        this.walk = 4;
        this.jumping = true;
    }

    draw() {
        fill(255, 0, 0);
        noStroke();
        rect(this.x, this.y-this.h, this.w, this.h);
        
        // player velocity
        if (this.jumping) this.vel += 0.5;

        // player movement
        this.vel *= 0.9;
        this.y += this.vel;
        this.x += this.move;
    }
}