const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// io.use((socket, next) => {
//     next();
// });

io.on("connection", (socket) => {
    console.log(socket.id);
    console.log(socket.connected)

    socket.on('message-send', ({ name, message }) => {
        console.log("ff")
        io.emit('message-show', { name, message })
    })
    
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});


http.listen(4000, function() {
  console.log('listening on port 4000')
})