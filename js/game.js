class Canvas {
    constructor() {
        this.element = document.getElementById('snake')
        this.context = this.element.getContext('2d')

        this.background = new Image()
        this.background.src = './img/background.png'
    }

    draw() {
        this.context.drawImage(this.background, 0, 0)
    }
}

class Config {
    constructor() {
        this.box = 32
        this.speedGame = 1
    }
}

class Apply {
    constructor() {
        this.x = 0
        this.y = 0
        this.canvas = canvas.context
        this.config = config.box

        this.food = new Image()
        this.food.src = './img/apply.png'

        this.randomPositionApply()
    }

    draw() {
        this.canvas.drawImage(this.food, this.x, this.y)
    }

    randomPositionApply() {
        this.x = Math.floor((Math.random() * 17) + 1) * this.config
        this.y = Math.floor((Math.random() * 15) + 3) * this.config
    }
}

class Snake {
    constructor() {
        this.x = 8 * 32
        this.y = 10 * 32
        this.dx = 32
        this.dy = 0
        this.tails = []
        this.maxTails = 3

        this.canvas = canvas.context
    }

    updata() {
        this.x += this.dx
        this.y += this.dy

        this.tails.unshift({
            x: this.x,
            y: this.y
        })
    
        if (this.tails.length > this.maxTails) {
            this.tails.pop()
        }
    }   

    draw() {
        this.tails.forEach((item, index) => {
            if (index === 0) {
                this.canvas.fillStyle = 'red'
            } else {
                this.canvas.fillStyle = 'green'
            }
            this.canvas.fillRect(item.x, item.y, 32 - 1, 32 - 1)
        })
    }
}

class Game {
    constructor() {
    }

    updata() {
        snake.updata()
    }

    draw() {
        canvas.draw()
        apply.draw()
        snake.draw()
    }
}
let canvas = new Canvas()
let config = new Config()
let apply = new Apply()
let snake = new Snake()

const game = new Game()

let gameLoop = setInterval(game.draw, 100)