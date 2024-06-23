const express = require('express');
const { uploader } = require('../utils/multer');
const routerUser = express.Router();/* */
const UserManager = require('../controller/userManager.js')
const userManager = new UserManager() 

routerUser.get('/premium/:uid', async(req,res) => {
    const userId = req.params.uid
    const user = await userManager.getUserById(userId)
    console.log('user:', user)
    if(req.session.passport.user){ 
        console.log('rol userIdSession: ', req.session.passport.user.role)
        console.log('rol userIdManager: ', user.role)
        res.render('changeRole',{
            role: req.session.passport.user.role,
            userId
        })
    }else{
        res.send('Error')
    }
})

routerUser.get('/:uid/documents', async(req, res) => {
    //const user = req.session.passport.user
    const userId = req.params.uid  
    res.render('documents', {
        userId
    })
})

routerUser.post('/:uid/documents', uploader.single('pathArchivo'), async(req, res) => {
    const user = req.session.passport.user
    console.log(req.file)
    console.log(req.file.path)
})

module.exports = { routerUser }