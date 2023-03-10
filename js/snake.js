const canvas = document.getElementById('snake')
const context = canvas.getContext('2d')

const background = new Image()
background.src = './img/background.png'

const food = new Image()
food.src = './img/apply.png'

const box = 32

let score = 0
let dir

const apply = {
    x: Math.floor((Math.random() * 17) + 1) * box,
    y: Math.floor((Math.random() * 15) + 3) * box
}

const snake = []
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

function drawGame() {
    context.drawImage(background, 0, 0)

    context.drawImage(food, apply.x, apply.y)

    snake.forEach((item, index, arr) => {
        let snakeX = item.x
        let snakeY = item.y
    
        arr.pop()
    
        if(dir === 'left') snakeX -= box
        if(dir === 'right') snakeX += box
        if(dir === 'up') snakeY -= box
        if(dir === 'down') snakeY += box

        if(snakeX === 0) snakeX = 17 * box
    
        const newHead = {
            x: snakeX,
            y: snakeY
        }
    
        arr.unshift(newHead)

        context.fillStyle = 'green'
        context.fillRect(item.x, item.y, box, box)
    })

    context.fillStyle = 'white'
    context.font = '50px Arial'
    context.fillText(score, box * 2.5, box * 1.7)
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

let game = setInterval(drawGame, 100)