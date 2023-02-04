export default class InputHandler {
    constructor(game) {
        this.game = game
        this.keys = []
        window.addEventListener('keydown', (e) => {
            if ((   e.key === 's' ||
                    e.key === 'w' ||
                    e.key === 'a' ||
                    e.key === 'd' ||
                    e.key === 'S' ||
                    e.key === 'W' ||
                    e.key === 'A' ||
                    e.key === 'D' ||
                    e.key === 'Shift') && !this.keys.includes(e.key)) {
                this.keys.push(e.key)
            } else if (e.key === 'q')
                this.game.debug = !this.game.debug
            else if (e.key === 'r' && this.game.gameOver) {
                this.game.restart()
            }
        })
        window.addEventListener('keyup', (e) => {
            switch (e.key) {
                case 's':
                case 'S':
                    if (this.keys.includes('s'))
                        this.keys.splice(this.keys.indexOf('s'), 1)
                    if (this.keys.includes('S'))
                        this.keys.splice(this.keys.indexOf('S'), 1)
                    break
                case 'a':
                case 'A':
                    if (this.keys.includes('a'))
                        this.keys.splice(this.keys.indexOf('a'), 1)
                    if (this.keys.includes('A'))
                        this.keys.splice(this.keys.indexOf('A'), 1)
                    break
                case 'w':
                case 'W':
                    if (this.keys.includes('w'))
                        this.keys.splice(this.keys.indexOf('w'), 1)
                    if (this.keys.includes('W'))
                        this.keys.splice(this.keys.indexOf('W'), 1)
                    break
                case 'd':
                case 'D':
                    if (this.keys.includes('d'))
                        this.keys.splice(this.keys.indexOf('d'), 1)
                    if (this.keys.includes('D'))
                        this.keys.splice(this.keys.indexOf('D'), 1)
                    break

            }
            if ((e.key === 'Shift')) {
                if (this.keys.includes(e.key)) {
                    this.keys.splice(this.keys.indexOf(e.key), 1)
                }
            }
        })
    }
}