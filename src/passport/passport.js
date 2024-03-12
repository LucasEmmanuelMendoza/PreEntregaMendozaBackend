const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const userModel = require('../dao/db/models/user.model.js')
const { createHash, isValidPassword } = require('../utils/bcrypt.js')
const UserManager = require('../dao/db/productManagerMongo/userManager.js')

const userManager = new UserManager()

const initializePassport = () => {
    passport.use('register', new LocalStrategy(
        {usernameField: email, passReqToCallback: true},
        async(req, username, password, done)=>{
            try{
                let userData = req.body
                let user = await userManager.existsUser({email: username})
                if(user){
                    done('Error, usuario existente')
                }
                let newUser = {
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    email: username, 
                    age: userData.age,
                    password: createHash(userData.password)                 
                }
                let result = await userManager.addUser(newUser)
                done(null, result)
            }catch(error){
                done('Register error: ', error)
            }
        }
    ))
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser((id, done) => {
        let user = userModel.findById(id)
        done(null, user)
    })
}

module.exports = initializePassport