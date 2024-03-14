const express = require('express')
const routerViews = express.Router()
const passport = require('passport')

const ProductManager = require('../dao/db/productManagerMongo/productManager.js')
const productManager = new ProductManager()
const MessageManager = require('../dao/db/productManagerMongo/messageManager.js')
const messageManeger = new MessageManager()
const CartManager = require('../dao/db/productManagerMongo/cartManager.js')
const cartManager = new CartManager()
const UserManager = require('../dao/db/productManagerMongo/userManager.js')
const userManager = new UserManager()

routerViews.get('/products', redirectToLogin, async(req, res) => {
    const products = await productManager.getProducts()
    
    if(products != false){
        res.render('products', {
            products: products.payload,
            user: req.session.user
        })
    }
})

routerViews.get('/carts/:cid', redirectToLogin, async(req, res) => {
    const cartId = req.params.cid;
    
    const cartProds = await cartManager.getCartById(cartId)

    if(cartProds){
        res.render('cart', {
            products : cartProds.products
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

routerViews.get('/realtimeproducts', redirectToLogin, async(req, res) => {
    const products = await productManager.getProducts()
    
    if(products){
        res.render('realTimeProducts', {
            products: products.payload
        })
    }
})

routerViews.get('/', redirectToLogin, async(req, res) => {
    const products = await productManager.getProducts()

    if(products){
        res.render('home', {
            products : products.payload
        })
    }
})

routerViews.get('/chat', redirectToLogin, async(req, res) => {
    const messages = await messageManeger.getMessages()

    if(messages){
        res.render('chat', {
            messages: messages
        })
    }
})

/////////////////////////////////////////////////////////////
function redirectToLogin(req, res, next){
    if(req.session.user != null){
        next()
    }
    else{
        res.redirect('/views/login-view')
    }
}

function redirectToProfile(req, res, next){
    if(req.session.user != null){
        res.redirect('/views/profile-view')
    }
    else{
        next()
    }
}

routerViews.get('/login-view', redirectToProfile, async(req, res)=> {
    res.render('login')
})
routerViews.get('/register-view', redirectToProfile, async(req, res)=> {
    res.render('register')
})

routerViews.get('/github', passport.authenticate('github', {}), (req, res)=>{})
routerViews.get('/callbackGithub', redirectToProfile, passport.authenticate('github', {}), (req, res) => {
   req.session.user = "User"
   //req.user devuelve true y req en passport - github no anda
   //console.log(req.user)
   //return res.status(200).json({payload:req.user}) 
    res.redirect('/views/profile-view')
})

routerViews.get('/profile-view', redirectToLogin, async(req, res)=> {
    res.render('profile',{
            user: req.session.user,
            rol: req.session.rol
        }
    )
})

module.exports = { routerViews };