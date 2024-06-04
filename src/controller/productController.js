const ProductManagerMongo = require('./productManager.js')
const productManager = new ProductManagerMongo

class ProductController{
    async getProductById(req, res){
        const productId = req.params.pid
        try{
            //const product = await ProductService.findProductById(productId)
            const product = await productManager.getProductById(productId)
            return product ? res.status(200).json(product) : res.status(400).send('Error al obtener el producto')
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
            return products ? res.status(200).json(products) : res.status(400).send('Error al obtener los productos')
        }catch(error){
            res.status(500).send(error)
        }
    }
    async getProducts(req, res){
        try{
            //const products = await ProductService.findProducts()
            const products = await productManager.getProducts()
            return products ? res.status(200).json(products) : res.status(400).send('Error al obtener los productos')
        }catch(error){
            res.status(500).send(error)
        }
    }  

    async deleteProduct(req, res){
        const productId = req.params.pid
        try{
            //await ProductService.deleteProd(productId)
            const deleteProd = await productManager.deleteProduct(productId)
            return deleteProd ?  res.status(200).send('Prod Eliminado') : res.status(400).send('Error al eliminar producto')
        }catch(error){
            res.status(500).send(error)
        }
    }

    async updateProduct(req, res){
        const productId = req.params.pid
        const value = req.body
        try{
            //await ProductService.updateProd(productId, value)
            const result = await productManager.updateProduct(productId, value)
            return result ? res.status(200).send('Producto actualizado correctamente') : res.status(400).send('Error al actualizar producto')
        }catch(error){
            res.status(500).send(error)
        }
    }
    
    async addProduct(req, res){
        const product = req.body
        try{
            //await ProductService.addProd(product)
            const result = await productManager.addProduct(product)
            return result ? res.status(200).send('Producto agregado correctamente') : res.status(400).send('Error al agregar producto')
        }catch(error){
            res.status(500).send(error)
        }
    }
}

module.exports = ProductController