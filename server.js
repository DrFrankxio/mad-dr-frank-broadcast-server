const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Servir archivos estáticos (por ejemplo, un index.html)
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');

  // Escuchar mensajes del cliente
  socket.on('mensaje', (msg) => {
    console.log('Mensaje recibido:', msg);

    // Broadcast a todos los demás usuarios
    socket.broadcast.emit('mensaje', msg);
  });

  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
