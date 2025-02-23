// Definir canvas e context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
// Manter pixels afiados, sem borrar
ctx.imageSmoothingEnabled = false;

// Largura real do jogo, antes de ser redimensionada
const LARGURA_JOGO = 256;
const ALTURA_JOGO = 128;
const TILE_TAMANHO = 16;
const tileset = new Image();
tileset.src = "./img/mundo_tiles.webp"

// Variáveis de tempo para calcular os quadros
var agora;
var passado = Date.now();
var fps = 60
var intervalo_ms = 1000/fps;
var delta;

// Array que guarda a posição das colisões, referentes a um bloco de 16x16 no mapa
var colisoes = []

// Instanciar objetos
const camera = new Camera();

const pers = new Personagem({ x: 64, y: (mapa1Altura - 8) * 16 }, "./img/estudante.webp");
const ansiedade1 = new Ansiedade({ x: 50, y: 50 }, "./img/inimigos.webp");


// Verifica se já é hora de um novo quadro
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

  pers.velocity.x = 0

  if(keys.d.pressed){
    pers.velocity.x = 1
    pers.estado = 1
  } else if (keys.a.pressed){
    pers.velocity.x = -1
    pers.estado = 3
  }

  pers.update();
  ansiedade1.update();
  // ansiedade1.atacar();

  // Limpa o array de colisões
  colisoes = [];
}


loop();


