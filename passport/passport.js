const LocalStategy = require("passport-local").Strategy

function initPassport(passport,findByCredential,findUserByID){
    const authenticateUser= async (username,password,done)=>{
        try{
            const user = await findByCredential(username,password)
            console.log(user)
            if(!user){
                return done(null,false,{message:'Wrong username or password'})
            }
            else{
                return done(null,user)
            }
        }catch(e){
            return done(null,e)
        }
    }
    passport.use(new LocalStategy({usernameField: 'email',passwordFieldL:'password'}, authenticateUser))
    passport.serializeUser((user,done)=>{
        done(null,user)
    })
    passport.deserializeUser(async (user,done)=>{
        done(null, await findUserByID(user._id))
    })
}
module.exports = initPassport