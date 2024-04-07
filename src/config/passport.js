const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
//const userModel = require('../dao/db/models/user.model.js')
const userModel = require('../models/user.model.js')
const { createHash, isValidPassword } = require('../utils/bcrypt.js')
//const UserManager = require('../dao/db/productManagerMongo/userManager.js')
const UserManager = require('../controller/userManager.js')
const CartManager = require('../controller/cartManager.js')
const github = require('passport-github2')

const userManager = new UserManager()
const cartManager = new CartManager()

const initializePassport = () => {

    passport.use('github', new github.Strategy(
        {
            clientID:"Iv1.5aa2dd9b69a8a249",
            clientSecret:"5403391c3c7749b03b1f2e14aab59f925130adcf",
            callbackURL:"http://localhost:8080/views/callbackGithub"
        },
        async(accessToken, refreshToken, profile, done) => {
            try{
                let {name, email}= profile._json;//esto viene de github, o sea que existe
                let usuario = await userManager.existsUser(email);
                let retorno = ''
                if(usuario == null){
                    const cart = await cartManager.createCart()
                    await userManager.addUser({first_name:name, email, cartId: cart._id, github: profile});
                    retorno = {usuario:name, email: email, cartId: cart._id}
                }else{
                    retorno={usuario:usuario.first_name, email:usuario.email, cartId:usuario.cartId} 
                }
                return done(null, retorno)
            }catch(error){
                return done('Register error: ', error)
            }
        }
    ))

    passport.use('login', new LocalStrategy(
        {usernameField: 'email', passReqToCallback: true},
        async(req, username, password, done)=>{
            try{
                const userData = req.body
                let user = await userManager.existsUser(username)
                if(user !== null){
                    if(isValidPassword(user, userData.password)){
                        return done(null, user)
                    }else{
                        return done(null, 'Usuario o contraseña incorrectos')
                    }
                }else{
                    return done(null, 'Usuario o contraseña incorrectos')
                }
            }catch(error){
                return done(error)
            }
        }
    ))

    passport.use('register', new LocalStrategy(
        {usernameField: 'email', passReqToCallback: true},
        async(req, username, password, done)=>{
            try{
                let userData = req.body
                let user = await userManager.existsUser(username)
                if(user){
                    return done('Error, usuario existente')
                }else{
                    const cart = await cartManager.createCart()
                    let newUser = {
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    email: username, 
                    age: userData.age,
                    password: createHash(password),
                    cartId: cart._id            
                }
                    let result = await userManager.addUser(newUser)
                    return done(null, result)
                }
            }catch(error){
                done('Register error: ', error)
            }
        }
    ))

    passport.serializeUser(function(user, done) {
        done(null, user);
      });
      
      passport.deserializeUser(function(user, done) {
        done(null, user);
      });

}

module.exports = initializePassport 