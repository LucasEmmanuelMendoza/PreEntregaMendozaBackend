const express = require('express')
const routerCarts = express.Router();
const{ purchaseCart, createCart, getCartById, addToCart, deleteFromCart, updateCart, updateProductFromCart, deleteCart } = require('../controller/cartController.js')

routerCarts.post('/', createCart)
routerCarts.get('/:cid', getCartById)
routerCarts.post('/:cid/product/:pid', addToCart)
routerCarts.delete('/:cid/products/:pid', deleteFromCart)
routerCarts.put('/:cid', updateCart)
routerCarts.put('/:cid/products/:pid', updateProductFromCart)
routerCarts.delete('/:cid', deleteCart)
routerCarts.get('/:cid/purchase', purchaseCart)

module.exports = { routerCarts };