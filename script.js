// default export
import Ball from './Ball.js'
import Paddle from './Paddle.js'

// Logic : separating the functionality related to the ball
// (manipulating a DOM element representing a ball) into a class called Ball
// and then instantiating this class to create and work with specific ball
// elements on the web page.
// This approach promotes modularity and encapsulation, making the code more
// maintainable and organized.
const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")


let lastTime
// creates an infinite loop
function update(time) {
	if (lastTime != null) {
		// delta is needed to see how much time had gone since last refresh
		// helps smoothen the game
		const delta = time - lastTime

		ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
		computerPaddle.update(delta, ball.y)
		const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))
		document.documentElement.style.setProperty("--hue", hue + delta * 0.01)

		if (isLose()) handleLose()
	}
	lastTime = time
	window.requestAnimationFrame(update)
}

function handleLose() {
	updateScore()
	ball.reset()
	computerPaddle.reset()
}

function updateScore () {
	const ballRect = ball.rect()
	if (ballRect.right >= window.innerWidth) {
		playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
	}
	else {
		computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
	}
}


// return a bool
function isLose() {
	const ballRect = ball.rect()
	return ballRect.right >= window.innerWidth || ballRect.left <= 0
}

document.addEventListener("mousemove", e=> {
	// set paddle by converting pixel in vh
	playerPaddle.position = (e.y / window.innerHeight) * 100
})

// when something can change on the screen it will call the function
window.requestAnimationFrame(update)