class Paddle {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = 4; 
        this.velY = 0;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.y += this.velY;

        if (this.y < 0) {
            this.y = 0;
        } else if (this.y + this.height > canvas.height) {
            this.y = canvas.height - this.height;
        }
    }

    move(dy) {
        this.velY = dy * this.speed;
    }

    stop() {
        this.velY = 0;
    }
}

class Ball {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speedX = 4;
        this.speedY = 4;
        this.directionX = Math.random() < 0.5 ? 1 : -1;
        this.directionY = Math.random() < 0.5 ? 1 : -1;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        this.x += this.speedX * this.directionX;
        this.y += this.speedY * this.directionY;

        if(this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
            this.directionY = -this.directionY;
        }

        if(this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
            this.directionX = -this.directionX;
        }
    }

    reset() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;

        this.directionX = Math.random() < 0.5 ? 1 : -1;
        this.directionY = Math.random() < 0.5 ? 1 : -1;
    }
}


var canvas = document.getElementById("myCanvas");

var ctx = canvas.getContext("2d");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score1 = 0;
let score2 = 0;


const paddle1 = new Paddle(20, canvas.height / 2 - 50, 20, 100, "#FF0000");
const paddle2 = new Paddle(canvas.width - 40, canvas.height / 2 - 50, 20, 100, "#0000FF");

const ball = new Ball(canvas.width / 2, canvas.height / 2, 10, "#00FF00");

var keysPressed = {};
document.addEventListener("keydown", function(event) {
    keysPressed[event.key] = true;
    updatePlayerVelocity();
});

document.addEventListener("keyup", function(event) {
    delete keysPressed[event.key];
    updatePlayerVelocity();
});

function updatePlayerVelocity() {

    paddle1.move(keysPressed['w'] ? -1 : keysPressed['s'] ? 1 : 0);
    paddle2.move(keysPressed['ArrowUp'] ? -1 : keysPressed['ArrowDown'] ? 1 : 0);
    
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    paddle1.update();
    paddle2.update()
    ball.update()

    // if ball collides with paddles bounce off paddle
    if (ball.x - ball.radius < paddle1.x + paddle1.width && ball.y > paddle1.y && ball.y < paddle1.y + paddle1.height || ball.x + ball.radius > paddle2.x && ball.y > paddle2.y && ball.y < paddle2.y + paddle2.height) {
        ball.directionX = -ball.directionX;
    }

    // check for a goal
    if (ball.x - ball.radius < 0) {
        // give player 2 a point
        score2++;
        ball.reset();
    } else if (ball.x + ball.radius > canvas.width) {
        // give player 1 a point
        score1++;
        ball.reset();
    }

    paddle1.draw(ctx);
    paddle2.draw(ctx);
    ball.draw(ctx);

    ctx.font = "30px Arial";
    ctx.fillStyle = "#333333";
    ctx.fillText("Player1: " + score1, 20, 50);
    ctx.fillText("Player2: " + score2, canvas.width - 180, 50);

    requestAnimationFrame(gameLoop);
}

gameLoop();
