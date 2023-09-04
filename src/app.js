const express=require('express')
const productsRouter=require('../routes/products.router')
const cartsRouter=require('../routes/cart.router')
const handlebars = require( 'express-handlebars')
const PORT=3000

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars')


//app.use('/api/products',productsRouter)
//app.use('/api/carts',cartsRouter)

app.get('/', (req, res) => {
    
    let nombre = 'Joaquin'
    res.setHeader('Content-Type','text/html')
    res.status(200).render('home', {
        nombre,
        titulo: 'home page'
    });
    
    
});



const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`)
})