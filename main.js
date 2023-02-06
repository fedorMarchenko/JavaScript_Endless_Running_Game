import Player from "./player.js"
import InputHandler from "./input.js"
import { Background } from "./background.js"
import { FlyingEnemy, ClimbingEnemy, GroundEnemy } from "./enemies.js"
import { UI } from "./UI.js"

window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d')
    canvas.width = 900
    canvas.height = 500

    class Game {
        constructor(width, height) {
            this.width = width
            this.height = height
            this.groundMargin = 80
            this.speed = 0
            this.maxSpeed = 3
            this.background = new Background(this)
            this.player = new Player(this)
            this.input = new InputHandler(this)
            this.UI = new UI(this)
            this.enemies = []
            this.particles = []
            this.collisions = []
            this.floatingMessage = []
            this.maxParticles = 50
            this.enemyTimer = 0
            this.enemyInterval = 1000
            this.debug = false
            this.score = 0
            this.winningScore = 20
            this.fontColor = 'black'
            this.time = 0
            this.maxTime = 30000
            this.gameOver = false
            this.lives = 5
            this.energy = 100
            this.player.currentState = this.player.states[0]
            this.player.currentState.enter()
        }
        update(deltaTime) {
            this.time += deltaTime
            // if (this.time > this.maxTime)
            //     this.gameOver = true
            this.background.update()
            this.player.update(this.input.keys, deltaTime)
            // handleEnemies
            if (this.enemyTimer > this.enemyInterval) {
                this.enemyTimer = 0
                this.addEnemy()
            } else {
                this.enemyTimer += deltaTime
            }
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime)
            })
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion)
            // handle messages
            this.floatingMessage.forEach(message => {
                message.update()
            })
            this.floatingMessage = this.floatingMessage.filter(message => !message.markedForDeletion)
            // handle particles
            this.particles.forEach((particle, index) => {
                particle.update()
            })
            this.particles = this.particles.filter(particle => !particle.markedForDeletion)
            if (this.particles.length > this.maxParticles) {
                this.particles = this.particles.slice(this.particles.length - this.maxParticles, this.particles.length)
            }
            // handle collision sprites
            this.collisions.forEach((collision, index) => {
                collision.update(deltaTime)
            })
            this.collisions = this.collisions.filter(collision => !collision.markedForDeletion)
        }
        draw(context) {
            this.background.draw(context)
            this.player.draw(context)
            this.enemies.forEach(enemy => {
                enemy.draw(context)
            })
            this.particles.forEach(particle => {
                particle.draw(context)
            })
            this.collisions.forEach(collision => {
                collision.draw(context)
            })
            this.floatingMessage.forEach(message => {
                message.draw(context)
            })
            this.UI.draw(context)
        }
        addEnemy() {
            if (this.speed > 0 && Math.random() < 0.5)
                this.enemies.push(new GroundEnemy(this))
            else if (this.speed > 0)
                this.enemies.push(new ClimbingEnemy(this))
            this.enemies.push(new FlyingEnemy(this))
        }
        restart() {
            this.speed = 0
            this.background.restart()
            this.player.restart()
            this.input.keys = []
            this.enemies = []
            this.particles = []
            this.collisions = []
            this.floatingMessage = []
            this.enemyTimer = 0
            this.debug = false
            this.score = 0
            this.time = 0
            this.gameOver = false
            this.lives = 5
            this.energy = 100
            this.player.currentState = this.player.states[0]
            this.player.currentState.enter()
            animate(lastTime)
        }
    }

    const game = new Game(canvas.width, canvas.height)
    let lastTime = 0

    function animate(timeStamp) {
        let deltaTime = timeStamp - lastTime
        lastTime = timeStamp
        if (deltaTime > 30)
            deltaTime = 30
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.update(deltaTime)
        game.draw(ctx)
        console.log(deltaTime)
        if (!game.gameOver)
            requestAnimationFrame(animate)
    }

    animate(0)
})