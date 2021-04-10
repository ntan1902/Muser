

const passport = require("passport")
const initializePassport = require("../passport/passport");
const creden = require("../config/account.json")
initializePassport(
    passport,
    (email, password) => {
        if(email==creden.username && password == creden.password){
            return {
                id:'#111',
                name: 'Administrator',
            }
        }
        return null
    },
    (id) => {
        return verify(id)
    }
);

const verify = (id) =>{
    if(id=='#111'){
        return {
            id:'#111',
            name: 'admin',
        }
    }
}