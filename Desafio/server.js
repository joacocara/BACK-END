const express = require('express')
const app = express()
const port = 8080

// Importar la clase ProductManager
const ProductManager = require('./3er-desafio')
 // Asegúrate de que la ruta sea correcta

// Crear una instancia de ProductManager
const productManager = new ProductManager()

// Middleware para manejar el cuerpo de solicitudes JSON
app.use(express.json())

// Ruta para obtener todos los productos
app.get('/products', async (req, res) => {
  try {
    const products = await productManager.getProducts()
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos.' })
  }
})

// Ruta para obtener un producto por su ID
app.get('/products/:id', async (req, res) => {
  const { id } = req.params
  try {
    const product = await productManager.getProductById(parseInt(id))
    res.json(product)
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado.' })
  }
})

// Ruta para agregar un nuevo producto
app.post('/products', async (req, res) => {
  const { title, description, price, thumbnail, stock } = req.body
  try {
    await productManager.addProduct(title, description, price, thumbnail, stock)
    res.status(201).json({ message: 'Producto agregado con éxito.' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Ruta para actualizar un producto por su ID
app.put('/products/:id', async (req, res) => {
  const { id } = req.params
  const updates = req.body
  try {
    await productManager.updateProduct(parseInt(id), updates)
    res.json({ message: 'Producto actualizado con éxito.' })
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado.' })
  }
})

// Ruta para eliminar un producto por su ID
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params
  try {
    await productManager.deleteProduct(parseInt(id))
    res.json({ message: 'Producto eliminado con éxito.' })
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado.' })
  }
})

// Ruta para obtener los primeros 5 productos
app.get('/products', async (req, res) => {
  try {
    let limit = parseInt(req.query.limit)
    if (isNaN(limit) || limit <= 0) {
      limit = 5
    }
    const products = await productManager.getProducts().slice(0, limit)
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos.' })
  }
})


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${port}`)
})
