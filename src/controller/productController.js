const ProductService = require('../services/productService.js')
const ProductManagerMongo = require('./productManager.js')

const productManager = new ProductManagerMongo

const getProductById = async(req, res) => {
    const productId = req.params.pid
    try{
        //const product = await ProductService.findProductById(productId)
        const product = await productManager.getProductById(productId)
        return res.status(200).json(product)
    }catch(error){
        res.status(500).send(error)
    }
}

const getProductsPaginate = async(req, res) => {
    const limit = req.params.limit;
    const page = req.params.page;
    const category = req.params.category;
    const priceSort = req.params.priceSort;
    try{
        //const products = await ProductService.findProductsPaginate(limit, page, category, priceSort)
        const products = await productManager.getProductsPaginate(limit, page, category, proceSort)
        return res.status(200).json(products)
    }catch(error){
        res.status(500).send(error)
    }
}

const getProducts = async(req, res) => {
    try{
        //const products = await ProductService.findProducts()
        const products = await productManager.getProducts()
        return res.status(200).json(products)
    }catch(error){
        res.status(500).send(error)
    }
}

const deleteProduct = async(req, res) => {
    const productId = req.params.pid
    try{
        //await ProductService.deleteProd(productId)
        await productManager.deleteProduct(productId)
    }catch(error){
        res.status(500).send(error)
    }
}

const updateProduct = async(req, res) => {
    const productId = req.params.pid
    const value = req.body
    try{
        //await ProductService.updateProd(productId, value)
        await productManager.updateProduct(productId, value)
    }catch(error){
        res.status(500).send(error)
    }
}

const addProduct = async(req, res) => {
    const product = req.body
    try{
        //await ProductService.addProd(product)
        await productManager.addProduct(product)
    }catch(error){
        res.status(500).send(error)
    }
}

module.exports = { getProductById, getProducts, updateProduct, addProduct, deleteProduct, getProductsPaginate }