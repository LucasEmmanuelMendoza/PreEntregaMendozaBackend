const CartManager = require('../productManagerMongo/cartManager.js')
const express = require('express')
const routerCarts = express.Router();

const cartManager = new CartManager()

routerCarts.post('/', async(req, res) => {
    const returnCreate = await cartManager.createCart()
    
    returnCreate ? res.status(200).send('Carrito creado') : res.status(400).send("Error al crear el carro");
})

routerCarts.get('/:cid', async(req, res) => {
    const cartId = req.params.cid
    const cart = await cartManager.getCartById(cartId)
    const products = cart.products

    cart ? res.status(200).json(products) : res.status(400).send("Carrito no encontrado")
})

routerCarts.post('/:cid/product/:pid', async(req, res) => {
    const cartId = req.params.cid
    const prodId = req.params.pid
    const returnAdd = await cartManager.addProduct(cartId, prodId)

    returnAdd ? res.status(200).send("Producto agregado al carro") : res.status(400).send("Error al agregar producto al carro")
})

routerCarts.delete('/:cid/products/:pid', async(req,res) => {
    const cartId = req.params.cid
    const prodId = req.params.pid
    const returnDelete = await cartManager.deleteProduct(cartId, prodId)

    returnDelete ? res.status(200).send('Producto eliminado') : res.status(400).send('Error al eliminar el producto')    
})

routerCarts.put('/:cid', async(req,res) => {
    const cartId = req.params.cid
    const products = req.body
    const returnUpdate = await cartManager.updateCart(cartId, products)

    returnUpdate ? res.status(200).send('Carrito actualizado') : res.status(400).send('Error al actualizar carro')
})

routerCarts.put('/:cid/products/:pid', async(req,res) => {
    const cartId = req.params.cid
    const prodId = req.params.pid
    const quantity = req.body
    const returnUpdateQty = await cartManager.updateQuantity(cartId, prodId, quantity)

    returnUpdateQty ? res.status(200).send('Cantidad actualizada') : res.status(400).send('Error al actualizar la cantidad')
})

routerCarts.delete('/:cid', async(req,res) => {
    const cartId = req.params.cid
    const returnDelete = await cartManager.deleteAllProducts(cartId);

    returnDelete ? res.status(200).send('Carrito vaciado') : res.status(400).send('Error al vaciar el carro')
})

module.exports = { routerCarts };