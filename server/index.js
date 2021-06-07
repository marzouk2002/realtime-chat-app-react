const app = require('express')()

const http = require('http').createServer(app)

const io = require('socket.io')(http)

io.on('connection', socket => {
    socket.on('message', ({home, message}) => {
        io.emit('message', {home, message})
    })
})

http.listen(4000, () => {
    console.log('Server running on PORT: 4000')
})