const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

let users = [];

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Novo usuário conectado');

    socket.on('login', (username) => {
        users.push({ id: socket.id, username });
        io.emit('updateUserList', users);
    });

    socket.on('disconnect', () => {
        users = users.filter(user => user.id !== socket.id);
        io.emit('updateUserList', users);
        console.log('Usuário desconectado');
    });

    socket.on('sendMessage', (data) => {
        io.emit('newMessage', data);
    });
});

server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
