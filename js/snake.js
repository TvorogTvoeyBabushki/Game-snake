const canvas = document.getElementById('snake')
const context = canvas.getContext('2d')

const background = new Image()
background.src = './img/background.png'

const food = new Image()
food.src = './img/apply.png'

const box = 32

let count = 0
let score = 0
let dir

let apply = {
    x: Math.floor((Math.random() * 17) + 1) * box,
    y: Math.floor((Math.random() * 15) + 3) * box
}

const snake = []
snake[0] = {
    x: 9 * box,
    y: 10 * box,
    dx: box, 
    dy: 0
}

function drawGame() {
    requestAnimationFrame(drawGame)

    if (++count < 4) {
        return;
    }

    count = 0;

    context.drawImage(background, 0, 0)

    context.drawImage(food, apply.x, apply.y)

    snake.forEach((item, index) => {
        context.fillStyle = (index === 0) ? 'red' : 'green'
        context.fillRect(item.x, item.y, box - 1, box - 1)
    })

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if (snakeX === apply.x && snakeY === apply.y) {
        score++
        apply = {
            x: Math.floor((Math.random() * 17) + 1) * box,
            y: Math.floor((Math.random() * 15) + 3) * box
        }
    } else {
        snake.pop()
    }

    if (dir === 'left') snakeX -= box
    if (dir === 'right') snakeX += box
    if (dir === 'up') snakeY -= box
    if (dir === 'down') snakeY += box

    if (snakeX < box) {
        snakeX = canvas.width - box * 2
    } else if (snakeX > canvas.width - box * 2) {
        snakeX = box
    } else if (snakeY < 3 * box) {
        snakeY = canvas.height - box * 2
    } else if (snakeY > canvas.height - box * 2) {
        snakeY = 3 * box
    }

    const newHead = {
        x: snakeX,
        y: snakeY
    }

    eatTail(newHead, snake)

    snake.unshift(newHead)

    context.fillStyle = 'white'
    context.font = '50px Arial'
    context.fillText(score, box * 2.5, box * 1.7)
}

function eatTail(head, arr) {
    arr.forEach(item => {
        if (head.x === item.x && head.y === item.y) {
            snake.x = 9 * box
            snake.y = 10 * box
            apply = {
                x: Math.floor((Math.random() * 17) + 1) * box,
                y: Math.floor((Math.random() * 15) + 3) * box
            }
        }
    })
}

document.addEventListener('keydown', (event) => {
    if (event.keyCode === 37 && dir !== 'right') {
        dir = 'left'
    } else if (event.keyCode === 38 && dir !== 'down') {
        dir = 'up'
    } else if (event.keyCode === 39 && dir !== 'left') {
        dir = 'right'
    } else if (event.keyCode === 40 && dir !== 'up') {
        dir = 'down'
    }
})

let game = setInterval(requestAnimationFrame(drawGame), 100)

// 1. не работает сброс при столкновение змейки со своим телом
// 2. нужно уменьшить скорость змейки
// 3. 