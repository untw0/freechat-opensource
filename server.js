const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

let users = [];

// Serve arquivos estáticos (HTML, CSS)
app.use(express.static('public'));

// Quando um novo usuário se conecta
io.on('connection', (socket) => {
    console.log('Novo usuário conectado');

    // Recebe o nome do usuário logado
    socket.on('login', (username) => {
        users.push({ id: socket.id, username });
        io.emit('updateUserList', users);
    });

    // Quando um usuário se desconecta
    socket.on('disconnect', () => {
        users = users.filter(user => user.id !== socket.id);
        io.emit('updateUserList', users);
        console.log('Usuário desconectado');
    });

    // Recebe e retransmite mensagens do chat
    socket.on('sendMessage', (data) => {
        io.emit('newMessage', data);
    });
});

server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
