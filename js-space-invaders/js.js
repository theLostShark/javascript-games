//VARIABLES
const grid = document.querySelector('.grid')
const resultDisplay = document.querySelector('.score')
let currentShooterIndex = 202
const width = 15
const alienRemoved = []
let invadersId
let isGoingRight = true
let direction = 1
let results = 0


// CREATE GRID DIVS
for (let i = 0; i < width * width; i++) {
  const square = document.createElement('div')
  grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))


// ALIENS STARTING POSITIONS (10 in each row)
const alienInvaders = [
  0,1,2,3,4,5,6,7,8,9,
  15,16,17,18,19,20,21,22,23,24,
  30,31,32,33,34,35,36,37,38,39
]

// DRAW ALIENS
function draw() {
  for (let i = 0; i < alienInvaders.length; i++) {
    if (!alienRemoved.includes(i)) {
      squares[alienInvaders[i]].classList.add('invaders')
    }
  }
}
draw()

// REMOVE ALIENS
function removeAliens() {
  for (let i = 0; i < alienInvaders.length; i++) {
    squares[alienInvaders[i]].classList.remove('invaders')
  }
}

// SPACESHIP
squares[currentShooterIndex].classList.add('spaceship')

// MOVE SPACESHIP
function moveSpaceship(e) {
  squares[currentShooterIndex].classList.remove('spaceship')
  switch (e.key) {
    case "ArrowLeft":
      if (currentShooterIndex % width !== 0) currentShooterIndex -= 1
      break
    case "ArrowRight":
      if (currentShooterIndex % width !== width - 1) currentShooterIndex += 1
      break
  }
  squares[currentShooterIndex].classList.add('spaceship')
}
document.addEventListener('keydown', moveSpaceship)

// MOVE ALIENS
function moveAliens() {
  const atLeftEdge = alienInvaders.some(i => i % width === 0)
  const atRightEdge = alienInvaders.some(i => i % width === width - 1)

  removeAliens()

  if (atRightEdge && isGoingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width
    }
    direction = -1
    isGoingRight = false
  }

  if (atLeftEdge && !isGoingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width
    }
    direction = 1
    isGoingRight = true
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i] += direction
  }

  draw()

  // GAME OVER
  if (squares[currentShooterIndex].classList.contains('invaders')) {
    resultDisplay.innerHTML = "GAME OVER"
    clearInterval(invadersId)
  }

  // YOU WIN
  if (alienRemoved.length === alienInvaders.length) {
    resultDisplay.innerHTML = "YOU WIN"
    clearInterval(invadersId)
  }
}

invadersId = setInterval(moveAliens, 600)

// SHOOT
function shoot(e) {
  if (e.key !== "ArrowUp") return

  let laserId
  let currentLaserIndex = currentShooterIndex

  function moveLaser() {
    squares[currentLaserIndex].classList.remove('laser')
    currentLaserIndex -= width
    if (currentLaserIndex < 0) {
      clearInterval(laserId)
      return
    }
    squares[currentLaserIndex].classList.add('laser')

    if (squares[currentLaserIndex].classList.contains('invaders')) {
      squares[currentLaserIndex].classList.remove('laser')
      squares[currentLaserIndex].classList.remove('invaders')
      squares[currentLaserIndex].classList.add('boom')

      setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 300)

      const alienIndex = alienInvaders.indexOf(currentLaserIndex)
      if (alienIndex !== -1 && !alienRemoved.includes(alienIndex)) {
        alienRemoved.push(alienIndex)
      }

      results++
      resultDisplay.innerHTML ="Score: " + results
      clearInterval(laserId)
    }
  }

  laserId = setInterval(moveLaser, 100)
}

document.addEventListener('keydown', shoot)
