const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 720;
canvas.height = 480;

function comecarJogo() {
  ctx.fillStyle = "DarkGreen";
  ctx.fillRect(0, canvas.height - 20, canvas.width, 20);
}

const jogador = new Sprite({ x: 10, y: 10 }, "Navy");

const ansiedade1 = new Sprite({ x: 50, y: 50 }, "red");

jogador.draw();
ansiedade1.draw();
console.log(jogador);
