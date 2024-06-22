// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname + '/public'));

// Socket.IO logic
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle joining game room
    socket.on('joinGame', () => {
        socket.join('game-room');
        console.log('User joined game room');
    });

    // Handle move
    socket.on('move', (data) => {
        socket.to('game-room').emit('move', data);
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
