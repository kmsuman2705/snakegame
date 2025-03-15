// Setup the canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game settings
const gridSize = 20;
const canvasSize = 400;
const initialSnakeLength = 5;
let snake = [];
let direction = 'RIGHT';
let food = {};
let score = 0;

// Initialize the game
function initGame() {
    snake = [];
    for (let i = initialSnakeLength - 1; i >= 0; i--) {
        snake.push({ x: i, y: 0 });
    }
    score = 0;
    placeFood();
    document.addEventListener('keydown', changeDirection);
    gameLoop();
}

// Game loop to update game every frame
// Game loop to update game every frame
function gameLoop() {
    setTimeout(function () {
        clearCanvas();
        moveSnake();
        checkCollisions();
        drawSnake();
        drawFood();
        updateScore();
        gameLoop();
    }, 100);  // Increased the delay from 100ms to 200ms (or try 150ms)
}


// Clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Move the snake
function moveSnake() {
    let head = { ...snake[0] };

    if (direction === 'LEFT') head.x -= 1;
    if (direction === 'RIGHT') head.x += 1;
    if (direction === 'UP') head.y -= 1;
    if (direction === 'DOWN') head.y += 1;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        placeFood();
    } else {
        snake.pop();
    }
}

// Check for collisions
function checkCollisions() {
    let head = snake[0];

    // Check if snake hits walls
    if (head.x < 0 || head.x >= canvasSize / gridSize || head.y < 0 || head.y >= canvasSize / gridSize) {
        gameOver();
    }

    // Check if snake hits itself
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
        }
    }
}

// Game Over
function gameOver() {
    alert('Game Over! Your score is ' + score);
    initGame(); // Restart the game
}

// Change snake direction based on arrow keys
function changeDirection(event) {
    if (event.keyCode === 37 && direction !== 'RIGHT') direction = 'LEFT';
    if (event.keyCode === 38 && direction !== 'DOWN') direction = 'UP';
    if (event.keyCode === 39 && direction !== 'LEFT') direction = 'RIGHT';
    if (event.keyCode === 40 && direction !== 'UP') direction = 'DOWN';
}

// Draw the snake
function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
}

// Place food at random position
function placeFood() {
    food = {
        x: Math.floor(Math.random() * (canvasSize / gridSize)),
        y: Math.floor(Math.random() * (canvasSize / gridSize))
    };
}

// Draw the food
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

// Update score display
function updateScore() {
    document.getElementById('score').textContent = 'Score: ' + score;
}

// Initialize the game when the page loads
window.onload = initGame;
