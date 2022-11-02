const Student = require("../models/studentSchema")
const Leave  = require("../models/leaveRequestSchema")
module.exports = {
    register: async (req,res)=>{
        console.log("body",req.body);
        const {email,name,password,picture} = req.body
        if(!email && !name && !password){
            return res.status(422).json({message:"Fill Required Fields"})
        }
        const findStudent =await Student.findOne({email:email});
        if(findStudent){
            return res.status(422).json({message:"Student already exist"})
        }
        const addStudent = new Student({email,name,password,picture})
        const added = await addStudent.save()
        if(added){
            return res.status(200).json({message:"Register Successfully"})
        }
        else{
            return res.status(422).json({message:"Student Registration Fail"})
        }
    },

    login: async (req,res)=>{
        const {email,password}  = req.body;
        const find = await Student.findOne({email:email,password:password});
        if(find){
            const token =await find.generateAuthToken();
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+25892000000),
                httpOnly:true
            });
        return res.status(200).json({message:"LogIn Success"});
        }
        else{
        return res.status(422).json({message:"LogIn Fail"});
        }
    },
    logout: (req,res)=>{
        res.clearCookie('jwtoken', {path: '/', domain: 'localhost'}).status(200).send("ok");
    },

    updatePicture: async (req,res)=>{
        const {picture} = req.body;
        const updatePic = await Student.findByIdAndUpdate({_id:req.userId},{$set:{picture:picture}})
        if(updatePic){
            return res.status(200).json({message:"Image Updated"})
        }
        else{
            return res.status(422).json({message:"Image Not Updated"})
        }
    },

    profileData: async(req,res)=>{
        const data = await Student.findOne({_id:req.userId},{_id:0,email:1,name:1,grade:1,picture:1})
        if(data){
            return res.status(200).send(data)
        }
        else{
            return res.status(422).json({message:"No data Exist"})
        }
    },

    markAttendence : async(req,res)=>{
        const {status} = req.body
        
        // const find = await Student.findOne({$or:[{email:email},{attendece : { $elemMatch: {date: date }}}]})
        const find = await Student.findOne({_id:req.userId})

        if(find){

            const dateObj  = new Date();
            var date = dateObj.getDate().toString().concat("/"+(dateObj.getMonth()+1).toString()+"/"+dateObj.getFullYear().toString())
            // var date = '25/7/2022'

            const check_leave_request = await Leave.findOne({$and:[{_id:req.userId},{date:date}]})
            if(check_leave_request){
                
                return res.status(422).json({message:"Leave Request Already in Progress For "+date})
            }


            const findDate = find.attendece.some(function(elem) { return elem.date == date;}) //({attendece : { $elemMatch: {date: date }}})

            if(findDate==false){

                const update =await  find.updateOne({$push:{attendece:{status:status,date:date}}})

                if(update){
                    return res.status(200).json({message:"Attendence Marked"})
                }
                else{
                    return res.status(422).json({message:"Attendence Not Marked"})
                }
            }


            else{
                return res.status(422).json({message:"Attendence Marked Already For Today  "+date})
            }  
        }
        else{
            return res.status(422).json({message:"Student not Found"})
        }
    },


    viewAttendence : async (req,res)=>{
        const attendenceRecord = await Student.findOne({_id:req.userId},{attendece:1,_id:0})
        if(attendenceRecord){
            return res.status(200).send(attendenceRecord.attendece)
        }
        else{
            return res.status(422).json({messsage:"No Attendence Record Found"})
        }
    },

    leaveRequest : async (req,res)=>{
        const {name} = req.body
        if(!name){
            return res.status(422).json({message:"Enter Name"})
        }
        const find = await Student.findOne({_id:req.userId})
        
        if(find){

            const dateObj  = new Date();
            var date = dateObj.getDate().toString().concat("/"+(dateObj.getMonth()+1).toString()+"/"+dateObj.getFullYear().toString())
            console.log("date ",date);
            const check_leave_request = await Leave.findOne({$and:[{_id:req.userId},{date:date}]})
            if(check_leave_request){
                return res.status(422).json({message:"Leave Request Already in Progress For "+date})
            }
            const findDate = find.attendece.some(function(elem) { return elem.date == date;})
            if(findDate==false){
                let email = req.userEmail;
                const leave  = new Leave({email,name,date})
                const save_leave = await leave.save()
                if(save_leave){
                    return res.status(200).json({message:"Leave Requested Successfully"})
                }
                else{
                    res.status(422).json({message:"Leave Not Requested"})
                }
            }
            else{
                return res.status(422).json({message:"Attendence Marked Already For Today  "+date})
            }  
        }
        else{
            return res.status(422).json({message:"Student not Found"})
        }
    }
    

   
}