const fs = require('fs'); 
const uuid = require('uuid');

class CartManager{
    constructor(){
        this.path = '../cart.json'/* 
        this.id = uuid.v4()
        this.products = [] */
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
            const carritos = JSON.parse(data)

            carritos.push(newCart)

            await fs.promises.writeFile(this.path, JSON.stringify(carritos, null, '\t'))
            console.log('Producto agregado al carro')

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

            const foundCart = carts.find(cart => cart.id === cartId)
            //defino a foundCart como const y desp le asigno cartMod, MAL
            if(foundCart){
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
