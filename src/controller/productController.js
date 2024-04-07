const ProductService = require('../services/productService.js')

const getProductById = async(req, res) => {
    const productId = req.params.pid
    try{
        const product = await ProductService.findProductById(productId)
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
        const products = await ProductService.findProductsPaginate(limit, page, category, priceSort)
        return res.status(200).json(products)
    }catch(error){
        res.status(500).send(error)
    }
}

const getProducts = async(req, res) => {
    try{
        const products = await ProductService.findProducts()
        return res.status(200).json(products)
    }catch(error){
        res.status(500).send(error)
    }
}

const deleteProduct = async(req, res) => {
    const productId = req.params.pid
    try{
        await ProductService.deleteProd(productId)
    }catch(error){
        res.status(500).send(error)
    }
}

const updateProduct = async(req, res) => {
    const productId = req.params.pid
    const value = req.body
    try{
        await ProductService.updateProd(productId, value)
    }catch(error){
        res.status(500).send(error)
    }
}

const addProduct = async(req, res) => {
    const product = req.body
    try{
        await ProductService.addProd(product)
    }catch(error){
        res.status(500).send(error)
    }
}

module.exports = { getProductById, getProducts, updateProduct, addProduct, deleteProduct, getProductsPaginate }