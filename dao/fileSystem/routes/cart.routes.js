const CartManager = require('../cartManager.js')
const express = require("express");
const routerCarts = express.Router();

const cartManager = new CartManager('./carts.json')
 
routerCarts.post('/', async(req, res) => {
    const returnCreate = await cartManager.createCart()

    returnCreate ? res.status(200).send('Carrito creado') : res.status(400).send('Error al crear el carro')
})

routerCarts.get('/:cid', async(req, res) => {
    const cartId = req.params.cid
    const cart = await cartManager.getCartById(cartId)
    const prods = cart.products

    cart ? res.status(200).send(prods) : res.status(400).send('No se encontró el carrito')
})

routerCarts.post('/:cid/product/:pid', async(req, res) => {
    const cartId = req.params.cid
    const prodId = req.params.pid

    const returnAdd = await cartManager.addProduct(cartId, prodId)

    returnAdd ? res.status(200).send('Producto agregado al carro') : res.status(400).send('Error al agregar producto - id del carro no encontrado')
})

module.exports = { routerCarts };