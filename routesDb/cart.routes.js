const CartManager = require('../dao/db/productManagerMongo/cartManager.js')
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

    cart ? res.status(200).send(products) : res.status(400).send("Carrito no encontrado")
})

routerCarts.post('/:cid/product/:pid', async(req, res) => {
    const cartId = req.params.cid
    const prodId = req.params.pid

    const returnAdd = await cartManager.addProduct(cartId, prodId)

    returnAdd ? res.status(200).send("Producto agregado al carro") : res.status(400).send("Error al agregar producto al carro")
})

module.exports = { routerCarts };