const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const player = new Schema({
    name: {
        type: String
    },
    score: {
        type: Number,
        default: 0
    }
})

mongoose.model('players', player)