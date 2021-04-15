var socket = io()

var nameP = String(window.prompt('Qual Seu Nome ?'))

var canvas, ctx, HEIGHT, WIDTH, speed = 1, frames = 0

var ground = {
    y: 550,
    height: 50,
    color: '#ffdf70',

    draw: function() {
        if (player.y+player.height == ground.y) {
            player.jumps = 0
        }

        ctx.fillStyle = this.color
        ctx.fillRect(0, this.y, WIDTH, this.height)
    }
}

var player = {
    y: 500,
    x: 50,
    height: 50,
    width: 50,
    color: 'red',

    gravityPower: 0.9,
    gravity: 0,

    JumpPower: 21,
    maxjumps: 2,
    jumps: 0,

    physics: function() {
        this.gravity += this.gravityPower
        this.y += this.gravity

        if (this.y+this.height > ground.y+3) {
            this.y = ground.y-this.height
        }
    },
    jump: function() {
        if (this.jumps < this.maxjumps) {
            this.jumps++    
            this.gravity = -this.JumpPower
        }else{}
    },
    draw: function() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

var obs = {
    speed: 5,
    _obs:[],

    gameOver: () => {
        socket.emit('gameover', {
            name: nameP,
            score: frames
        })
        alert('Perdeu !, Reinicie a pagina ;-;')
        onload()
    },
    
    insert: function() {
        this._obs.push({
            x: 600,
            width: 70,
            height: 50 + Math.floor(180 * Math.random()),
            color: `rgb(${Math.floor(255 * Math.random())}, ${Math.floor(255 * Math.random())}, ${Math.floor(255 * Math.random())})`
        })
    },

    collision: function() {
        this._obs.forEach(obs => {
            obs.x -= this.speed

            const topP = player.y
            const bottomP = player.y+player.height
            const frontplayer = player.x+player.width

            const obsY = (ground.y - obs.height)
            const backObs = obs.x
            const frontObs = obs.x+obs.width
            
            while(((topP || bottomP) > obsY) && ((frontplayer > backObs && frontplayer < frontObs) || (player.x > backObs && player.x < frontObs))) {
                this.gameOver()
            }
        });
    },

    draw: function() {
        this._obs.forEach(obs => {
            ctx.fillStyle = obs.color
            ctx.fillRect(obs.x, (ground.y - obs.height), obs.width, obs.height)
        });
    }
}

function framesF() {
    if (frames >= 2000) {
        return 800
    }
    if (frames >= 4000) {
        return 600
    }else{
        return 1000
    }
}

setInterval(() => {
    obs.insert()
}, framesF());

// Function's Game:

    function main() {
        // Width & Height:
            WIDTH = window.innerWidth
            HEIGHT = window.innerHeight

            if (WIDTH >= 500) {
                WIDTH = 600
                HEIGHT = 600
            }

            canvas = document.createElement('canvas')
            canvas.width = WIDTH
            canvas.height = HEIGHT
            ctx = canvas.getContext('2d')

            document.body.appendChild(canvas) // to add the element at: body --- (canvas)

            // Functions:
                document.body.addEventListener('click', () => {
                    player.jump()
                })

            run()
    }

    function run() {
        update()
        draw()

        window.requestAnimationFrame(run)
    }

    function update() {
        frames++

        player.physics()
        obs.collision()
    }

    function draw() {
        ctx.fillStyle = "#50beff"
        ctx.fillRect(0, 0, WIDTH, HEIGHT)

        ground.draw()
        player.draw()
        obs.draw()
    }

    // Start the Game:
        main()