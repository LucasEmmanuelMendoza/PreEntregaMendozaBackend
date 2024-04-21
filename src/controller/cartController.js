const CartService = require('../services/cartService.js');
const CartManager = require('./cartManager.js');

const cartManager = new CartManager()

const purchaseCart = async(req, res) => {
    const cartId = req.params.cid;
    try{
        
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
    const cartId = req.params.cid
    try{
        //const cart = await CartService.findCartById(cartId)
        const cart = await cartManager.getCartById(cartId)
        return res.status(200).json(cart)
    }catch(error){
        res.status(500).send(error)
    }
}

module.exports = { purchaseCart, createCart, getCartById, addToCart, deleteFromCart, updateCart, updateProductFromCart, deleteCart }