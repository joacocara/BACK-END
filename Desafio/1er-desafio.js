class ProductManager{
    constructor() {
        this.products = []
}

    addProduct(price, description, title, code, stock, thumbnail){
        const product = {
            price: price,
            description: description,
            title: title,
            code: code,
            stock: stock,
            thumbnail: thumbnail
        }
        this.products.push(product)
    }   
    getProducts() {
        return this.products
    }
    getProductById(id) {
        const product = this.products.find((prod) => prod.code === id)
        if (product) {
            return product
        } else {
            console.log("Not found")
        }
    }
}
const manager = new ProductManager()
manager.addProduct(10, "color azul", "casa", "01", 3, "imagen1.jpg")
manager.addProduct(20, "color gris", "edificio", "02", 2, "imagen2.jpg")

//console.log(manager.getProducts()) // Si yo quito las "//" se mostrarán los productos

const producto1 = manager.getProductById("01")

const producto2 = manager.getProductById("03")