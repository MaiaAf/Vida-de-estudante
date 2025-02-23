const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;


const LARGURA_JOGO = 256;
const ALTURA_JOGO = 128;
const TILE_TAMANHO = 16;
const tileset = new Image();
tileset.src = "./img/mundo_tiles.webp"

var agora;
var passado = Date.now();
var fps = 60
var intervalo_ms = 1000/fps;
var delta;

const mapa1 = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,4,5,6,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,],
  [0,4,5,5,6,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,],
  [0,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,],
  [0,8,10,2,2,2,3,0,0,1,2,2,2,2,2,3, 1,2,3,4,5,6,7,8,0,0,  1,2,3,4,5,6,7,8,0,0,],
  [0,8,10,2,2,2,3,0,0,1,2,2,2,2,2,3, 1,2,3,4,5,6,7,8,0,8,  1,2,3,4,5,6,7,8,0,8,],
  [0,8,10,2,2,2,3,0,0,1,2,2,2,2,2,3, 1,2,3,4,5,6,7,8,0,0,  1,2,3,4,5,6,7,8,0,0,],
  [0,8,10,2,2,2,3,0,0,1,2,2,2,2,2,3, 1,2,3,4,5,6,7,8,0,0,  1,2,3,4,5,6,7,8,0,0,],
  [0,8,10,2,2,2,3,0,0,1,2,2,2,2,2,3, 1,2,3,4,5,6,7,8,6,8,  1,2,3,4,5,6,7,8,6,8,],
]
const mapa1Largura = mapa1[0].length;
const mapa1Altura = mapa1.length;

var colisoes = []
const camera = new Camera({x: 0, y: 0});

function desenharCenario(mapa, colidir = false) {
  // Define a posição x e y do primeiro tile da tela (superior esquerdo)
  const tileX = Math.floor(camera.pos.x / TILE_TAMANHO);
  const tileY = Math.floor(camera.pos.y / TILE_TAMANHO);

  // Itera sobre o mapa e desenha do primeiro tile até a largura e altura inteiras da tela
  for (let i = tileX; i < Math.floor(camera.pos.x + LARGURA_JOGO) / TILE_TAMANHO + 1; i++) {
    for (let j = tileY; j <  Math.floor(camera.pos.y + ALTURA_JOGO) / TILE_TAMANHO + 1; j++) {
      if (i < 0 || j < 0 || i >= mapa[0].length || j >= mapa.length) {
        continue;
      }
      let tile_atual = mapa[j][i];

      // Se o tile atual não for 0, envia um objeto de colisão.
      if (tile_atual == 0) {
        continue;
      } else {
        if (!colidir) continue;
          let tile_altura = TILE_TAMANHO
          // Altura das plataformas
          if ([4,5,6].includes(tile_atual)) tile_altura = 5;

          colisoes.push({
            x: i * TILE_TAMANHO - camera.pos.x,
            y: j * TILE_TAMANHO - camera.pos.y,
            altura: tile_altura,
          })
        };

      ctx.drawImage(
        tileset, // imagem
        16 * ((tile_atual-1) % 7),
        16 * Math.floor(tile_atual / 7), // Posição x e y do início do recorte
        16,
        16, // tamanho x e y do recorte
        i * TILE_TAMANHO - camera.pos.x,
        j * TILE_TAMANHO - camera.pos.y, // posição da imagem
        16,
        16,
    );
    }
  }
}


const ansiedade1 = new Sprite({ x: 50, y: 50 }, "red");

const pers = new ImagemAnimada({ x: 0, y: 10 }, "./img/estudante.webp");



function calcularQuadro() {
  agora = Date.now();
  delta = agora - passado;

  if (delta < intervalo_ms) return false;

  passado = agora - (delta % intervalo_ms);
  return true
}

function loop() {
  window.requestAnimationFrame(loop);
  if (!calcularQuadro()) return

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpar canvas

  camera.update(pers.position);
  desenharCenario(mapa1, true);

  ansiedade1.update();
  // pers.velocity.y = 1
  pers.update();
  pers.velocity.x = 0
  pers.estado = 0;
  if (pers.velocity.y > 0) pers.estado = 2;
  if(keys.d.pressed){
    pers.velocity.x = 1
    pers.estado = 1
  } else if (keys.a.pressed){
    pers.velocity.x = -1
  }

}


loop();


