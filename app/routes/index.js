const app = require('../../config/server')

const Routes = require('express').Router()
const mongoose = require('mongoose')

require('../models/players')
const players = mongoose.model('players')

Routes.get('/404', (res, req) => {
    res.send('ERROR 404')
})

Routes.get('/', (req, res) => {
    players.find().sort({score: 'desc'}).then((score) => {
        res.render('home', {score: score})
    }).catch((err) => {
        console.log(err)
    })

    app.get('io').on('connection', (socket) => {
        socket.on('gameover', (player) => {
            const Newplayer = {
                name: player.name,
                score: player.score
            }
        
            new players(Newplayer).save().then(() => {
                res.redirect('/')
            }).catch(() => {
                res.redirect('/404')
            })
        })
    })
    
})

Routes.get('/register', (req, res) => {
    
})

module.exports = Routes;