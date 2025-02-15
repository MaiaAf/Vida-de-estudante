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

class ImagemAnimada {
  constructor(pos, imagem) {
    this.position = pos;
    this.imagem = imagem;
    
    this.coluna = 0;
    this.linha = 0;
    this.estado = 1; // 0 - Parado, 1 - andando - 2 - pulando
    this.quadro_atual = 0;
    this.frame = 0;
    this.anim_duracao = fps
  }

  draw() {
    ctx.drawImage(
      this.imagem, // imagem
      16 * this.linha,
      16 * this.coluna, // Posição x e y do início do recorte
      16,
      16, // tamanho x e y do recorte
      this.position.x,
      this.position.y, // posição da imagem
      16,
      16,
    );
    this.animar()
  }

  animar(){
    this.coluna = this.estado
    if (this.quadro_atual > this.anim_duracao) this.quadro_atual = 0;

    switch (this.estado) {
      case 0:
        this.anim_duracao = fps * 3; // quantidade de frames na animação
        if (![this.anim_duracao * 2 / 3, this.anim_duracao * 1 / 3].includes(this.quadro_atual)) break;
        this.linha = this.frame % 3
        break;
      case 1:
        this.anim_duracao = fps / 6;
        if (![this.anim_duracao].includes(this.quadro_atual)) break;
        this.linha = this.frame % 3
        break;
      case 2:
        this.anim_duracao = fps;
        if (![this.anim_duracao].includes(this.quadro_atual)) break;
        this.linha = this.frame % 2
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
      this.estado = 1;
    }
  }
}
