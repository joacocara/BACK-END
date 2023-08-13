class ProductManager {
    constructor() {
        this.Products = []
        this.nextProductId = 1 // Utilizar una variable para generar IDs únicos
    }

    addProduct(title, description, price, thumbnail, stock) {
        const code = this.nextProductId.toString().padStart(4, '0')

        const productExists = this.Products.some(
            product => product.title === title && product.code === code
        )

        if (productExists) {
            throw new Error(`Error: Ya existe un producto con el mismo título y código.`)
        }

        let nuevoProducto = {
            id: this.nextProductId, // Usar el ID único generado
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        this.Products.push(nuevoProducto)
        this.nextProductId++ // Incrementar el ID único
    }

    getProducts() {
        return this.Products
    }

    getProductById(id) {
        const product = this.Products.find(product => product.id === id)
        if (!product) {
            throw new Error(`Error: No se encontró ningún producto con el ID ${id}.`)
        }
        return product
    }
}

let manager = new ProductManager()

try {
    manager.addProduct('casa', 'mediana', 500, 'foto', 123, 500)
    manager.addProduct('auto', 'ford', 200, 'foto', 321, 300)
    manager.addProduct('edificio', 'gris', 9500, 'foto', 323, 100)
    manager.addProduct('mansion', 'roja', 9500, 'foto', 323, 100)


    const product = manager.getProductById(2)
    console.log("Producto encontrado:", product)

    const nonExistentProduct = manager.getProductById(5);
} catch (error) {
    console.error(error.message)
}
