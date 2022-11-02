const jwt = require('jsonwebtoken');
const Student = require('../models/studentSchema');

const Authenticate = async (req,res,next)=>{
    try{
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token,process.env.SECRET_KEY)
        const rootUser = await Student.findOne({_id:verifyToken._id,"tokens.token":token});
        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;
        req.userEmail = rootUser.email;
        next();
    }
    catch(err){
        res.status(422).json({message:"UnAuthorized User No Token"})
    }
}
module.exports = Authenticate;