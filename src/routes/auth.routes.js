const passport = require('passport')
//const UserManager = require('../dao/db/productManagerMongo/userManager.js')
const UserManager = require('../controller/userManager.js')
const express = require('express')
const { generaToken } = require('../utils/token.js')
const routerAuth = express.Router()
 
const userManager = new UserManager()

function onlyPremium(req, res, next){
    if(req.session.rol === 'premium'){
        next()
    }else{
        res.redirect('/views/error')
    }
}

function onlyAdmin(req, res, next){
    if(req.session.rol === 'admin'){
       next() 
    }else{
        res.redirect('/views/error')
    }
} 

function onlyUser(req, res, next){
    if(req.session.rol === "user"){
        next()
    }else{
        res.redirect('/views/error')
    }
}

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

const updateLastConnection = async (email) => {
    const currentDate = new Date();
    const currentUser = await userManager.existsUser(email)
    currentUser.last_connection = currentDate
    await userManager.updateUser(currentUser._id, currentUser)
    return currentDate;
}

routerAuth.post('/register', passport.authenticate('register', {failureRedirect:'/auth/failRegister'}), async(req, res) => {
    console.log(req.session.user)
    res.redirect('/views/login-view')
})

routerAuth.get('/failRegister', (req, res) => {
    res.send('Failed register')
})

routerAuth.post('/login', passport.authenticate('login', {failureRedirect:'/auth/failLogin', successRedirect:'/auth/successLogin'}), async(req, res)=>{
    res.redirect('/views/products')
}) 

routerAuth.get('/successLogin', async(req, res) => {
    const currentDate = updateLastConnection(req.session.passport.user.email);
    
    req.session.passport.user.last_connection = currentDate
    req.session.user = req.user.first_name
    req.session.rol = 'usuario'

    if(req.user.email === 'adminCoder@coder.com'){
        req.session.rol = 'admin'
    }
    res.redirect('/views/profile-view')
})

routerAuth.get('/failLogin', (req, res) => {
    res.send('Failed login')
})

routerAuth.get('/logout', async(req, res) => {
    const currentDate = updateLastConnection(req.session.passport.user.email);
    req.session.passport.user.last_connection = currentDate

    req.session.destroy(error => {
        if(error) res.send("Error en logout")
    })

    res.redirect('/views/login-view')
}) 

module.exports = { routerAuth, onlyPremium, onlyAdmin, onlyUser, redirectToLogin, redirectToProfile }

/*//login jwt//
 routerAuth.post('/login', passport.authenticate('jwt', { session: false, failureRedirect: '/auth/failLogin' }), async (req, res) => {
    const token = generaToken(req.user);
    res.cookie("coderSecret2", token, { httpOnly: true})    
    res.redirect('/views/products')
})*/

/*//jwt
routerAuth.get('/logout', async(req, res) => {
    res.clearCookie('cookieToken').send('Cookie eliminada')
    res.redirect('/views/login-view')
})*/