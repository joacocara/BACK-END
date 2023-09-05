const express=require('express')
const http = require('http')
const socketIo = require('socket.io')
const productsRouter=require('../routes/products.router')
const cartsRouter=require('../routes/cart.router')
const handlebars = require( 'express-handlebars')
const PORT=3000

const app=express()

const server = http.createServer(app) // Crea el servidor HTTP con Express.

// Configura Socket.IO en el servidor HTTP.
const io = socketIo(server)

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


//app.use('/api/products',productsRouter)
//app.use('/api/carts',cartsRouter)
//pp.use('/realtimeproducts',)

app.get('/', (req, res) => {
    
    let nombre = 'Joaquin'
    res.setHeader('Content-Type','text/html')
    res.status(200).render('home', {
        nombre,
        titulo: 'home page'
    })
})




server.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`)
})