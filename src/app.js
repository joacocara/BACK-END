const express = require('express');
const fs = require('fs'); // Importa el módulo fs
const handlebars = require('express-handlebars');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path'); // Importa el módulo path para manejar rutas de archivos
const PORT = 3000;

const app = express();

const server = http.createServer(app); // Crea el servidor HTTP con Express.

// Configura Socket.IO en el servidor HTTP.
const io = socketIo(server);

// Middleware para manejar JSON y datos codificados en la URL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configura Handlebars como motor de plantillas
const hbs = handlebars.create(); // Utiliza handlebars.create() para crear una instancia de Handlebars
app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    try {
        const products = JSON.parse(fs.readFileSync(__dirname + '/Desafio/products.json', 'utf-8'));
        res.render('home', {
            products,
            titulo: 'home page'
        });
    } catch (error) {
        console.error('Error al leer el archivo JSON:', error);
        res.status(500).send('Error interno del servidor');
    }
})

// Manejo de la conexión de WebSocket
io.on('connection', (socket) => {
    console.log('Cliente conectado');

    // Lógica de WebSocket aquí
});

server.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});
