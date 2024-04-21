const express = require('express')
const routerSession = express.Router();
const CartManager = require('../controller/cartManager.js')
const cartManager = new CartManager()

const ProductManager = require('../controller/productManager.js')
const productManager = new ProductManager()

routerSession.get('/current', async(req, res)=>{
    const cart = await cartManager.getCartById(req.session.passport.user.cartId)
    const user = req.session.passport.user
    console.log('cart:', cart)
    res.render('current',{
        user: user,
        cart: cart.products
    }) 
})

module.exports = { routerSession }