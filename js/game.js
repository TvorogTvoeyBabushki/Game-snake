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

class Apply {
    constructor(canvas) {
        this.x = 0
        this.y = 0
        this.canvas = canvas

        this.food = new Image()
        this.food.src = './img/apply.png'
    }

    draw(context) {
        context.drawImage(this.food, this.x, this.y)
    }
}

class Game {
    constructor() {
        this.canvas = new Canvas()
        this.apply = new Apply(this.canvas)
    }

    draw() {
        this.canvas.draw.bind(canvas)
        this.apply.draw(this.canvas.context)
    }
}

const game = new Game()

let gameLoop = setInterval(game.draw, 100)