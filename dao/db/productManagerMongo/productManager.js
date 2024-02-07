const Products = require('../models/product.model.js')

class ProductManagerMongo{

    constructor() {
        this.productsModel = Products;
    }
    
    async addProduct(product) {
        try {
            await this.productsModel.create(product)
            return 'Producto creado';
        } catch(error) {
            return error;
        }
    }
    async deleteProduct(id){
        try{
            await Products.find()
        }catch(error){
            return error
        }
    }

}

module.exports = ProductManagerMongo