const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const userModel = require('../dao/db/models/user.model.js')
const { createHash, isValidPassword } = require('../utils/bcrypt.js')
const UserManager = require('../dao/db/ManagerMongo/userManager.js')
const CartManager = require('../dao/db/ManagerMongo/cartManager.js')
const github = require('passport-github2')
//const { jwt } = require('jsonwebtoken')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const { CustomError } = require('../services/errors/CustomError.js')
const { EErrors } = require('../services/errors/errors-enum.js')
const { userRegisterErrorInfoENG, userRegisterErrorInfoSP, wrongEmailRegisterErrorENG, wrongEmailRegisterErrorSP } = require('../services/errors/messages/user-register-error.message.js')
const { userLoginErrorInfoSP, userLoginErrorInfoENG } = require('../services/errors/messages/user-login-error.message.js')

const userManager = new UserManager()
const cartManager = new CartManager()

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

const initializePassport = () => {

    const cookieExtractor = function(req){
        let token = null;
        if(req && req.cookies){
            token = req.cookies['cookieToken'];
        }
        return token
    }

    passport.use('jwt', new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: 'coderSecret2'
    }, async (jwt_payload, done) => {
        try{
            return done(null, jwt_payload);
        }catch (error){
            return done('Error en jwt passport', error);
        }
    }));

    passport.use('github', new github.Strategy(
        {
            clientID:"Iv1.5aa2dd9b69a8a249",
            clientSecret:"5403391c3c7749b03b1f2e14aab59f925130adcf",
            callbackURL:"http://localhost:8080/views/callbackGithub"
        },
        async(accessToken, refreshToken, profile, done) => {
            try{
                let {name, email} = profile._json;
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
                        user.last_connection = new Date()
                        return done(null, user)
                    }else{
                        throw CustomError.createError({
                            name: 'User Login Error',
                            cause: userLoginErrorInfoSP(userData),
                            message: 'Usuario o contraseña incorrectos',
                            code: EErrors.INVALID_TYPES_ERROR
                        })
                    }
                }else{
                    throw CustomError.createError({
                        name: 'User Login Error',
                        cause: userLoginErrorInfoSP(userData),
                        message: 'Usuario o contraseña incorrectos',
                        code: EErrors.INVALID_TYPES_ERROR
                    })
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

                    for(const key of Object.keys(newUser)){
                        const field = newUser[key];
                        if (typeof field === 'string' && field.trim() === '' || field === null) {
                            throw CustomError.createError({
                                name: 'User Register Error',
                                cause: userRegisterErrorInfoSP({newUser}),
                                message: 'Error tratando de registrar un usuario',
                                code: EErrors.INVALID_TYPES_ERROR
                            })
                        }
                    }

                    console.log('newUser.email: ', newUser.email)
                    console.log(validateEmail(newUser.email))
                    if(!validateEmail(newUser.email)){ 
                        throw CustomError.createError({
                            name: 'Wrong Register Email',
                            cause: wrongEmailRegisterErrorSP(newUser.email),
                            message: 'Email inválido para el registro',
                            code: EErrors.INVALID_TYPES_ERROR
                        })
                    } 

                    let result = await userManager.addUser(newUser)
                    return done(null, result)
                }
            }catch(error){
                console.log('Error:', error.cause)
                res.status(500).send({error: error.code, message: error.message})
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