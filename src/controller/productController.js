const ProductService = require('../services/productService.js')
const ProductManagerMongo = require('./productManager.js')

const productManager = new ProductManagerMongo

class ProductController{
    async getProductById(req, res){
        const productId = req.params.pid
        try{
            //const product = await ProductService.findProductById(productId)
            const product = await productManager.getProductById(productId)
            return res.status(200).json(product)
        }catch(error){
            res.status(500).send(error)
        }
    }

    async getProductsPaginate(req, res){
        const limit = req.params.limit;
        const page = req.params.page;
        const category = req.params.category;
        const priceSort = req.params.priceSort;
        try{
            //const products = await ProductService.findProductsPaginate(limit, page, category, priceSort)
            const products = await productManager.getProductsPaginate(limit, page, category, priceSort)
            return res.status(200).json(products)
        }catch(error){
            res.status(500).send(error)
        }
    }
    async getProducts(req, res){
        try{
            //const products = await ProductService.findProducts()
            const products = await productManager.getProducts()
            return res.status(200).json(products)
        }catch(error){
            res.status(500).send(error)
        }
    }  

    async deleteProduct(req, res){
        const productId = req.params.pid
        try{
            //await ProductService.deleteProd(productId)
            await productManager.deleteProduct(productId)
        }catch(error){
            res.status(500).send(error)
        }
    }

    async updateProduct(req, res){
        const productId = req.params.pid
        const value = req.body
        try{
            //await ProductService.updateProd(productId, value)
            await productManager.updateProduct(productId, value)
        }catch(error){
            res.status(500).send(error)
        }
    }
    
    async addProduct(req, res){
        const product = req.body
        try{
            //await ProductService.addProd(product)
            await productManager.addProduct(product)
        }catch(error){
            res.status(500).send(error)
        }
    }
}

module.exports = ProductController