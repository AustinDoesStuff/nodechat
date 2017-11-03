const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '..', '/public');
const port = process.env.PORT || 3000

const {generateMessage, generateLocationMessage} = require('./utils/message');

var app = express();
app.use(express.static(publicPath));

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.broadcast.emit('newMessage', generateMessage('admin', 'New user joined'));

    socket.emit('newMessage', generateMessage('admin', 'Welcome new user'));


    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Internet', coords.latitude, coords.longitude));
    });
});

app.get('', (req, res) => {
    res.render('index.html');
});

server.listen(port, () => {
    console.log(`Running on ${port}`);
});