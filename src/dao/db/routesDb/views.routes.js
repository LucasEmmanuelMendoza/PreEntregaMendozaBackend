const express = require('express')
const routerViews = express.Router()

const ProductManager = require('../productManagerMongo/productManager.js')
const productManager = new ProductManager()

const MessageManager = require('../productManagerMongo/messageManager.js')
const messageManeger = new MessageManager()

routerViews.get('/products', async(req, res) => {
    const products = await productManager.getProducts()

    if(products != false){
        res.render('products', {
            products: products.payload
        })
    }

})

routerViews.get('/realtimeproducts', async(req, res) => {
    const products = await productManager.getProducts()
    
    if(products){
        res.render('realTimeProducts', {
            products: products.payload
        })
    }
})

routerViews.get('/', async(req, res) => {
    const products = await productManager.getProducts()

    if(products){
        res.render('home', {
            products : products.payload
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