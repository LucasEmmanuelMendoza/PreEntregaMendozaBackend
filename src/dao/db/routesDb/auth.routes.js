const UserManager = require('../productManagerMongo/userManager.js')
const express = require('express')
const routerAuth = express.Router()

const userManager = new UserManager()

routerAuth.post('/register', async(req, res) => {
    const newUser = req.body
    const existeUser = await userManager.existsUser(newUser.username) 

    if(existeUser){
        res.status(401).send("Usuario existente")
    }else{
        await userManager.addUser(newUser)
        res.redirect('/views/login-view')
    }
})

routerAuth.post('/login', async(req, res) => {
    const newUser = req.body
    const existeUser = await userManager.existsUser(newUser.username) 
    
    if(existeUser.password === newUser.password && existeUser.username === newUser.username){
        req.session.user = newUser.username
        req.session.rol = "usuario" 
        if(newUser.username === "adminCoder@coder.com"){
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