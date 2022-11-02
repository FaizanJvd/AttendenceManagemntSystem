const mongoose = require('mongoose')
const leaveRequestSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true 
    },
    date:{
        type:String
    }
});
module.exports = mongoose.model('request',leaveRequestSchema,'requests');
