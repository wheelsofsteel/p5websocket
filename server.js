var express = require("express");
var app = express();
var socket = require('socket.io');
var server = app.listen(process.env.PORT || 3000);
console.log("Running on port 3000");
app.use(express.static('public'));

app.get("/", function(req, res) {
    res.render('index.html');
})

var io = socket(server);

function newConnection(socket) {
    io.sockets.emit('userConnect', io.engine.clientsCount);
    socket.on('mouse', mouseMsg);

    socket.on('disconnect', function() {
        io.sockets.emit('userConnect', io.engine.clientsCount);
    });

    function mouseMsg(data) {
        socket.broadcast.emit('mouse', data);
        console.log(data);
    }
}

io.sockets.on('connect', newConnection);
