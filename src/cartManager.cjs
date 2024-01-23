const fs = require('fs');
const { v4: uuid } = require('uuid');
const path = require('path');

class CartManager{
    
    constructor() {
        this.path = path.join(__dirname,'../cart.json');
    }

    async createCart(){
        try{
            const id = uuid.v4()
            const products = []

            const newCart = {
                "id": id,
                "products": products
            }

            const data = await fs.promises.readFile(this.path, 'utf-8')
            const carts = JSON.parse(data)

            carts.push(newCart)

            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'))
            console.log('Carrito creado')
            return true
        }catch(error){
            console.log(error)
        }
    }

    async getCartById(id){
        try{
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const carts = JSON.parse(data)

            const foundCart = carts.find(cart => cart.id === id)

            return foundCart
        }catch(error){
            console.log(error)
        }
    }

    async addProduct(cartId, productId, quantity){
        try{
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const carts = JSON.parse(data)

<<<<<<< HEAD:src/cartManager.js
            const foundCart = carts.find(cart => cart.id === cartId)
            //defino a foundCart como const y desp le asigno cartMod, MAL
            if(foundCart){
=======
            let foundCart = carts.find(cart => cart.id === cartId)

            if(foundCart){//si existe el carrito
>>>>>>> 1e71746f95bc65e94a8e6a66d8f6d09a26cdc92f:src/cartManager.cjs
                const existsProd = foundCart.some((prod) => prod.product === productId)
                
                if(existsProd){
                    const cartMod = foundCart.map((prodCart) => {
                        if(prodCart.product === productId){
                            return{
                                product: productId,                                
                                quantity: prodCart.quantity + quantity
                            }
                        }else{
                            return prodCart
                        }
                    })
                    foundCart = cartMod;
                }else{
                    const newProd={
                        product: productId,
                        quantity: quantity
                    }            
                    foundCart.push(newProd)
                }
                await fs.promises.writeFile(this.path, JSON.stringify(foundCart, null, '\t'))
                return true
            }else{
                return false
            }

        }catch(error){
            console.log(error)
        }
    }   
}

module.exports = CartManager 