const express = require('express')
const routerSession = express.Router();
const CartManager = require('../controller/cartManager.js')
const cartManager = new CartManager()

const ProductManager = require('../controller/productManager.js')
const productManager = new ProductManager()

routerSession.get('/current', async(req, res)=>{
    if(req.session.passport){
        const user = req.session.passport.user
        const cart = await cartManager.getCartById(req.session.passport.user.cartId)
        res.status(200).json({user, cart}) 
    }else{
        res.status(400).send('No se encontró un usuario en la sesión actual')
    }
})

module.exports = { routerSession }