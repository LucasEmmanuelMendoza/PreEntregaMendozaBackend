const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

class CartManager{
    constructor(){
        this.path = path.join(__dirname,'../cart.json');
    }

    async createCart(){
        try{
            const id = uuidv4()
            const products = []

            const newCart = {
                id: id,
                products: products
            }

            const data = await fs.promises.readFile(this.path, 'utf-8')
            const carritos = JSON.parse(data)

            carritos.push(newCart)

            await fs.promises.writeFile(this.path, JSON.stringify(carritos, null, '\t'))
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

            const exitsCart = carts.some((cart) => cart.id === id)
            
            if (exitsCart){
                const foundCart = carts.find((cart) => cart.id === id)
                return foundCart
            }else{
                return false
            }

        }catch(error){
            console.log(error)
        }
    }

    async addProduct(cartId, productId){
        try{
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const carts = JSON.parse(data)

            const indexCart = carts.findIndex(cart => cart.id === cartId)

            if (indexCart != -1 ){//existe el carro
                const foundCart = carts[indexCart]
                const indexProd = foundCart.products.findIndex(prod => prod.product === productId)

                if (indexProd != -1){//existe el producto en el carro
                    carts[indexCart].products[indexProd].quantity ++
                }else{//no existe
                    const newProd={
                        product: productId,
                        quantity: 1
                    }
                    carts[indexCart].products.push(newProd)
                }
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'))
                return true
            }
        }catch(error){
            console.log(error)
        }
    }   
}
 
module.exports = CartManager