//your code here
document.addEventListener("DOMContentLoaded", function() {
  const gameContainer = document.getElementById("gameContainer");
  const scoreBoard = document.createElement("div");
  scoreBoard.className = "scoreBoard";
  gameContainer.appendChild(scoreBoard);

  const rows = 10;
  const cols = 10;
  const pixels = [];

  let snake = [{ row: 9, col: 0 }];
  let food = {};
  let direction = "right";
  let score = 0;

  function createPixels() {
    let pixelId = 1;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const pixel = document.createElement("div");
        pixel.className = "pixel";
        pixel.id = "pixel" + pixelId;
        pixelId++;
        gameContainer.appendChild(pixel);
        pixels.push({ row: i, col: j });
      }
    }
  }

  function getRandomPixel() {
    const randomIndex = Math.floor(Math.random() * pixels.length);
    return pixels[randomIndex];
  }

  function createFood() {
    const foodPixel = getRandomPixel();
    food = foodPixel;
    const foodElement = document.getElementById("pixel" + (foodPixel.row * 10 + foodPixel.col + 1));
    foodElement.classList.add("food");
  }

  function moveSnake() {
    const head = Object.assign({}, snake[0]);

    if (direction === "right") {
      head.col++;
    } else if (direction === "left") {
      head.col--;
    } else if (direction === "up") {
      head.row--;
    } else if (direction === "down") {
      head.row++;
    }

    snake.unshift(head);

    const tail = snake.pop();
    const headElement = document.getElementById("pixel" + (head.row * 10 + head.col + 1));
    const tailElement = document.getElementById("pixel" + (tail.row * 10 + tail.col + 1));

    if (head.row === food.row && head.col === food.col) {
      score += 10;
      scoreBoard.textContent = "Score: " + score;
      headElement.classList.add("snakeBodyPixel");
      createFood();
    } else {
      headElement.classList.add("snakeBodyPixel");
      tailElement.classList.remove("snakeBodyPixel");
    }
  }

  function handleKeyPress(event) {
    if (event.keyCode === 37 && direction !== "right") {
      direction = "left";
    } else if (event.keyCode === 38 && direction !== "down") {
      direction