const passport = require('passport')
const UserManager = require('../dao/db/productManagerMongo/userManager.js')
const express = require('express')
const routerAuth = express.Router()

const userManager = new UserManager()

/* routerAuth.post('/register', async(req, res) => {
    const newUser = req.body
    if(newUser.first_name != "" && newUser.last_name != "" && newUser.email != "" && newUser.age != "" && newUser.password != ""){
        const existeUser = await userManager.existsUser(newUser.email)
        if(existeUser){
            res.redirect('/views/register-view')
        }else{
            await userManager.addUser(newUser)
            res.redirect('/views/login-view')
        }
    }else{
        
    }
}) */

routerAuth.post('/register', passport.authenticate('register', {failureRedirect:'/auth/failRegister'}), async(req, res) => {
    res.redirect('/views/login-view')
})

routerAuth.get('failRegister', (req, res) => {
    res.send('Failed register')
})

routerAuth.post('/login', async(req, res) => {
    const newUser = req.body
    const existeUser = await userManager.existsUser(newUser.email) 
    if(existeUser.password === newUser.password && existeUser.email === newUser.email){
        req.session.user = newUser.email
        req.session.rol = "usuario" 
        if(newUser.email === "adminCoder@coder.com"){
            req.session.rol = "admin"
        }
        res.redirect('/views/products')
    }else{
        res.send('Usuario o contraseña incorrectos')
    }
})

routerAuth.get('/logout', async(req, res) => {
    req.session.destroy(error => {
        if(error) res.send("Error en logout")
    })
    res.redirect('/views/login-view')
})


module.exports = { routerAuth }