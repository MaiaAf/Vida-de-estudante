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
    this.velocity = {x:0, y:0}
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

  colidir(){
    colisoes.forEach(element => {
      ctx.fillRect(element.x, element.y, 3,3)
      if (this.position.x + TILE_TAMANHO > element.x && 
          this.position.x < element.x + TILE_TAMANHO && 
          this.position.y + TILE_TAMANHO > element.y && 
          this.position.y < element.y + TILE_TAMANHO) {
            
        if (this.position.x < element.x + TILE_TAMANHO / 2) {
          this.velocity.x = 0; // Colisão na esquerda
        } else {
          this.velocity.x = 1; // Colisão na direita
        }
  
        if (this.position.y < element.y + TILE_TAMANHO / 2) {
          this.velocity.y = 0; // Colisão em cima
        } else {
          this.velocity.y = 1; // Colisão em baixo
        }
      }
    });
  }
  
  update() {
    this.draw();

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    
    // if (this.position.y < canvas.height - 26) {
      this.velocity.y = 1;
      this.estado = 2;
    // } else {this.velocity.y = 0}
    this.colidir()

  }
}


class Camera {
  constructor(pos = {x: 0, y: 0}) {
    this.pos = pos;
  }

  update(playerPosition){
    const camX = playerPosition.x - (LARGURA_JOGO / 2);
    const camY = playerPosition.y - (ALTURA_JOGO / 2);

    if (this.pos.x - camX > 64 || this.pos.x - camX < 64) this.pos.x = camX; // Margem no eixo X
    this.pos.y = camY;
    
    // Limitar movimento da câmera ao tamanho do mapa
    this.pos.x = Math.max(0, Math.min(this.pos.x, mapa1Largura * TILE_TAMANHO - LARGURA_JOGO))
    this.pos.y = Math.max(0, Math.min(this.pos.y, mapa1Altura * TILE_TAMANHO - ALTURA_JOGO))

    // ctx.fillRect(this.pos.x, this.pos.y,LARGURA_JOGO,ALTURA_JOGO)
    console.log("player", playerPosition)
    console.log("Camera:", this.pos);
    // const margem = 64
  }
}