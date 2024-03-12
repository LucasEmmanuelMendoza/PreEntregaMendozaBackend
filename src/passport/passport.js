const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const userModel = require('../dao/db/models/user.model.js')
const { createHash, isValidPassword } = require('../utils/bcrypt.js')
const UserManager = require('../dao/db/productManagerMongo/userManager.js')
const github = require('passport-github2')

const userManager = new UserManager()

const initializePassport = () => {

    passport.use('github', new github.Strategy(
        {
            clientID:"Iv1.5aa2dd9b69a8a249",
            clientSecret:"5403391c3c7749b03b1f2e14aab59f925130adcf",
            callbackURL:"http://localhost:8080/views/callbackGithub"
        },
        async(accessToken, refreshToken, profile, done) => {
            try{
                console.log(profile)
                let {name, email}= profile._json
                let usuario = await userManager.existsUser(email)
                if(!usuario){
                    usuario = await userManager.addUser(
                        {nombre:name, email, github:profile}
                    )}
                return done(null, usuario)
            }catch(error){
                done('Register error: ', error)
            }
        }
    ))

    passport.use('register', new LocalStrategy(
        {usernameField: 'email', passReqToCallback: true},
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
        done(null, user.id)
    })
    passport.deserializeUser(async(id, done) => {
        try {
            let user = await userModel.findById(id).exec();
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    })
}

module.exports = initializePassport 