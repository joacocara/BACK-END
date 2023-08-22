const fs = require('fs').promises

class ProductManager {
    constructor() {
        this.Products = []
        this.nextProductId = 1
    }

    async loadProducts() {
        try {
            const data = await fs.readFile('products.json', 'utf-8')
            this.Products = JSON.parse(data)
            if (this.Products.length > 0) {
                this.nextProductId = this.Products[this.Products.length - 1].id + 1
            }
        } catch (error) {
            this.Products = []
            this.nextProductId = 1
        }
    }

    async saveProducts() {
        await fs.writeFile('products.json', JSON.stringify(this.Products, null, 2), 'utf-8')
    }

    async addProduct(title, description, price, thumbnail, stock) {
        await this.loadProducts()

        const code = this.nextProductId.toString().padStart(4, '0')

        const productExists = this.Products.some(
            product => product.title === title && product.code === code
        )

        if (productExists) {
            throw new Error(`Error: Ya existe un producto con el mismo título y código.`)
        }

        let nuevoProducto = {
            id: this.nextProductId, 
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        this.Products.push(nuevoProducto)
        this.nextProductId++ 

        await this.saveProducts()
    }

    async getProducts() {
        await this.loadProducts()
        return this.Products
    }

    async getProductById(id) {
        await this.loadProducts()
        const product = this.Products.find(product => product.id === id)
        if (!product) {
            throw new Error(`Error: No se encontró ningún producto con el ID ${id}.`)
        }
        return product
    }

    async updateProduct(id, updates) {
        await this.loadProducts()
        const productIndex = this.Products.findIndex(product => product.id === id)

        if (productIndex === -1) {
            throw new Error(`Error: No se encontró ningún producto con el ID ${id}.`)
        }

        this.Products[productIndex] = { ...this.Products[productIndex], ...updates }
        await this.saveProducts()
    }

    async deleteProduct(id) {
        await this.loadProducts()
        const productIndex = this.Products.findIndex(product => product.id === id)

        if (productIndex === -1) {
            throw new Error(`Error: No se encontró ningún producto con el ID ${id}.`)
        }

        this.Products.splice(productIndex, 1)
        await this.saveProducts()
    }
}

(async () => {
    let manager = new ProductManager()

    try {
        await manager.addProduct('mesa', 'cuadrada', 500, 'foto1', 123, 500)
        await manager.addProduct('mate', 'redondo', 200, 'foto2', 321, 300)
        await manager.addProduct('notebook', 'roja', 9500, 'foto3', 326, 101)
        await manager.addProduct('cargador', 'rosa', 700, 'foto4', 300, 100)
        await manager.addProduct('pc', 'verde', 10500, 'foto5', 750, 17)
        await manager.addProduct('patineta', 'gris', 8500, 'foto6', 650, 30)
        await manager.addProduct('alfombra', 'negra', 3000, 'foto7', 900, 40)
        await manager.addProduct('mouse', 'negra', 15000, 'foto8', 699, 50) 
        await manager.addProduct('teclado', 'negra', 25000, 'foto9', 799, 60)
        await manager.addProduct('auriculares', 'negra', 70000, 'foto10', 392, 70)
        await manager.addProduct('pad', 'negra', 120, 'foto11', 5, 80)
        
        const products = await manager.getProducts()
        console.log("Productos:", products)

        const product = await manager.getProductById(2)
        console.log("Producto encontrado:", product)

        await manager.updateProduct(2, { price: 250 })
        console.log("Producto actualizado:", await manager.getProductById(2))

        await manager.deleteProduct(3)
        console.log("Producto eliminado")

    } catch (error) {
        console.error(error.message)
    }
})()

module.exports = ProductManager // Se usa para exportar
