const canvas = document.getElementById('snake')
const context = canvas.getContext('2d')

const background = new Image()
background.src = './img/background.png'

const food = new Image()
food.src = './img/apply.png'

const box = 32
let score = 0
let bestScore = 0
let dir
let speedGame = 1

let apply = {
    x: 0,
    y: 0
}

const snake = {
    x: 8 * box,
    y: 10 * box,
    dx: box,
    dy: 0,
    tails: [],
    maxTails: 3
}

function drawGame() {

    context.drawImage(background, 0, 0)

    context.drawImage(food, apply.x, apply.y)

    snake.x += snake.dx
    snake.y += snake.dy

    collisionBorder()

    snake.tails.unshift({
        x: snake.x,
        y: snake.y
    })

    if (snake.tails.length > snake.maxTails) {
        snake.tails.pop()
    }

    snake.tails.forEach((item, index) => {
        if (index === 0) {
            context.fillStyle = 'red'
        } else {
            context.fillStyle = 'green'
        }
        context.fillRect(item.x, item.y, box - 1, box - 1)

        if (item.x === apply.x && item.y === apply.y) {
            snake.maxTails++
            score++

            localStorage.setItem('bestScore', score)

            switch (score) {
                case 10:
                    speedGame += 0.05
                case 20:
                    speedGame += 0.05
                case 30:
                    speedGame += 0.05
                case 40:
                    speedGame += 0.05
            }
            clearInterval(game)
            game = setInterval(drawGame, 100 / speedGame)

            randomPositionApply()
        }

        for (let i = index + 1; i < snake.tails.length; i++) {
            if (item.x === snake.tails[i].x && item.y === snake.tails[i].y) {
                refreshGame()
            }
        }
    })

    context.fillStyle = 'white'
    context.font = '50px Arial'
    context.fillText(score, box * 2.5, box * 1.7)

    context.fillStyle = 'white'
    context.font = '50px Arial'
    context.fillText(`best: ${bestScore}`, box * 5, box * 1.7)
}

function collisionBorder() {
    if (snake.x < box) {
        snake.x = canvas.width - box * 2
    } else if (snake.x > canvas.width - box * 2) {
        snake.x = box
    } else if (snake.y < 3 * box) {
        snake.y = canvas.height - box * 2
    } else if (snake.y > canvas.height - box * 2) {
        snake.y = 3 * box
    }
}

function randomPositionApply() {
    apply = {
        x: Math.floor((Math.random() * 17) + 1) * box,
        y: Math.floor((Math.random() * 15) + 3) * box
    }

}
randomPositionApply()

function refreshGame() {
    if(score > bestScore) {
        bestScore = localStorage.getItem('bestScore')
    } 
    score = 0
    
    snake.x = 8 * box
    snake.y = 10 * box
    snake.tails = []
    snake.maxTails = 3
    snake.dx = box
    snake.dy = 0

    speedGame = 1
    clearInterval(game)
    game = setInterval(drawGame, 100 / speedGame)

    randomPositionApply()
}

document.addEventListener('keydown', (event) => {
    if (event.keyCode === 37 && dir !== 'right') {
        dir = 'left'
        snake.dx = -box
        snake.dy = 0
    } else if (event.keyCode === 38 && dir !== 'down') {
        dir = 'up'
        snake.dx = 0
        snake.dy = -box
    } else if (event.keyCode === 39 && dir !== 'left') {
        dir = 'right'
        snake.dx = box
        snake.dy = 0
    } else if (event.keyCode === 40 && dir !== 'up') {
        dir = 'down'
        snake.dx = 0
        snake.dy = box
    }
})

window.onload = () => localStorage.getItem('bestScore')
let game = setInterval(drawGame, 100 / speedGame)

// 1. не работает сброс при столкновение змейки со своим телом +
// 2. нужно уменьшить скорость змейки +
// 3. яблоко появляеться внутри самой змейки +
// 4. сделать лучший ран -
// 5. сделать ооп - 