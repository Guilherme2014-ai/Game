const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.set('view engine', 'ejs')
app.set('views', './app/views')

app.use(express.static('./app/public'))
mongoose.connect('mongodb+srv://game:game@game.tzyzk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Mongoose connected with success !')
}).catch((err) => {
    console.log(err)
})

module.exports = app;