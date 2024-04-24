const express = require('express')
const routerViews = express.Router()
const passport = require('passport')
const {onlyAdmin, onlyUser, redirectToLogin, redirectToProfile } = require('./auth.routes.js')

const ProductManager = require('../dao/db/ManagerMongo/productManager.js')
//const ProductManager = require('../dao/fileSystem/productManager.js')
const productManager = new ProductManager()

const MessageManager = require('../controller/messageManager.js')
const messageManeger = new MessageManager()

const CartService = require('../services/cartService.js')
const cartManager = new CartService()

routerViews.get('/products', redirectToLogin,  async(req, res) => {
    const products = await productManager.getProducts()
    const userCartId = req.session.passport.user.cartId;
    if(products){
        res.render('products', { 
            user:req.session.user,
            cartId: userCartId,
            products: products.map(product => ({ ...product, cartId: userCartId }))
        })
    } 
})

routerViews.get('/home', async(req, res) => {
    const products = await productManager.getProducts()
    //console.log(products)
    if(products != false){
        res.send({
            data: products
        })
    }
})

routerViews.get('/carts/:cid', redirectToLogin, async(req, res) => {
    const cartId = req.params.cid;
    const cartProds = await cartManager.findCartById(cartId)

    const totalPrice = cartProds.products.reduce((acumulador, prod) => acumulador += prod.product.price * prod.quantity, 0);
    const prodsQuantity = cartProds.products.reduce((acumulador, prod) => acumulador += prod.quantity,0)

    if(cartProds){
        res.render('cart', {
            products : cartProds.products,
            cartId,
            totalPrice,
            prodsQuantity
        })
    }
})

routerViews.get('/products/details/:pid', redirectToLogin, async(req, res) => {
    const productId = req.params.pid 

    const product = await productManager.getProductById(productId)
    if(product){
        res.render('productDetails', {
            product: product
        })
    }
})

routerViews.get('/realtimeproducts', onlyAdmin, redirectToLogin, async(req, res) => {
    const limit = req.params.limit;
    const page = req.params.page;
    const category = req.params.category;
    const priceSort = req.params.priceSort;
    const products = await productManager.getProductsPaginate(limit, page, category, priceSort)
    
    if(products){
        res.render('realTimeProducts', {
            products: products.payload
        })
    }
})

routerViews.get('/', redirectToLogin, async(req, res) => {
    const products = await productManager.getProductsPaginate()
    const userCartId = req.session.passport.user.cartId;
    if(products){
        res.render('home', {
            cartId: userCartId,
            products : products.payload
        })
    }
})

routerViews.get('/chat', onlyUser, redirectToLogin, async(req, res) => {
    const messages = await messageManeger.getMessages()
    if(messages){
        res.render('chat', {
            messages: messages
        })
    }
})

routerViews.get('/error', async(req, res) => {
    res.render('error')
})

routerViews.get('/login-view', redirectToProfile, async(req, res)=> {
    res.render('login')
})

routerViews.get('/register-view', redirectToProfile, async(req, res)=> {
    res.render('register')
})

routerViews.get('/profile-view', redirectToLogin, async(req, res)=> {
    res.render('profile',{
            user: req.session.user,
            rol: req.session.rol
        }
    )
})

routerViews.get('/github', passport.authenticate('github', {}), (req, res)=>{})
routerViews.get('/callbackGithub', redirectToProfile, passport.authenticate('github', {successRedirect: '/views/successGithub'}), (req, res) => {
})

routerViews.get('/successGithub', (req, res)=>{
    req.session.user = req.user.usuario
    req.session.rol = 'usuario'
    if(req.user.usuario === 'adminCoder@coder.com'){
        req.session.rol = 'admin'
    }
    res.redirect('/views/profile-view')
})

module.exports = { routerViews };