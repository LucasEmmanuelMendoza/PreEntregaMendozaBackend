const passport = require('passport')
//const UserManager = require('../dao/db/productManagerMongo/userManager.js')
const UserManager = require('../controller/userManager.js')
const express = require('express')
const { generaToken } = require('../utils/token.js')
const routerAuth = express.Router()
 
const userManager = new UserManager()

async function onlyPremiumYAdmin (req, res, next){
    const currentUser = await userManager.getUserById(req.session.passport.user._id)
    if(currentUser.role === 'premium' || currentUser.role === 'admin'){
        next()
    }else{
        res.redirect('/views/error')
    }
}

async function onlyPremium (req, res, next){
    const currentUser = await userManager.getUserById(req.session.passport.user._id)
    if(currentUser.role === 'premium'){
        next()
    }else{
        res.redirect('/views/error')
    }
}

async function onlyAdmin(req, res, next){
    const currentUser = await userManager.getUserById(req.session.passport.user._id)
    if(currentUser.role === 'admin'){
       next() 
    }else{
        res.redirect('/views/error')
    }
} 

function onlyUser(req, res, next){
    if(req.session.role === "user"){
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
    res.redirect('/views/login-view')
})

routerAuth.get('/failRegister', (req, res) => {
    res.send('Failed register')
})

routerAuth.post('/login', passport.authenticate('login', {failureRedirect:'/auth/failLogin', successRedirect:'/auth/successLogin'}), async(req, res)=>{
    res.redirect('/views/products')
}) 

routerAuth.get('/successLogin', async(req, res) => {
    const currentDate = await updateLastConnection(req.session.passport.user.email);
    req.session.passport.user.last_connection = currentDate
    
    req.session.userId = req.session.passport.user._id
    req.session.user = req.user.first_name
    req.session.role = 'usuario'

    if((req.session.passport.user.email).trim() === 'adminCoder@coder.com'){
        req.session.passport.user.role = 'admin'
        await userManager.updateUser(req.session.passport.user._id, req.session.passport.user)
        req.session.role = 'admin'
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

module.exports = { routerAuth, onlyPremium, onlyAdmin, onlyUser, redirectToLogin, redirectToProfile, onlyPremiumYAdmin }
