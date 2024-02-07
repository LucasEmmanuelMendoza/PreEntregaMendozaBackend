const Product = require('../models/product.model')

class ProductManagerMongo{
    async addProduct(product){
        try{
            await Product.create(product)
            return 'Producto creado'
        }catch(error){
            return 'Error: '+ error
        }
    }
}

module.exports = ProductManagerMongo