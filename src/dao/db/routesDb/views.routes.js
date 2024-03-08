const express = require('express')
const routerViews = express.Router()

const ProductManager = require('../productManagerMongo/productManager.js')
const productManager = new ProductManager()
const MessageManager = require('../productManagerMongo/messageManager.js')
const messageManeger = new MessageManager()
const CartManager = require('../productManagerMongo/cartManager.js')
const cartManager = new CartManager()
const UserManager = require('../productManagerMongo/userManager.js')
const userManager = new UserManager()

routerViews.get('/products', profileAuth, async(req, res) => {
    const products = await productManager.getProducts()
    
    if(products != false){
        res.render('products', {
            products: products.payload,
            user: req.session.user
        })
    }
})

routerViews.get('/carts/:cid', async(req, res) => {
    const cartId = req.params.cid;
    
    const cartProds = await cartManager.getCartById(cartId)

    if(cartProds){
        res.render('cart', {
            products : cartProds.products
        })
    }
})

routerViews.get('/products/details/:pid', async(req, res) => {
    const productId = req.params.pid 

    const product = await productManager.getProductById(productId)
    if(product){
        res.render('productDetails', {
            product: product
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

/////////////////////////////////////////////////////////////
function profileAuth(req, res, next){
    if(req.session.user != null){
        next()
    }
    else{
        res.redirect('/views/login-view')
    }
}

function loginAuth(req, res, next){
    if(req.session.user != null){
        res.redirect('/views/profile-view')
    }
    else{
        next()
    }
}

routerViews.get('/login-view', loginAuth, async(req, res)=> {
    res.render('login')
})

routerViews.get('/register-view', async(req, res)=> {
    res.render('register')
})

routerViews.get('/profile-view', profileAuth, async(req, res)=> {
    res.render('profile',{
            user: req.session.user,
            rol: req.session.rol
        }
    )
})

module.exports = { routerViews };