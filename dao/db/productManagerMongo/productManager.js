const Products = require('../models/product.model.js')

class ProductManagerMongo{
    
    async addProduct(product) {
        try {
            await Products.create(product)
            return true;
        } catch(error) {
            console.log(error)
            return false
        }
    }

    async deleteProduct(id){
        try{
            await Products.deleteOne({_id:id})
            return true
        }catch(error){
            console.log(error)
            return false
        }
    }

    async getProductById(id){
        try{
            const product = await Products.findOne({_id:id})
            return product
        }catch(error){
            console.log(error)
            return false
        }
    }

    async getProducts(){
        try{
            const products = await Products.find()
            return products
        }catch(error){
            console.log(error)
            return false
        }
    }

    async updateProduct(id, value){
        try{
            await Products.updateOne({"_id": id}, {$set: value})
            return true
        }catch(error){
            console.log(error)
            return false
        }
    }
}

module.exports = ProductManagerMongo