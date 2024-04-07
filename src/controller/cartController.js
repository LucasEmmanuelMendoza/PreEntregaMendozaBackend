const CartService = require('../services/cartService.js');


const deleteCart = async(req, res) => {
    const cartId = req.params.cid;
    try{
        return await CartService.deleteOneCart(cartId)
    }catch(error){
        res.status(500).send(error)
    }
}

const updateProductFromCart = async (req, res) => {
    const cartId = req.params.cid;
    const prodId = req.params.pid;
    const updatedQuantity = req.body;
    try{
        return await CartService.updateProdFromCart(cartId, prodId, updatedQuantity)
    }catch(error){
        res.status(500).send(error)
    }
}

const updateCart = async (req, res) => {
    const cartId = req.params.cid;
    const updatedCart = req.body;
    try{
        return await CartService.updateOneCart(cartId, updatedCart)
    }catch(error){
        res.status(500).send(error)
    }
}

const deleteFromCart = async (req, res) => {
    const cartId = req.params.cid;
    const prodId = req.params.pid;
    try{
        return await CartService.deleteProductFromCart(cartId, prodId)
    }catch(error){
        res.status(500).send(error)
    }
}

const addToCart = async (req, res) => {
    const cartId = req.params.cid;
    const prodId = req.params.pid;
    try{
        return await CartService.addProductToCart(cartId, prodId)
    }catch(error){
        res.status(500).send(error)
    }
}

const createCart = async (req, res) => {
    try{
        return await CartService.addCart()
    }catch(error){
        res.status(500).send(error)
    }
}

const getCartById = async (req, res) => {
    const cartId = req.params.cid
    try{
        const cart = await CartService.findCartById(cartId)
        return res.status(200).json(cart)
    }catch(error){
        res.status(500).send(error)
    }
}

module.exports = { createCart, getCartById, addToCart, deleteFromCart, updateCart, updateProductFromCart, deleteCart }