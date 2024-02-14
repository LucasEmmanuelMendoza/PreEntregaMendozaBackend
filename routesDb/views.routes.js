const express = require('express')
const routerViews = express.Router()

const ProductManager = require('../dao/db/productManagerMongo/productManager.js')
const productManager = new ProductManager()

const MessageManager = require('../dao/db/productManagerMongo/messageManager.js')
const messageManeger = new MessageManager()

routerViews.get('/realtimeproducts', async(req, res) => {
    const products = await productManager.getProducts()
    
    if (products) {
        res.render('realTimeProducts', {
            products: products
        })
    }
})

routerViews.get('/', async(req, res) => {
    const products = await productManager.getProducts()

    if(products) {
        res.render('home', {
            products : products
        })
    }
})

routerViews.get('/chat', async(req, res) => {
    const messages = await messageManeger.getMessages()

    if(messages){
        res.render('chat', {
            messages: messages
        })
    }
})

routerViews.get('/cart', async(req, res) => {
    const products = await productManager.getProducts()

    if(products){
        res.render('cart', {
            products : products
        })
    }
})



module.exports = { routerViews };