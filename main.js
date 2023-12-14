const pongCanvas = document.getElementById('pongCanvas');
const scoreCanvas = document.getElementById('scoreCanvas');
const context = pongCanvas.getContext('2d');
const scoreContext = scoreCanvas.getContext('2d');

// Paddle and ball properties
const paddleWidth = 10;
const paddleHeight = 125;
let leftPaddleY = pongCanvas.height / 2 - paddleHeight / 2;
let rightPaddleY = pongCanvas.height / 2 - paddleHeight / 2;
const ballSize = 10;
let ballX = pongCanvas.width / 2;
let ballY = pongCanvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

// Score
let leftPlayerScore = 0;
let rightPlayerScore = 0;

// Array to store previous positions and colors of the ball for the trail effect
const ballTrail = [];


// Explosion properties
const explosionParticles = [];

function drawExplosion() {
    for (let i = 0; i < explosionParticles.length; i++) {
        const particle = explosionParticles[i];
        context.beginPath();
        context.fillStyle = particle.color;
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();

        // Update particle position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Reduce particle size and alpha for fade-out effect
        particle.radius *= 0.95;
        particle.alpha *= 0.95;
    }

    // Remove faded-out particles
    explosionParticles = explosionParticles.filter(particle => particle.alpha > 0);
}

function createExplosion(x, y) {
    for (let i = 0; i < 20; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        const color = getRandomColor();

        explosionParticles.push({
            x: x,
            y: y,
            speedX: Math.cos(angle) * speed,
            speedY: Math.sin(angle) * speed,
            radius: 10,
            color: color,
            alpha: 1.0,
        });
    }
}


function clearCanvas(canvas) {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
}



// Modifiez la fonction drawField pour utiliser une ligne pointillée au milieu
function drawField() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, pongCanvas.width, pongCanvas.height);

    context.strokeStyle = 'white';
    context.lineWidth = 3;

    // Utilisez setLineDash pour définir le motif de ligne pointillée
    context.setLineDash([20, 20]);  // 10 pixels de trait suivi de 5 pixels d'espace
    context.lineDashOffset = 0;    // Offset initial

    context.beginPath();
    context.moveTo(pongCanvas.width / 2, 0);
    context.lineTo(pongCanvas.width / 2, pongCanvas.height);
    context.stroke();

    // Réinitialisez le motif de ligne
    context.setLineDash([]);
    context.lineDashOffset = 0;

    context.lineWidth = 1;
}


function drawPlayers() {
    context.fillStyle = 'red';
    context.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
    context.fillRect(pongCanvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);
}

function drawBall() {
    for (let i = ballTrail.length - 1; i >= 0; i--) 
	{
		if (i%3 == 0)
		{
        const { x, y, color } = ballTrail[i];
        context.beginPath();
        context.fillStyle = color;
        context.arc(x, y, ballSize, 0, Math.PI * 2);
        context.fill();
		}
    }
}

function drawScores() {
    scoreContext.clearRect(0, 0, scoreCanvas.width, scoreCanvas.height);
    scoreContext.fillStyle = 'white';
    scoreContext.font = '30px Arial';
    scoreContext.fillText(leftPlayerScore, scoreCanvas.width / 4, scoreCanvas.height / 2);
    scoreContext.fillText(rightPlayerScore, 3 * scoreCanvas.width / 4, scoreCanvas.height / 2);
}

function updateGame() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY - ballSize < 0 || ballY + ballSize > pongCanvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    if (
        (ballX - ballSize < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) ||
        (ballX + ballSize > pongCanvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight)
    ) {
        ballSpeedX = -ballSpeedX;
    }

    leftPaddleY = Math.max(0, Math.min(leftPaddleY, pongCanvas.height - paddleHeight));
    rightPaddleY = Math.max(0, Math.min(rightPaddleY, pongCanvas.height - paddleHeight));

    if (ballX <= 0) {
        rightPlayerScore++;
		createExplosion(pongCanvas.width / 2, pongCanvas.height / 2);
        resetBall();
    }

    if (ballX >= pongCanvas.width) {
        leftPlayerScore++;
		createExplosion(pongCanvas.width / 2, pongCanvas.height / 2); 
        resetBall();
    }

    // Add the current position and a random color to the trail
    const randomColor = getRandomColor();
    ballTrail.push({ x: ballX, y: ballY, color: randomColor });

    // Remove the oldest positions if the trail is too long
    if (ballTrail.length > 30) {
        ballTrail.shift();
    }
}

function resetBall() {
    ballX = pongCanvas.width / 2;
    ballY = pongCanvas.height / 2;
    // Clear the ball trail when the ball is reset
    ballTrail.length = 0;
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function gameLoop() {
    clearCanvas(pongCanvas);
    clearCanvas(scoreCanvas);

    drawField();
    drawPlayers();
	// drawExplosion();
    drawBall();
    drawScores();

    updateGame();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowUp') {
        rightPaddleY -= 20;
    } else if (event.key === 'ArrowDown') {
        rightPaddleY += 20;
    } else if (event.key === 'w') {
        leftPaddleY -= 20;
    } else if (event.key === 's') {
        leftPaddleY += 20;
    }
});

gameLoop();
