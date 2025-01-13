const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Crear la aplicación de Express
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Servir archivos estáticos (como HTML, CSS, JS)
app.use(express.static('public'));

// Configurar el evento de conexión de Socket.IO
io.on('connection', (socket) => {
    console.log('Nuevo usuario conectado');

    // Escuchar mensajes del cliente
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Emitir el mensaje a todos los clientes conectados
    });

    // Evento de desconexión
    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

// Configurar el puerto
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
