const jwt = require('jsonwebtoken');
// This module is to verify the token

module.exports = function(req,res,next){
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send("Access Denied");
    }
    try{
        const verified = jwt.verify(token,process.env.TOKEN)
        req.user = verified;
        next();
    }
    catch(err){
        res.status(400).send("Invalid token");
        }
    
}
