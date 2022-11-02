const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const studentSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true 
    },
    password:{
        type:String,
        required:true
    },
    picture:{
        type:String
    },
    attendece:[{
        status:String,
        date:String
    }],
    grade:{
        type:String
    },
    tokens: [
        {
            token:{
                type:String,
                required:true
            }
        }
        
    ]

});
studentSchema.methods.generateAuthToken = async function(){
    try{
        let myToken = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:myToken});
        await this.save();
        return myToken;
    }
    catch(err){console.log(err)};

}
module.exports = mongoose.model('student',studentSchema,'students')