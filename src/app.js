const express = require('express');
const fs = require('fs');
const handlebars = require('express-handlebars');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const PORT = 3000;

const app = express();

const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const hbs = handlebars.create();
app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

const productos = [
    {
        "id": 1,
        "title": "mesa",
        "description": "cuadrada",
        "price": 500,
        "status": true,
        "thumbnail": "foto1",
        "category": "Categoría 1",
        "code": "0001",
        "stock": 123
      },
      {
        "id": 2,
        "title": "mate",
        "description": "redondo",
        "price": 250,
        "status": true,
        "thumbnail": "foto2",
        "category": "Categoría 1",
        "code": "0002",
        "stock": 321
      },
      {
        "id": 4,
        "title": "cargador",
        "description": "rosa",
        "price": 700,
        "status": true,
        "thumbnail": "foto4",
        "category": "Categoría 1",
        "code": "0004",
        "stock": 300
      },
      {
        "id": 5,
        "title": "pc",
        "description": "verde",
        "price": 10500,
        "status": true,
        "thumbnail": "foto5",
        "category": "Categoría 1",
        "code": "0005",
        "stock": 750
      },
      {
        "id": 6,
        "title": "patineta",
        "description": "gris",
        "price": 8500,
        "status": true,
        "thumbnail": "foto6",
        "category": "Categoría 1",
        "code": "0006",
        "stock": 650
      },
      {
        "id": 7,
        "title": "alfombra",
        "description": "negra",
        "price": 3000,
        "status": true,
        "thumbnail": "foto7",
        "category": "Categoría 1",
        "code": "0007",
        "stock": 900
      },
      {
        "id": 8,
        "title": "mouse",
        "description": "negra",
        "price": 15000,
        "status": true,
        "thumbnail": "foto8",
        "category": "Categoría 1",
        "code": "0008",
        "stock": 699
      },
      {
        "id": 9,
        "title": "teclado",
        "description": "negra",
        "price": 25000,
        "status": true,
        "thumbnail": "foto9",
        "category": "Categoría 1",
        "code": "0009",
        "stock": 799
      },
      {
        "id": 10,
        "title": "auriculares",
        "description": "negra",
        "price": 70000,
        "status": true,
        "thumbnail": "foto10",
        "category": "Categoría 1",
        "code": "0010",
        "stock": 392
      },
      {
        "id": 11,
        "title": "pad",
        "description": "negra",
        "price": 120,
        "status": true,
        "thumbnail": "foto11",
        "category": "Categoría 1",
        "code": "0011",
        "stock": 5
      }
]; // Supongo que tienes una fuente de datos para los productos

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
});

app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {
        products: productos, // Usamos la fuente de datos de productos
        titulo: 'Productos en Tiempo Real'
    });
});



io.on('connection', (socket) => {
    console.log('Cliente conectado');

    socket.on('updateProducts', (producto) => {
        io.emit('updateProducts', producto);
        console.log('Productos actualizados:', producto); // Agrega este console.log
    });

    // Escucha el evento para agregar un producto
    socket.on('addProduct', (productData) => {
        const newProduct = {
            id: productos.length + 1, // Asigna un nuevo ID, por ejemplo
            title: productData.title,
            // Agrega otros campos del producto según tus necesidades
        };
        productos.push(newProduct);
        io.emit('updateProducts', productos); // Emite la lista actualizada de productos
    });

    // Escucha el evento para eliminar un producto
    socket.on('deleteProduct', (productId) => {
        const index = productos.findIndex((product) => product.id === productId);
        if (index !== -1) {
            productos.splice(index, 1);
            io.emit('updateProducts', productos); // Emite la lista actualizada de productos
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});
