const pongCanva = document.getElementById('pongCanvas');
const context = pongCanva.getContext('2d');

// Paddle and ball properties
const paddleWidth = 10;
const paddleHeight = 100;
let leftPaddleY = pongCanva.height / 2 - paddleHeight / 2;
let rightPaddleY = pongCanva.height / 2 - paddleHeight / 2;
const ballSize = 10;
let ballX = pongCanva.width / 2;
let ballY = pongCanva.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

// score
let leftPlayerScore = 0;
let rightPlayerScore = 0;


function draw() 
{
	var score = scoreCanvas.getContext('2d'); 
	var context = pongCanva.getContext('2d');

	score.clearRect(0, 0, scoreCanvas.width, scoreCanvas.height);

	// Draw left player score
    score.fillStyle = 'white';
    score.font = '30px Arial';
    score.fillText(leftPlayerScore, scoreCanvas.width / 4,scoreCanvas.height / 2);

    // Draw right player score
    score.fillText(rightPlayerScore, 3 * scoreCanvas.width / 4, scoreCanvas.height / 2);

	// Draw field
	context.fillStyle = 'black';
	context.fillRect(0, 0, pongCanva.width, pongCanva.height);	
	// Draw middle line
	context.strokeStyle = 'white';
	context.lineWidth = 5;	
	context.beginPath();
	context.moveTo(pongCanva.width / 2, 0);
	context.lineTo(pongCanva.width / 2, pongCanva.height);
	context.stroke();
	context.lineWidth = 1;	

	// Draw players
	context.fillStyle = 'white';
	context.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
	context.fillRect(pongCanva.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);	

	// Draw ball
	context.beginPath();
	context.fillStyle = 'red';
	context.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
	context.fill();	

	// Move the ball
	ballX += ballSpeedX;
	ballY += ballSpeedY;	

	// Bounce off top and bottom walls
	if (ballY - ballSize < 0 || ballY + ballSize > pongCanva.height) {
	    ballSpeedY = -ballSpeedY;
	}	

	// Bounce off paddles
	if (
	    (ballX - ballSize < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) ||
	    (ballX + ballSize > pongCanva.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight)
	) {
	    ballSpeedX = -ballSpeedX;
	}	

	// Move right paddle based on the ball's position
	// if (ballY > rightPaddleY + paddleHeight / 2) {
	//     rightPaddleY += 5;
	// } else {
	//     rightPaddleY -= 5;
	// }	

	// Prevent paddles from going out of bounds
	leftPaddleY = Math.max(0, Math.min(leftPaddleY, pongCanva.height - paddleHeight));
	rightPaddleY = Math.max(0, Math.min(rightPaddleY, pongCanva.height - paddleHeight));
	
	//change the score
	if (ballX <= 0)
	{
		rightPlayerScore ++;
		ballX = pongCanva.width / 2;
	    ballY = pongCanva.height / 2;
	}

	if (ballX >= pongCanva.width)
	{
		leftPlayerScore ++;
		ballX = pongCanva.width / 2;
	    ballY = pongCanva.height / 2;
	}

}


function gameLoop() 
{
    draw();
    requestAnimationFrame(gameLoop);
}

// Handle keyboard input
document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowUp') {
		rightPaddleY -= 40;
    } 
	else if (event.key === 'ArrowDown') {
		rightPaddleY += 40;
    }
	if (event.key === 'w') {
		leftPaddleY -= 40;
    } 
	else if (event.key === 's') {
		leftPaddleY += 40;
    }
	
});

// Start the game loop
gameLoop();