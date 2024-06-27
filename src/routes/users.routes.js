const express = require('express');
const { uploader } = require('../utils/multer');
const routerUser = express.Router();/* */
const UserManager = require('../controller/userManager.js');
const { transporter } = require('../config/nodemailer.js');
const userManager = new UserManager() 

routerUser.delete('/deleteUsers', async(req, res) => {
    const dosDiasAntes = new Date()
    dosDiasAntes.setDate(dosDiasAntes.getDate() - 2)
    
    try{
        const users = await userManager.getAllUsers()
        if(users && users.length > 0){
            for(const user of users){
                if(user.last_connection < dosDiasAntes){

                    let mensaje = await transporter.sendMail({
                        from: 'ECommerce <ecommerce@gmail.com>',
                        to: user.email,
                        subject: 'Eliminación de cuenta',
                        text: 'Su cuenta ha sido eliminada por inactividad'
                    })

                    if(!!mensaje.messageId){
                        console.log('Mensaje enviado', mensaje.messageId)
                    }

                    const result = await userManager.deleteOneUser(user._id)

                    if(result){
                        console.log('Usuario eliminado')
                    }
                }  
            }
        }
    }catch(error){
        res.status(500).json('Error')
    }
})

routerUser.get('/allUsers', async(req, res) => {
    const users = await userManager.getAllUsers()
    if(users){
        res.status(200).json(users)
    }
})

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