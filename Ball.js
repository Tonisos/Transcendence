// pass ball properties in js to use them

const INITIAL_VELOCITY = 0.05
const VELOCITY_INCREASE = 0.00001

export default class Ball {
	constructor(ballElem) {
		// common pattern to make properties accessible throughout the class
		this.ballElem = ballElem
		this.reset()
	}

	// get CSS properties
	get x() {
		// getComputedStyle(this.ballElem) -> object with all css properties
		return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"))
	}
	get y() {
		// getComputedStyle(this.ballElem) -> object with all css properties
		return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"))
	}

	set x(value) {
		this.ballElem.style.setProperty("--x", value)
	}
	set y(value) {
		this.ballElem.style.setProperty("--y", value)
	}

	rect() {
		// get all position info on the element (top, bottom, left, right)
		return this.ballElem.getBoundingClientRect()
	}

	// set default ball values
	reset() {
		// properties of the object, available throughout the instance
		this.x = 50
		this.y = 50
		// unit vector, direction (x & y <= 1)
		this.direction = {x: 50, y: 50}

		// ensure direction is mostly sideways for the game to be fun
		// abs because can be launched to right or left
		while (
			Math.abs(this.direction.x) <= .2 ||
			Math.abs(this.direction.x) >= .8
			) {
			// create a direction between 0 and 2 PI
			const heading = randomNumberBetween (0, 2 * Math.PI);
			// convert the direction in unit vector
			this.direction = {x: Math.cos(heading), y: Math.sin(heading)}
		}

		this.velocity = INITIAL_VELOCITY

		console.log(this.direction)
	}

	// function
	update(delta, paddleRects) {
		// * delta = time between frames
		this.x += this.direction.x * this.velocity * delta
		this.y += this.direction.y * this.velocity * delta
		this.velocity += VELOCITY_INCREASE * delta


		const rect = this.rect()
		// out of bound in x-axis
		if (rect.bottom >= window.innerHeight || rect.top <= 0) {
			this.direction.y *= -1
		}
		// check for all paddles (r) if collide with ball (rect)
		if (paddleRects.some(r => isCollision(r, rect))) {
			this.direction.x *= -1
		}
	}
}

function randomNumberBetween(min, max)
{
	return Math.random() * (max - min) + min
}

//if any collision return true
function isCollision(rect1, rect2) {
	return (
		rect1.left <= rect2.right &&
		rect1.right >= rect2.left &&
		rect1.top <= rect2.bottom &&
		rect1.bottom >= rect2.top
	)
}