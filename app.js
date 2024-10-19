// app.js

import { helpCommand } from './comandos/help.js';
import { roletaCommand } from './comandos/roleta.js';

function handleCommand(command) {
    switch(command) {
        case '/help':
            displayMessage(helpCommand());
            break;
        case '/roleta':
            displayMessage(roletaCommand());
            break;
        default:
            const currentTime = new Date();
            const hours = String(currentTime.getHours()).padStart(2, '0');
            const minutes = String(currentTime.getMinutes()).padStart(2, '0');
            const seconds = String(currentTime.getSeconds()).padStart(2, '0');
            const timeString = `[${hours}:${minutes}:${seconds}]`;
            
            const errorMessage = `${timeString} console | Comando desconhecido: ${command}`;
            displayMessage(errorMessage);
    }
}

function displayMessage(message) {
    const messageContainer = document.getElementById("messages");
    const newMessage = document.createElement("div");
    newMessage.classList.add("message");
    newMessage.textContent = message;
    messageContainer.appendChild(newMessage);
    
    // Manter o scroll no final
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

function sendMessage() {
    const input = document.getElementById("messageInput");
    const message = input.value.trim();

    if (message) {
        if (message.startsWith('/')) {
            handleCommand(message);
        } else {
            const currentTime = new Date();
            const hours = String(currentTime.getHours()).padStart(2, '0');
            const minutes = String(currentTime.getMinutes()).padStart(2, '0');
            const seconds = String(currentTime.getSeconds()).padStart(2, '0');
            const timeString = `[${hours}:${minutes}:${seconds}]`;

            const data = {
                time: timeString,
                username: username,
                message: message
            };

            socket.emit('sendMessage', data);
        }
        input.value = '';
    }
}
