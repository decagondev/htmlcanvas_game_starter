class Player {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = 4; 
        this.velX = 0; 
        this.velY = 0;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.x += this.velX;
        this.y += this.velY;
    }

    move(dx, dy) {
        this.velX = dx * this.speed;
        this.velY = dy * this.speed;
    }

    stop() {
        this.velX = 0;
        this.velY = 0;
    }
}


var canvas = document.getElementById("myCanvas");

var ctx = canvas.getContext("2d");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var player = new Player(20, 20, 20, 20, "#FF0000");

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
    player.velX = (keysPressed['ArrowRight'] ? player.speed : 0) - (keysPressed['ArrowLeft'] ? player.speed : 0);
    player.velY = (keysPressed['ArrowDown'] ? player.speed : 0) - (keysPressed['ArrowUp'] ? player.speed : 0);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.update();

    player.draw(ctx);

    requestAnimationFrame(gameLoop);
}

gameLoop();
