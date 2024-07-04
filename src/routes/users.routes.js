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

    if(req.session.passport.user){ 
        res.render('changeRole',{
            role: user.role,
            userId
        })
    }else{
        res.send('Error')
    }
})

routerUser.get('/:uid/documents', async(req, res) => {
    const userId = req.params.uid  
    res.render('documents', {
        userId
    })
})
//uploader.single('pathArchivo')
routerUser.post('/:uid/documents', uploader.fields([
    { name: 'identificacion', maxCount: 1 },
    { name: 'domicilio', maxCount: 1 },
    { name: 'estadoCuenta', maxCount: 1 }]), 

    async(req, res) => {
    const user = req.session.passport.user
    const userActual = await userManager.getUserById(user._id)
   console.log(userActual)

    if(req.files.identificacion){
        const newDoc = {
            name: 'identificacion',
            reference: req.files.identificacion[0].path
        }
        userActual.documents.push(newDoc)
        await userManager.updateUser(user._id, userActual)
    }
    if(req.files.domicilio){
        const newDoc = {
            name: 'domicilio',
            reference: req.files.domicilio[0].path
        }
        userActual.documents.push(newDoc)
        
        await userManager.updateUser(user._id, userActual)
    }
    if(req.files.estadoCuenta){
        const newDoc = {
            name: 'estadoCuenta',
            reference: req.files.estadoCuenta[0].path
        }
        userActual.documents.push(newDoc)
        
        await userManager.updateUser(user._id, userActual)
    }
})

module.exports = { routerUser }