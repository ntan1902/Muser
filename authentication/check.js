const checkAuthen = (req,res,next) =>{
    if(req.isAuthenticated()){
        next()
    }
    else{
        return res.redirect('/account/signin')
    }
}

module.exports = checkAuthen