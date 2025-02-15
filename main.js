const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var agora;
var passado = Date.now();
var fps = 60
var intervalo_ms = 1000/fps;
var delta;

function desenharCenario() {
  ctx.fillStyle = "DarkGreen";
  ctx.fillRect(0, canvas.height - 20, canvas.width, 20);
}

const jogador = new Sprite({ x: 10, y: 10 }, "Navy");

const ansiedade1 = new Sprite({ x: 50, y: 50 }, "red");
const personagemImg = new Image();

personagemImg.src = "./img/estudante.webp";

const pers = new ImagemAnimada({ x: 100, y: 10 }, personagemImg);
jogador.draw();
ansiedade1.draw();
pers.draw();


function loop() {
  window.requestAnimationFrame(loop);

  agora = Date.now();
  delta = agora - passado;

  if (delta < intervalo_ms) return;
  passado = agora - (delta % intervalo_ms);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  desenharCenario();
  jogador.update();
  ansiedade1.update();
  pers.update();
}

loop();
