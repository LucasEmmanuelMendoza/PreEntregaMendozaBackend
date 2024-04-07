const CartModel = require('../models/cart.model.js')

class CartService{
    async deleteOneCart(id){
        try{
            return await CartModel.findByIdAndDelete(id)
        }catch(error){
            throw error
        }
    }

    async findCartById(id){
        try{
            return await CartModel.findOne({_id:id}).populate('products.product').lean()
        }catch(error){
            throw error
        }
    }

    async addCart(){
        try{
            return await CartModel.create({ products: []})
        }catch(error){
            throw error
        }
    }

    async addProductToCart(cartId, prodId){
        try{
            const foundCart = await CartModel.findOne({_id: cartId})
            if (foundCart != null){
                const indexProd = foundCart.products.findIndex(prod => prod.product == prodId);
                if (indexProd != -1){
                    foundCart.products[indexProd].quantity ++;
                }else{
                    const newProd = {
                        product: prodId,
                        quantity : 1
                    }
                    foundCart.products.push(newProd)
                }
                return await CartModel.updateOne({"_id": cartId}, foundCart)
            }
        }catch(error){
            throw error
        }
    }


    async deleteProductFromCart(cartId, prodId){
        try{
            const foundCart = await CartModel.findOne({_id:cartId});
            if(foundCart != null){
                const existeProd = foundCart.products.some(prod => prod.product == prodId)
                if(existeProd != -1){ 
                    foundCart.products = foundCart.products.filter(prod => prod.product != prodId);
                    await CartModel.updateOne({"_id": cartId}, foundCart);
                    return true;
                }
            }
        }catch(error){
            throw error
        }
    }

    async updateOneCart(cartId, updatedCart){
        try{
            const foundCart = await CartModel.findOne({_id: cartId});
            if(foundCart != null){
                await CartModel.updateOne({"_id": cartId}, {$set: {"products": updatedCart}});
                return true
            }
        }catch(error){
            throw error
        }
    }

    async updateProdFromCart(cartId, prodId, updatedQuantity){
        try{
            const foundCart = await CartModel.findOne({_id: cartId});
            if(foundCart != null){
                const indexProd = foundCart.products.findIndex(prod => prod.id == prodId)
                foundCart[indexProd].quantity = updatedQuantity;
                await CartModel.updateOne({"_id": cartId}, foundCart);
                return true;
            }
        }catch(error){
            throw error
        }
    }
}


module.exports = CartService
