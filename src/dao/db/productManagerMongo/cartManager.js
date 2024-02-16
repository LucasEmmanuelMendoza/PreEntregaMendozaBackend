const Carts = require('../models/cart.model')

class CartManager{
    
    async createCart(){
        try{
            const retorno = await Carts.create({ products: []})
            return true
        }catch(error){
            console.log(error)
            return error
        }
    }

    async getCartById(id){
        try{
            const cart = await Carts.findOne({_id:id})
            if(cart != null){
                return cart
            }
        }catch(error){
            console.log(error)
            return false
        }
    }

    async addProduct(cartId, productId){
        try{
            //busco el carrito
            const foundCart = await Carts.findOne({_id: cartId})
            if (foundCart != null){//existe el carrito
                const indexProd = foundCart.products.findIndex(prod => prod.product == productId)

                if (indexProd != -1){//existe el producto en el carro
                    foundCart.products[indexProd].quantity ++
                }else{
                    const newProd = {
                        product: productId,
                        quantity : 1
                    }
                    foundCart.products.push(newProd)
                }
                await Carts.updateOne({"_id": cartId}, foundCart)
                return true
            }
        }catch(error){
            console.log(error)
            return false
        }
    }
}

module.exports = CartManager