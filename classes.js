class Sprite {
  constructor(pos, color) {
    this.position = pos;
    this.color = color;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, 10, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  update() {
    this.draw();
    if (this.position.y < canvas.height - 20) this.position.y += 3;
  }
}

class ImagemAnimada extends Sprite{
  constructor(pos, imagem) {
    super(pos);
    this.imagem = new Image();
    this.imagem.src = imagem;
    
    this.coluna = 0;
    this.linha = 0;
    this.estado = 1; // 0 - Parado, 1 - andando - 2 - pulando
    this.quadro_atual = 0;
    this.frame = 0;
    this.frame_duracao = fps;
    this.anim_frames= {
      idle: [0,0,0,1,1,0,0,0,2,2],
      andar: [0,1,2,3,4,5],
    };
  }

  draw() {
    this.animar()
    ctx.drawImage(
      this.imagem, // imagem
      16 * this.coluna, // Posição x e y do início do recorte
      16 * this.linha,
      16,
      16, // tamanho x e y do recorte
      this.position.x,
      this.position.y, // posição da imagem
      16,
      16,
    );
  }

  animar(){
    this.linha = this.estado;
    if (this.quadro_atual > this.frame_duracao) this.quadro_atual = 0;

    switch (this.estado) {
      case 0:
        this.frame_duracao = 60; // Duração do quadro em frames por segundo
        if (this.quadro_atual != this.frame_duracao) break;

        this.coluna = this.anim_frames.idle[this.frame % this.anim_frames.idle.length];
        break;

      case 1:
        this.frame_duracao = 6;
        if (this.quadro_atual != this.frame_duracao) break;

        this.coluna = this.anim_frames.andar[this.frame % this.anim_frames.andar.length];


        break;
      case 2:
        this.frame_duracao = 12;
        if (this.quadro_atual != this.frame_duracao) break;
        this.coluna = this.frame % 2
        break;
      }

      this.frame++;
      this.quadro_atual++;
  }

  update() {
    this.draw();
    if (this.position.y < canvas.height - 26) {
      this.position.y += 3;
      this.estado = 2;
    } else {
      this.position.x += 0.5;
      this.estado = 1;
    }
  }
}
