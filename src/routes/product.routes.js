const express = require('express')
const routerProduct = express.Router();
//const { getProducts, getProductById, addProduct, updateProduct, deleteProduct } = require('../controller/productController.js') 
const ProductController = require('../controller/productController')
const productController = new ProductController()

routerProduct.get('/', productController.getProducts)
routerProduct.get('/:pid', productController.getProductById)
routerProduct.post('/', productController.addProduct)
routerProduct.put('/:pid', productController.updateProduct)
routerProduct.delete('/:pid', productController.deleteProduct)

module.exports = { routerProduct }

/* routerProduct.get('/', async(req, res) => {
    const limit = req.query.limit
    const page = req.query.page
    const sort = req.query.sort
    const category = req.query.query

    let returnPaginate = await productManager.getProducts(limit, page, category, sort)

    if(returnPaginate != false){
        res.status(200).send(returnPaginate)
    }else{
        res.status(400).send("Error al obtener productos")
    }
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
}) */