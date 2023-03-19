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
const canvas = new Canvas()
let game = setInterval(canvas, 100)