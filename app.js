const PORT = process.env.PORT || 8089;
const app = require('./config/server');

// IO:
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.set('io', io)

const Routes = require('./app/routes/index')
app.use('/', Routes)

server.listen(PORT, () => {
    console.log('Server Runing at: ' + PORT);
});
