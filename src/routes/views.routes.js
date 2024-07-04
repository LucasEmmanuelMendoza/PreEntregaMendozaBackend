const express = require('express')
const routerViews = express.Router()
const passport = require('passport')
const {onlyPremium, onlyAdmin, onlyUser, onlyPremiumYAdmin, redirectToLogin, redirectToProfile } = require('./auth.routes.js')
const jwt = require('jsonwebtoken')

const ProductManager = require('../dao/db/ManagerMongo/productManager.js')
//const ProductManager = require('../dao/fileSystem/productManager.js')
const productManager = new ProductManager()

const MessageManager = require('../controller/messageManager.js')
const messageManeger = new MessageManager()

const CartManager = require('../dao/db/ManagerMongo/cartManager.js')
const cartManager = new CartManager()

const UserManager = require('../controller/userManager.js')
const userManager = new UserManager()

const generateProduct = require('../config/mocks/products.mocks.js');

routerViews.get('/allUsers', onlyAdmin, async(req, res) => {
    const users = await userManager.getAllUsers()

    res.render('users', {
        users
    })
})

routerViews.get('/products/details/:pid', redirectToLogin, async(req, res) => {
    const productId = req.params.pid 
    const product = await productManager.getProductById(productId)
    const userCartId = req.session.passport.user.cartId
    const userEmail = req.session.passport.user.email;
    const userRole = req.session.passport.user.role;

    if(product){
        res.render('productDetails', {
            product,
            userEmail,
            userCartId, 
            userRole
        })
    }
}) 

routerViews.get('/products', redirectToLogin,  async(req, res) => {
    const products = await productManager.getProducts()
    const role = req.session.passport.user.role
    const userCartId = req.session.passport.user.cartId; 
    const email = req.session.passport.user.email;

    if(products){
        res.render('products', {
            user: req.session.user,
            products: products.map(product => ({ ...product, cartId: userCartId, role, email}))
        })
    } 
})

routerViews.get('/products/mod/:pid', onlyPremiumYAdmin, async(req, res) => {
    const productId = req.params.pid
    const product = await productManager.getProductById(productId)

    if(product){
        res.render('modProd', {
            user: req.session.passport.user.email,
            product: product
        })
    }
})

routerViews.get('/realtimeproducts', onlyPremiumYAdmin, redirectToLogin, async(req, res) => {
    const products = await productManager.getProducts()

    if(products){
        res.render('realtimeproducts', { 
            user: req.session.passport.user.email,
            products: products.map(product => ({...product, user: req.session.passport.user.email}))
        })
    } 
}) 

routerViews.get('/changePasswordView', (req, res) => {
    const token = req.query.token;

    if(token){
        const decoded = jwt.decode(token, { complete: true });
        if(!decoded){
            return res.status(400).send('Invalid Token');
        }

        const currentTime = Math.floor(Date.now() / 1000);
        if(decoded.payload.exp < currentTime){
            return res.status(401).send('Token has expired')
        }
        res.render('changePassword')
    }else{
        return res.status(400).send('Token requerido')
    }
})

routerViews.get('/changePasswordEmailView', (req, res) => {
    res.render('changePasswordEmail',{
    })
})

routerViews.get('/mockingproducts', (req, res) => {
    const products = [];

    for(let i=0; i<100; i++){
        products.push(generateProduct())
    }
    res.render('mockproducts',{
        products: products
    })
})

routerViews.get('/home', async(req, res) => {
    const products = await productManager.getProducts()
    
    if(products != false){
        res.send({
            data: products
        })
    }
})

routerViews.get('/carts/:cid', redirectToLogin, async(req, res) => {
    const cartId = req.params.cid;
    const cartProds = await cartManager.getCartById(cartId)
    
    if(cartProds){
        const totalPrice = cartProds.products.reduce((acumulador, prod) => acumulador += (prod.product.price * prod.quantity), 0);
        const prodsQuantity = cartProds.products.reduce((acumulador, prod) => acumulador += prod.quantity,0)
    
        res.render('cart', {
            cartProducts: (cartProds.products).map(product => ({...product, cartId: cartId})),
            cartId,
            totalPrice,
            prodsQuantity
        })
    }else{
        res.render('error')
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

routerViews.get('/chat', redirectToLogin, async(req, res) => {
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
    const currentUserId = req.session.passport.user._id
    if(currentUserId){
        const currentUser = await userManager.getUserById(currentUserId)
        console.log(currentUser.role)
        res.render(`profile${currentUser.role}`,{
            user: currentUser.toJSON()}
        )
    }
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