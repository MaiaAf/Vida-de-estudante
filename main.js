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
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,4,5,6,0,0,0,],
  [0,4,5,5,6,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,1,2,2,2,2,3,0,0,1,2,2,2,2,2,3,],
]


function desenharCenario() {
  for (let i = 0; i < LARGURA_JOGO / TILE_TAMANHO; i++) {
    for (let j = 0; j <  ALTURA_JOGO / TILE_TAMANHO; j++) {
      if (mapa1[j][i] == 0) continue;

      ctx.drawImage(
        tileset, // imagem
        16 * (mapa1[j][i] - 1),
        0, // Posição x e y do início do recorte
        16,
        16, // tamanho x e y do recorte
        i * 16,
        j * 16, // posição da imagem
        16,
        16,
    );
    }
  }
}

const jogador = new Sprite({ x: 10, y: 10 }, "Navy");
const ansiedade1 = new Sprite({ x: 50, y: 50 }, "red");

const pers = new ImagemAnimada({ x: 100, y: 10 }, "./img/estudante.webp");



function loop() {
  window.requestAnimationFrame(loop);

  agora = Date.now();
  delta = agora - passado;

  if (delta < intervalo_ms) return;

  passado = agora - (delta % intervalo_ms);

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpar canvas

  desenharCenario();
  jogador.update();
  ansiedade1.update();
  pers.update();
}

loop();
