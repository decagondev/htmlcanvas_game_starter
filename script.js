const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const resolution = 10;
const rows = canvas.height / resolution;
const cols = canvas.width / resolution;

let grid = buildGrid();
requestAnimationFrame(update);

function buildGrid() {
  return new Array(cols).fill(null)
    .map(() => new Array(rows).fill(null).map(() => Math.floor(Math.random() * 2)));
}

function update() {
  drawGrid();
  grid = nextGeneration();
  requestAnimationFrame(update);
}

function nextGeneration() {
  const nextGen = grid.map(arr => [...arr]);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const state = grid[i][j];
      let neighbors = 0;

      for (let x = -1; x < 2; x++) {
        for (let y = -1; y < 2; y++) {
          const col = (i + x + cols) % cols;
          const row = (j + y + rows) % rows;
          neighbors += grid[col][row];
        }
      }
      neighbors -= state;

      if (state === 1 && (neighbors < 2 || neighbors > 3)) {
        nextGen[i][j] = 0;
      } else if (state === 0 && neighbors === 3) {
        nextGen[i][j] = 1;
      }
    }
  }

  return nextGen;
}

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = i * resolution;
      const y = j * resolution;
      if (grid[i][j] === 1) {
        ctx.fillStyle = 'black';
        ctx.fillRect(x, y, resolution, resolution);
      }
    }
  }
}