var fs = require('fs')
const express=require('express')
const path=require('path')

let ruta=path.join(__dirname,'Desafio','products.json') 

const app=express()
const PORT=3000

app.listen(PORT,()=>{
    console.log(`server corriendo`)
})



class ProductManager {

    //constructor de la clase ProductManager
    constructor (path){
        //Si el path es vacio se considera invalido
        if (path.length==0) return console.log("Error - invalid path")
        //Constructor con lista de productos vacia
        this.products=[]
        this.path=path
        //Si el archivo ya existe, leo la info asumiendo que ya hay un array de objetos
        if(fs.existsSync(path)){
            this.products=JSON.parse(fs.readFileSync(this.path,'utf-8'))
        }
        else{
            //Si el archivo aun no existe, lo creo
            fs.openSync('./test.txt', 'w',0o666 ,function (err, file) {
                if (err) throw err
            })
        }
       
    }

    addProduct (title, description, price, thumbnail, code, stock){
        //Agregar producto - Creando el mismo con las propiedades seleccionadas
        let newProduct={
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id:0
        }

        let isPresent=false
        this.products.forEach(element => {
            if (element.code==code){isPresent=true}

        })

        if (!isPresent){
            if (this.products.length===0){
                newProduct.id=1
            }else{
                newProduct.id = this.products[this.products.length -1].id + 1
            }
    
            this.products.push(newProduct)
            //Guardo el nuevo array de objetos en el archivo JSON 
            fs.writeFileSync(this.path, JSON.stringify(this.products), function (err) {if (err) throw err})
        }
        else{
            return "El codgio ya existe. Debe ingresar otro codigo"
        }

    }

    getProducts(){
        //metodo que retorna la lista entera de productos
        return this.products
    }

    getProductById(id){

        //metodo que retorna el producto seleccionado usando su ID
        let isPresent=false
        let location=-1
        let i=-1
        this.products.forEach(element => { 
            i++
            if (element.id == id) 
            {
                isPresent=true
                location=i
            }
            
        })
        if (isPresent) {return this.products[location]}
        return ("No funciona")
    }

    updateProduct(id,tempProd){
        //Actualizo el objeto Producto con toda la info nueva y actualizo el archivo tambien.
        let isPresent=false
        let location=-1
        let i=-1
        this.products.forEach(element => { 
            i++
            if (element.id == id) 
            {
                isPresent=true
                location=i
            }
            
        })
        if (isPresent) {
            this.products[location]=tempProd
            fs.unlinkSync(this.path, function (err) {if (err) throw err;})
            fs.openSync('./test.txt', 'w',0o666 ,function (err, file) {if (err) throw err}) 
            fs.writeFileSync(this.path, JSON.stringify(this.products), function (err) {if (err) throw err;})
            return "success"
        }
        return "Error - ID not found"
    }

    deleteProduct(id){
        //Metodo para borrar un producto dado su ID - Tambien se elimina del archivo
        let i=-1
        let logrado=false
        this.products.forEach(element => { 
            i++
            if (element.id == id) 
            {
                this.products.splice(i,1)
                logrado=true
            }
        })
        if (logrado){
            fs.unlinkSync(this.path, function (err) {if (err) throw err;})
            fs.openSync('./test.txt', 'w',0o666 ,function (err, file) {
                if (err) throw err
            })
            fs.writeFileSync(this.path, JSON.stringify(this.products), function (err) {if (err) throw err;})
            return "Exito"
        }
        return "Id not found - Product not deleted"

    }


}