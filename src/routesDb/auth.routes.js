const passport = require('passport')
const UserManager = require('../dao/db/productManagerMongo/userManager.js')
const express = require('express')
const routerAuth = express.Router()

routerAuth.post('/register', passport.authenticate('register', {failureRedirect:'/auth/failRegister'}), async(req, res) => {
    res.redirect('/views/login-view')
})
routerAuth.get('/failRegister', (req, res) => {
    res.send('Failed register')
})

routerAuth.post('/login', passport.authenticate('login', {failureRedirect:'/auth/failLogin', successRedirect:'/auth/successLogin'}), async(req, res)=>{
    const datos = req.body
    res.redirect('/views/products')
})

routerAuth.get('/successLogin', (req, res) => {
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
    req.session.destroy(error => {
        if(error) res.send("Error en logout")
    })
    res.redirect('/views/login-view')
})

module.exports = { routerAuth }