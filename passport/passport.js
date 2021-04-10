const LocalStategy = require("passport-local").Strategy

function initPassport(passport,findByCredential,findUserByID){
    const authenticateUser= (username,password,done)=>{
        try{
            const user = findByCredential(username,password)
            console.log(user)
            if(user==null){
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
        done(null,user.id)
    })
    passport.deserializeUser(async (id,done)=>{
        done(null, findUserByID(id))
    })
}
module.exports = initPassport