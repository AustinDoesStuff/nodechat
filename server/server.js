const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '..', '/public');
const port = process.env.PORT || 3000

const {generateMessage} = require('./utils/message');

var app = express();
app.use(express.static(publicPath));

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.emit('newMessage', generateMessage('admin', 'New user joined'));

    socket.broadcast.emit('newMessage', generateMessage('admin', 'Welcome new user'));


    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('createMessage', (message) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
            
        // });
    });
});

app.get('', (req, res) => {
    res.render('index.html');
});

server.listen(port, () => {
    console.log(`Running on ${port}`);
});