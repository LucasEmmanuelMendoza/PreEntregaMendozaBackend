const ProductManager = require('../productManagerMongo/productManager.js')
const express = require('express')
const routerProduct = express.Router();

const productManager = new ProductManager()

routerProduct.get('/', async(req, res) => {
    let products = await productManager.getProducts()
    const limit = req.query.limit
    const page = req.query.page
    const sort = req.query.sort
    const query = req.query.query

    if(limit){
        products = products.slice(0, limit)
    }

    products ? res.status(200).json(products) : res.status(400).send(products)
})

routerProduct.get('/:pid', async(req, res) => {
    const prodId = req.params.pid
    const product = await productManager.getProductById(prodId)

    product ? res.status(200).json(product) : res.status(400).send("Producto no encontrado")
})

routerProduct.post('/', async(req, res) => {
    const newProduct = req.body
    const returnAddProd = await productManager.addProduct(newProduct)

    returnAddProd ? res.status(200).send("Producto agregado") : res.status(400).send("Error al agregar el producto")
})

routerProduct.put('/:pid', async(req, res) => {
    const prodId = req.params.pid
    const updatedProd = req.body

    const returnUpdate = await productManager.updateProduct(prodId, updatedProd)

    returnUpdate ? res.status(200).send("Producto actualizado") : res.status(400).send("Error al actualizar el producto") 
})

routerProduct.delete('/:pid', async(req, res) => {
    const idProd = req.params.pid
    const returnDelete = await productManager.deleteProduct(idProd)

    returnDelete ? res.status(200).send("Producto eliminado") : res.status(400).send("Error al eliminar el productos")
})

module.exports = { routerProduct }