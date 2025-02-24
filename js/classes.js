// Classe que define o básico para personagens e inimigos terem física, animação e colisão
class ImagemAnimada{
  constructor(pos, imagem) {
    this.position = pos;
    this.imagem = new Image();
    this.imagem.src = imagem;
    this.velocity = {x:0, y:0}
    this.pulando = false;
    this.estado = 0; // 0 - Parado, 1 - andando - 2 - pulando 3 - andando esquerda
    this.coluna = 0;
    this.linha = 0;
    this.estado_anterior = 0;
    this.quadro_atual = 0;
    this.frame = 0;
    this.frame_duracao = fps;

  }

  draw() {
    this.animar()
    ctx.drawImage(
      this.imagem, // imagem
      16 * this.coluna, // Posição x e y do início do recorte
      16 * this.linha,
      16,
      16, // tamanho x e y do recorte
      this.position.x - camera.pos.x,
      this.position.y - camera.pos.y, // posição da imagem
      16,
      16,
    );
  }


  
  colidir() {
    colisoes.forEach(element => {
      // Mostrar colisão do mundo
      // ctx.fillStyle = '#f006';
      // ctx.fillRect(element.x, element.y, TILE_TAMANHO, element.altura);
      
      
      // Verifica se há colisão
      let posx = this.position.x - camera.pos.x;
      let posy = this.position.y - camera.pos.y;
      
      // Mostrar colisão do personagem e inimigos
      // ctx.fillStyle = '#0f06';
      // ctx.fillRect(posx, posy, TILE_TAMANHO, TILE_TAMANHO); // Corrigido para usar TILE_TAMANHO para altura
      const colidiu = posx + TILE_TAMANHO > element.x &&
                      posx < element.x + TILE_TAMANHO &&
                      posy + TILE_TAMANHO > element.y &&
                      posy < element.y + element.altura;
  
      if (colidiu) {

        // Se a colisão for com os blocos do IFBA, vencer o jogo e ignorar a colisão
        if ([15,17, 22, 23, 24].includes(element.tile)){
          jogo_ganho = true;
          return;
        }

        // Colisão na esquerda
        const distEsquerda = (posx + TILE_TAMANHO) - element.x;
        // Colisão na direita
        const distDireita = (element.x + TILE_TAMANHO) - posx;
        // Colisão em cima
        const distCima = (posy + TILE_TAMANHO) - element.y;
        // Colisão em baixo
        const distBaixo = (element.y + element.altura) - posy;
  
        // Determina a menor distância para ajustar a posição
        const menorDistancia = Math.min(distEsquerda, distDireita, distCima, distBaixo);
        
        // Se a colisão for detectada, zera a velocidade e move o objeto para fora da colisão
        if (menorDistancia === distEsquerda) {
          this.position.x = element.x - TILE_TAMANHO + camera.pos.x; // Ajusta para a esquerda
          this.velocity.x = 0;
        } else if (menorDistancia === distDireita) {
          this.position.x = element.x + TILE_TAMANHO + camera.pos.x; // Ajusta para a direita
          this.velocity.x = 0;
        } else if (menorDistancia === distCima) {
          this.position.y = element.y - TILE_TAMANHO + camera.pos.y; // Ajusta para cima
          this.velocity.y = 0;
          this.pulando = false; // Reseta o pulo
        } else if (menorDistancia === distBaixo) {
          this.position.y = element.y + element.altura + camera.pos.y; // Ajusta para baixo
          this.velocity.y = 0;
        }
      }
    });
  }
  
  
  
  update() {
    if (this.velocity.x == 0) {
      this.estado = 0;
    }
    if (this.pulando) {
      this.estado = 2;
    }
    this.draw();

    // Movimento
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // Gravidade
    this.velocity.y += 0.2;

    // Limita a gravidade à 4
    this.velocity.y = Math.min(4,this.velocity.y)
    this.colidir() //Chamar colisões
  }
}

// Classe para personagem com métodos adicionais pular, animar e morrer
class Personagem extends ImagemAnimada {
  constructor(pos,imagem){
    super(pos,imagem);
    this.anim_frames= {
      idle: [0,0,0,1,1,0,0,0,2,2],
      andar: [0,1,2,3,4,5],
    };
  }

  pular(){
    if (this.pulando) return; // Apenas um pulo por vez
    this.pulando = true;
    this.velocity.y -= 4;
}
  animar(){
    this.linha = this.estado;
    if (this.quadro_atual > this.frame_duracao) this.quadro_atual = 0;
    if ( this.estado != this.estado_anterior){
      this.estado_anterior = this.estado
      this.frame = 0;
    }
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

        case 3:
          this.frame_duracao = 6;
          if (this.quadro_atual != this.frame_duracao) break;
  
          this.coluna = this.anim_frames.andar[this.frame % this.anim_frames.andar.length];
          break;
      }
      
      this.frame++;
      this.quadro_atual++;
  }

  morrer(){
    // Retorna o personagem para o local inicial
    this.position.x = posinicial.x - camera.pos.x;
    this.position.x = posinicial.y - camera.pos.y;
    console.log("morri")
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
    this.pos.x = camX;
    this.pos.y = camY;
    
    // Limitar movimento da câmera ao tamanho do mapa
    this.pos.x = Math.max(0, Math.min(this.pos.x, mapa1Largura * TILE_TAMANHO - LARGURA_JOGO))
    this.pos.y = Math.max(0, Math.min(this.pos.y, mapa1Altura * TILE_TAMANHO - ALTURA_JOGO))

  }
}


class Inimigo extends ImagemAnimada{
  constructor(pos,imagem){
    super(pos,imagem);

    this.anim_frames= {
      idle: [0,0,1,0,0],
    };
  }

  // Animação do inimigo
  animar(){
    this.frame_duracao = 30; // Duração do quadro em frames por segundo
    if (this.quadro_atual > this.frame_duracao) this.quadro_atual = 0;
    if (this.quadro_atual == this.frame_duracao){
      this.coluna = this.anim_frames.idle[this.frame % this.anim_frames.idle.length];
      this.velocity.x = this.velocity.x * -1;
    }
    
    this.frame++;
    this.quadro_atual++;
  }

  update(){
    this.velocity.x = 0.1
    this.draw();

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.velocity.y = 1;
    this.colidir()

    // Matar o personagem se detecar contato
    if (contato(this, pers)) {
      pers.morrer();
    }
  }
}