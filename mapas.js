// Estruturas de dados com arrays que desenham os níveis, cada número representa um bloco da imagem
// 0 representa nenhum

const mapa1 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 6, 0, 0, 5, 6, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 1, 2, 2, 2, 8, 8, 8, 2, 2, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 2, 2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 8, 8, 3, 4, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [2, 2, 2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 8, 8, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2,],
    [0, 0, 0, 10, 10, 10, 10, 10, 10, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 1, 2, 1, 9, 9, 9, 9, 9, 9, 9, 9,],
    [0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 8, 8, 10, 8, 8, 8, 8, 8, 8, 10, 8,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 3, 0, 0,],
    [0, 1, 1, 8, 8, 8, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 8, 8, 8, 8, 8, 8, 8, 8, 3, 0,],
    [1, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 2, 2, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 3,],
    [10, 10, 10, 10, 8, 10, 8, 9, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,],
    [10, 8, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 8, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 8, 9],
]
const mapa1Largura = mapa1[0].length;
const mapa1Altura = mapa1.length;


// Função que desenha o cenário
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