const express = require('express')
const routerUser = express.Router();
const UserManager = require('../dao/db/ManagerMongo/userManager.js')
const userManager = new UserManager()

routerUser.get('/premium/:uid', async(req,res)=>{
    const userId = req.params.uid
    const role = req.session.passport.user.role
    res.render('changeRole',{
        role,
        userId
    })
})

module.exports = { routerUser }