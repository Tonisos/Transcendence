const canvas = document.getElementById('pongCanvas');
        const context = canvas.getContext('2d');

        // Paddle and ball properties
        const paddleWidth = 10;
        const paddleHeight = 100;
        let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
        let rightPaddleY = canvas.height / 2 - paddleHeight / 2;
        const ballSize = 10;
        let ballX = canvas.width / 2;
        let ballY = canvas.height / 2;
        let ballSpeedX = 5;
        let ballSpeedY = 5;

        function draw() {
    var context = canvas.getContext('2d');
    
    // Draw field
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw middle line
    context.strokeStyle = 'white';
	context.lineWidth = 5;	
    context.beginPath();
    context.moveTo(canvas.width / 2, 0);
    context.lineTo(canvas.width / 2, canvas.height);
    context.stroke();
	context.lineWidth = 1;

    // Draw players
    context.fillStyle = 'white';
    context.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
    context.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);

    // Draw ball
    context.beginPath();
    context.fillStyle = 'red';
    context.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    context.fill();

    // Move the ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Bounce off top and bottom walls
    if (ballY - ballSize < 0 || ballY + ballSize > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Bounce off paddles
    if (
        (ballX - ballSize < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) ||
        (ballX + ballSize > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight)
    ) {
        ballSpeedX = -ballSpeedX;
    }

    // Move right paddle based on the ball's position
    if (ballY > rightPaddleY + paddleHeight / 2) {
        rightPaddleY += 5;
    } else {
        rightPaddleY -= 5;
    }

    // Prevent paddles from going out of bounds
    leftPaddleY = Math.max(0, Math.min(leftPaddleY, canvas.height - paddleHeight));
    rightPaddleY = Math.max(0, Math.min(rightPaddleY, canvas.height - paddleHeight));
}


        function gameLoop() {
            draw();
            requestAnimationFrame(gameLoop);
        }

        // Handle keyboard input
        document.addEventListener('keydown', function (event) {
            if (event.key === 'ArrowUp') {
                leftPaddleY -= 40;
            } else if (event.key === 'ArrowDown') {
                leftPaddleY += 40;
            }
        });

        // Start the game loop
        gameLoop();