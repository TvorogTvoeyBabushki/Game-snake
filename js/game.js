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
    }

    _speedGame = 1

    get speedGame() {
        return this._speedGame
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
        this.x = 8 * config.box
        this.y = 10 * config.box
        this.dx = config.box
        this.dy = 0
        this.tails = []
        this.maxTails = 3
        this.dir = 'right'

        this.updata()
        this.control()
    }

    updata() {
        setTimeout(this.updata.bind(this), 100 / config._speedGame)

        this.x += this.dx
        this.y += this.dy

        if (this.x < config.box) {
            this.x = canvas.element.width - config.box * 2
        } else if (this.x > canvas.element.width - config.box * 2) {
            this.x = config.box
        } else if (this.y < 3 * config.box) {
            this.y = canvas.element.height - config.box * 2
        } else if (this.y > canvas.element.height - config.box * 2) {
            this.y = 3 * config.box
        }

        this.tails.unshift({
            x: this.x,
            y: this.y
        })

        if (this.tails.length > this.maxTails) {
            this.tails.pop()
        }

        this.tails.forEach((item, index) => {
            if (item.x === apply.x && item.y === apply.y) {
                this.maxTails++
                score._score++
    
                switch (score._score) {
                    case 10:
                        config._speedGame += 0.01
                    case 20:
                        config._speedGame += 0.01
                    case 30:
                        config._speedGame += 0.01
                    case 40:
                        config._speedGame += 0.01
                    case 50:
                        config._speedGame += 0.01
                }
                
                gameLoop = setInterval(game.draw, 100 / config._speedGame)
    
                apply.randomPositionApply()
            }

            for (let i = index + 1; i < this.tails.length; i++) {
                if (item.x === this.tails[i].x && item.y === this.tails[i].y) {
                    this.refreshGame()
                }
            }
        })
    }

    draw() {
        this.tails.forEach((item, index) => {
            if (index === 0) {
                canvas.context.fillStyle = 'red'
            } else {
                canvas.context.fillStyle = 'green'
            }
            canvas.context.fillRect(item.x, item.y, config.box - 1, config.box - 1)
        })
    }

    refreshGame() {
        if (score._score > score._bestScore) {
            localStorage.setItem('bestScore', score._score)
        }
        score._bestScore = Number(localStorage.getItem('bestScore'))
        score._score = 0
        this.dir = 'right'
    
        this.x = 8 * config.box
        this.y = 10 * config.box
        this.tails = []
        this.maxTails = 3
        this.dx = config.box
        this.dy = 0
    
        config._speedGame = 1
        clearInterval(gameLoop)
        gameLoop = setInterval(game.draw, 100 / config._speedGame)
    
        apply.randomPositionApply()

        alert('Game Over')
    }

    control() {
        document.addEventListener('keydown', (event) => {
            if (event.keyCode === 37 && this.dir !== 'right') {
                this.dir = 'left'
                this.dx = -config.box
                this.dy = 0
            } else if (event.keyCode === 38 && this.dir !== 'down') {
                this.dir = 'up'
                this.dx = 0
                this.dy = -config.box
            } else if (event.keyCode === 39 && this.dir !== 'left') {
                this.dir = 'right'
                this.dx = config.box
                this.dy = 0
            } else if (event.keyCode === 40 && this.dir !== 'up') {
                this.dir = 'down'
                this.dx = 0
                this.dy = config.box
            }
        })
    }
}

class Score {

    _score = 0
    _bestScore = 0

    get score() {
        return this._score
    }

    get bestScore() {
        return this._bestScore
    }

    draw() {
        canvas.context.fillStyle = 'white'
        canvas.context.font = '50px Arial'
        canvas.context.fillText(this._score, config.box * 2.5, config.box * 1.7)
    
        canvas.context.fillStyle = 'white'
        canvas.context.font = '50px Arial'
        canvas.context.fillText(`best: ${this._bestScore}`, config.box * 5, config.box * 1.7)
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
        score.draw()
    }
}
let canvas = new Canvas()
let config = new Config()
let apply = new Apply()
let snake = new Snake()
let score = new Score()

const game = new Game()

if (localStorage.getItem('bestScore')) {
    score._bestScore = Number(localStorage.getItem('bestScore'))
} else {
    score._bestScore = 0
}

let gameLoop = setInterval(game.draw, 100 / config._speedGame)