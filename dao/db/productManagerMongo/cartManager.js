const Carts = require('../models/cart.model')

class CartManager{
    
    async createCart(){
        try{
            await Carts.create()
            return true
        }catch(error){
            console.log(error)
            return false
        }
    }

    async getCartById(id){
        try{
            const cart = await Carts.findOne({_id:id})
            return cart
        }catch(error){
            console.log(error)
            return false
        }
    }

    async addProduct(cartId, productId){
        try{
            const returnFind = await Carts.findOne({_id: cartId})
            if (returnFind != null){

            }else{
                await Carts.updateOne({"_id": cartId},{$addToSet: {products: productId}})
            }
            return true
        }catch(error){
            console.log(error)
            return false
        }
    }
}

module.exports = CartManager