const Carts = require('../dao/db/models/cart.model')

class CartManager{

    async getAllCarts(){
        try{
            const foundCarts = await Carts.find();
            if(foundCarts){
                return foundCarts
            }
        }catch(error){
            return error
        }
    }

    async deleteCart(cid){
        try{
            return await Carts.findByIdAndDelete(cid)
        }catch(error){
            console.log(error)
            return error
        }
    }

    async createCart(){
        try{
            const retorno = await Carts.create({ products: []})
            return retorno
        }catch(error){
            console.log(error)
            return error
        }
    }

    async getCartByIdPopulate(id){
        try{
            const cart = await Carts.findOne({_id:id}).populate('products.product').lean()
            if(cart != null){
                return cart
            }
        }catch(error){
            console.log(error)
            return false
        }
    }

    async getCartById(id){
        try{
            const cart = await Carts.findOne({_id:id}).lean()
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
            if(foundCart != null){//existe el carrito
                const indexProd = foundCart.products.findIndex(prod => prod.product._id == productId);
                if (indexProd != -1){//existe el producto en el carro
                    foundCart.products[indexProd].quantity ++;
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

    async deleteProduct(cartId, productId){
        try{
            const foundCart = await Carts.findOne({_id:cartId});
            if(foundCart != null){
                const existeProd = (foundCart.products).some(prod => toString(prod.product) === toString(productId.trim))
                if(existeProd){//exite el 
                    foundCart.products = (foundCart.products).filter(prod => String(prod.product._id) !== String(productId));
                    await Carts.updateOne({"_id": cartId}, {$set: {products: foundCart.products}});
                    return true;
                }
            }
        }catch(error){
            console.log(error);
            return error;
        }
    }

    async deleteAllProducts(cartId){
        try{
            const foundCart = await Carts.findOne({_id: cartId});
            if(foundCart != null){
                await Carts.updateOne({"_id": cartId}, {$set: {"products": []}});
                return true;
            }
        }catch(error){
            console.log(error);
            return error;
        }
    }
    
    async updateCart(cartId, products){
        try{
            const foundCart = await Carts.findOne({_id: cartId});
            if(foundCart != null){
                await Carts.updateOne({"_id": cartId}, {$set: {"products": products}});
                return true
            }
        }catch(error){
            console.log(error)
            return false
        }
    }

    async updateQuantity(cartId, productId, quantity){
        try{
            const foundCart = await Carts.findOne({_id: cartId});
            if(foundCart != null){
                const indexProd = foundCart.products.findIndex(prod => prod.id == productId)
                foundCart[indexProd].quantity = quantity;
                await Carts.updateOne({"_id": cartId}, foundCart);
                return true;
            }
        }catch(error){
            console.log(error)
            return false
        }
    }
}

module.exports = CartManager