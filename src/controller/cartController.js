const CartManager = require('./cartManager.js');
 
const cartManager = new CartManager()

const purchaseCart = async(req, res) => {
    const cartId = req.params.cid;
    try{
        const cart = await cartManager.getCartById(cartId)
        const totalPrice = cart.products.reduce((acumulador, prod) => acumulador += prod.product.price * prod.quantity, 0);
        const prodsQuantity = cart.products.reduce((acumulador, prod) => acumulador += prod.quantity,0)
        res.render('purchase', {
            cartId,
            prodsQuantity,
            totalPrice
        })
    }catch(error){
        res.status(500).send(error)
    }
}

const deleteCart = async(req, res) => {
    const cartId = req.params.cid;
    try{
        const result = await cartManager.deleteCart(cartId)
        return result ? res.status(200).send(result) : res.status(400).send('Error al borrar el carrito')
    }catch(error){
        res.status(500).send(error)
    }
}

const updateProductFromCart = async (req, res) => {
    const cartId = req.params.cid;
    const prodId = req.params.pid;
    const updatedQuantity = req.body;
    try{
        const result = await cartManager.updateQuantity(cartId, prodId,updatedQuantity)
        return result ? res.status(200).send(result) : res.status(400).send('Error al actualizar el producto del carrito')
    }catch(error){
        res.status(500).send(error)
    }
}

const updateCart = async (req, res) => {
    const cartId = req.params.cid;
    const updatedCart = req.body;
    try{
        const result = await cartManager.updateCart(cartId, updatedCart)
        return result ? res.status(200).send(result) : res.status(400).send('Error al actualizar el carrito')
    }catch(error){
        res.status(500).send(error)
    }
}

const deleteFromCart = async (req, res) => {
    const cartId = req.params.cid;
    const prodId = req.params.pid;
    try{
        const result = await cartManager.deleteProduct(cartId, prodId)
        return result ? res.status(200).send(result) : res.status(400).send('Error al eliminar el carrito')
    }catch(error){
        res.status(500).send(error)
    }
}

const addToCart = async (req, res) => {
    const cartId = req.params.cid;
    const prodId = req.params.pid;
    try{
        const result = await cartManager.addProduct(cartId, prodId)
        return result ? res.status(200).send(result) : res.status(400).send('Error al agregar el producto al carrito')
    }catch(error){
        res.status(500).send(error)
    }
}

const createCart = async (req, res) => {
    try{
        const result = await cartManager.createCart()
        return result ? res.status(200).send(result) : res.status(400).send('Error al crear el carrito')
    }catch(error){
        res.status(500).send(error)
    }
}

const getCartById = async (req, res) => {
    try{
        const cartId = req.params.cid;
        const cart = await cartManager.getCartById(cartId)
    
        return cart ? res.status(200).json(cart) : res.status(400).send('Error al obtener el carrito')

    }catch(error){
        res.status(500).send(error)
    }
}

module.exports = { purchaseCart, createCart, getCartById, addToCart, deleteFromCart, updateCart, updateProductFromCart, deleteCart }