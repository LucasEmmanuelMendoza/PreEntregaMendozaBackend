const CartService = require('../services/cartService.js');
const CartManager = require('./cartManager.js');

const ProductManager = require('./productManager.js')
const productManager = new ProductManager()
 
const cartManager = new CartManager()

const purchaseCart = async(req, res) => {
    const cartId = req.params.cid;
    try{
        const cart = await cartManager.getCartById(cartId)
        const totalPrice = cart.products.reduce((acumulador, prod) => acumulador += prod.product.price * prod.quantity, 0);
        const prodsQuantity = cart.products.reduce((acumulador, prod) => acumulador += prod.quantity,0)
        //console.log(cartId)
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
        return await cartManager.deleteCart(cartId)
    }catch(error){
        res.status(500).send(error)
    }
}

const updateProductFromCart = async (req, res) => {
    const cartId = req.params.cid;
    const prodId = req.params.pid;
    const updatedQuantity = req.body;
    try{
        //return await CartService.updateProdFromCart(cartId, prodId, updatedQuantity)
        return await cartManager.updateQuantity(cartId, prodId,updatedQuantity)
    }catch(error){
        res.status(500).send(error)
    }
}

const updateCart = async (req, res) => {
    const cartId = req.params.cid;
    const updatedCart = req.body;//array products
    try{
        //return await CartService.updateOneCart(cartId, updatedCart)
        return await cartManager.updateCart(cartId, updatedCart)
    }catch(error){
        res.status(500).send(error)
    }
}

const deleteFromCart = async (req, res) => {
    const cartId = req.params.cid;
    const prodId = req.params.pid;
    try{
        //return await CartService.deleteProductFromCart(cartId, prodId)
        return await cartManager.deleteProduct(cartId, prodId)
    }catch(error){
        res.status(500).send(error)
    }
}

const addToCart = async (req, res) => {
    const cartId = req.params.cid;
    const prodId = req.params.pid;
    try{
        //return await CartService.addProductToCart(cartId, prodId)
        return await cartManager.addProduct(cartId, prodId)
    }catch(error){
        res.status(500).send(error)
    }
}

const createCart = async (req, res) => {
    try{
        //return await CartService.addCart()
        return await cartManager.createCart()
    }catch(error){
        res.status(500).send(error)
    }
}

const getCartById = async (req, res) => {
    const cartId = req.params.cid;
    const cart = await cartManager.getCartById(cartId)

    const totalPrice = cart.products.reduce((acumulador, prod) => acumulador += prod.product.price * prod.quantity, 0);
    const prodsQuantity = cart.products.reduce((acumulador, prod) => acumulador += prod.quantity,0)
    
    try{
        res.render('cart', {
            cartProducts: cart.products,
            cartId,
            totalPrice,
            prodsQuantity
        })
    }catch(error){
        res.status(500).send(error)
    }
}

module.exports = { purchaseCart, createCart, getCartById, addToCart, deleteFromCart, updateCart, updateProductFromCart, deleteCart }