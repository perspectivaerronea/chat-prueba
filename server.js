const express = require('express')
const { Server: IOServer } = require('socket.io');
const { Server: HttpServer } = require('http');

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)


// Indicamos que queremos cargar los archivos estáticos que se encuentran en dicha carpeta
app.use(express.static('./public'))
// Esta ruta carga nuestro archivo index.html en la raíz de la misma
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
})
// El servidor funcionando en el puerto 3000
httpServer.listen(8080, () => console.log('SERVER ON'))

const messages = [
    { author: "Juan", text: "¡Hola! ¿Que tal?" },
    { author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
    { author: "Ana", text: "¡Genial!" }
 ];

 io.on('connection', function(socket) {
    console.log('Un cliente se ha conectado');
    socket.emit('messages', messages);

    socket.on('new-message',data => {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });

});
