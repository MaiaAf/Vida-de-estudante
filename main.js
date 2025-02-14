const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


function desenharCenario() {
  ctx.fillStyle = "DarkGreen";
  ctx.fillRect(0, canvas.height - 20, canvas.width, 20);
}

const jogador = new Sprite({ x: 10, y: 10 }, "Navy");

const ansiedade1 = new Sprite({ x: 50, y: 50 }, "red");

jogador.draw();
ansiedade1.draw();
console.log(jogador);


function animar() {
  window.requestAnimationFrame(animar)
  ctx.clearRect(0,0,canvas.width,canvas.height)
  desenharCenario();
  jogador.update();
  ansiedade1.update();
}

animar();