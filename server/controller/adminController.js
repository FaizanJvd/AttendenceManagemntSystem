const Admin = require("../models/adminSchema")
const Student = require("../models/studentSchema")
const Leave  = require("../models/leaveRequestSchema");

module.exports = {

    login: async (req,res)=>{
        const {email,password}  = req.body;

        // const admin = new Admin({email,password})
        // const s = await admin.save()

        const find = await Admin.findOne({email:email,password:password});
        if(find){
        return res.status(200).json({message:"LogIn Success"});
        }
        else{
        return res.status(422).json({message:" Admin LogIn Fail"});
        }
    },
    viewStudentCatagoryOnly: async (req,res)=>{
        const {from,to,catagory} = req.body
        // const student =await Student.find({},{attendece:{$elemMatch:{$gte:{date:from},$lte:{date:to},status:'present'}}})
        // const student =await Student.find({email:email},{attendece:{$gte:{date:from},$lte:{date:to},status:'present'}})
        if(catagory=='present' || catagory=='absent' || catagory=='leave'){

            const student = await Student.aggregate([
                {
                  $unwind:
                    {
                      path: "$attendece"
                    }
                 },{$match:{"attendece.date":{$gte:from,$lte:to}}},{$group:{_id:{"name":"$name","date":"$attendece.date","status":"$attendece.status"}}},{$sort:{_id:1}}])
                const catagoryOnly = student.filter(function(std){return std._id.status==catagory})
           if(student) {return res.status(200).send(catagoryOnly)}
           else{return res.status(422).json({message:"No found"})}
        }
        else{
            return res.status(422).json({message:"No Status Exist"})
        }
    },
 
    viewAttendenceSummary: async (req,res)=>{
        summary = []
        const emails = await Student.find({},{email:1,name:1,_id:0})
        for(var i=0;i<emails.length;i++){
        //     // var unWindOnEmail = await Student.aggregate([{
        //     //     $unwind:
        //     //       {
        //     //         path: "$attendece"
        //     //       }
        //     //    },{$match:{email:emails[i].email}},{$project:{"attendece.status":1,"_id":0}}])
        //     // var presents = unWindOnEmail.filter(function(present){return present.attendece.status=='absent'})
            var absent = await Student.aggregate( [{
                $unwind:
                    {
                        path: "$attendece"
                    }
                },
                { $match: { $and: [ { email:emails[i].email },{ "attendece.status":'absent'} ] } },
                { $group: { _id: null, count: { $sum: 1 } } }
            ] );
            var present = await Student.aggregate( [{
                $unwind:
                    {
                        path: "$attendece"
                    }
                },
                { $match: { $and: [ { email:emails[i].email },{ "attendece.status":'present'} ] } },
                { $group: { _id: null, count: { $sum: 1 } } }
            ] );
            var leave = await Student.aggregate( [{
                $unwind:
                    {
                        path: "$attendece"
                    }
                },
                { $match: { $and: [ { email:emails[i].email },{ "attendece.status":'leave'} ] } },
                { $group: { _id: null, count: { $sum: 1 } } }
            ] );
            summary[i] = {"present":present.at(0)==undefined?0:present.at(0).count,"absent":absent.at(0)==undefined?0:absent.at(0).count,"leave":leave.at(0)==undefined?0:leave.at(0).count,"email":emails[i].email,"name":emails[i].name};
        }
        

        return res.send(summary)
    },


    viewLeavesRequests: async(req,res)=>{
        const leaveRequest = await Leave.find()
        if(leaveRequest){
            return res.status(200).send(leaveRequest)
        }
        else{
            res.status(422).json({message:"No Request Found"})
        }
    },

    leaveApproval: async (req,res) =>{
        const {email,status,date} = req.body
        const find = await Student.findOne({email:email})
        const approval = await find.updateOne({$push:{attendece:{status:status,date:date}}})
        if(approval){
            await Leave.findOneAndDelete({email:email,date:date})//request deleted when approved
            return res.status(200).json({message:"Leave Approved"})
        }
        else{
            return res.status(422).json({message:"Some problem in leave approval"})
        }
    },

    viewAttendence: async(req,res)=>{
        const {email} = req.body;
        const attendence = await Student.findOne({email:email},{_id:0,attendece:1})
        if(attendence){
            return res.status(200).send(attendence.attendece)
        }
        else{
            return res.status(422).json({message:"No Student Found"})
        }
    },

    addAttendence:async(req,res)=>{
        const {email,status} = req.body;
        const find = await Student.findOne({email:email})

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

    editAttendence: async (req,res)=>{
        const {email,date,status} = req.body
        const update = await Student.updateOne({email:email,"attendece.date":date},{$set:{"attendece.$.status" : status}})
        if(update){
           return res.status(200).json({message:"Attendence updated"})
        }
        else{
            return res.status(422).json({message:"Addendence not updated"})
        }
    },

    deleteAttendence: async (req,res)=>{
        const {email,date} = req.body
        const del = await Student.updateOne({email:email},{$pull:{attendece:{date:date}}})
        if(del){
            return res.status(200).json({message:"Attendence Deleted"})
        }
        else{
            return res.status(422).json({message:"Addendence not Deleted"})
        }
    },

    ViewCompleteAttendenceReport: async (req,res)=>{
        const {from,to} = req.body
        const student = await Student.aggregate([
            {
              $unwind:
                {
                  path: "$attendece"
                }
             },{$match:{"attendece.date":{$gte:from,$lte:to}}},{$group:{_id:{"name":"$name","date":"$attendece.date","status":"$attendece.status"}}},{$sort:{_id:1}}])
        if(student){
            return res.status(200).send(student)
        }
        else{
            return res.status(422).json({message:"No found All"})
        }
    },

    viewAttencenceAll: async (req,res)=>{
        const student = await Student.aggregate([
            {
              $unwind:
                {
                  path: "$attendece"
                }
             },{$group:{_id:{"name":"$name","date":"$attendece.date","status":"$attendece.status"}}},{$sort:{_id:1}}])//.sort({"email":1}).collation({ locale: "en", caseLevel: true,strength:5})
        if(student){
            return res.status(200).send(student)
        }
        else{
            return res.status(422).send({message:"No Data found"})
        }
    },

    addGrades: async (req,res) =>{
        const {email} = req.body
        var present = await Student.aggregate( [{
            $unwind:
                {
                    path: "$attendece"
                }
            },
            { $match: { $and: [ { email:email },{ "attendece.status":'present'} ] } },
            { $group: { _id: null, count: { $sum: 1 } } }
        ] );
        if(present.length>0){
            if((present.at(0).count)>=26){
                const assignGrade = await Student.findOneAndUpdate({email:email},{$set:{grade:"A"}})
                return res.status(200).json({message:"Grade Assigned"})
            }
            if((present.at(0).count)>=15 && (present.at(0)).count< 26){
                const assignGrade = await Student.findOneAndUpdate({email:email},{$set:{grade:"B"}})
                return res.status(200).json({message:"Grade Assigned"})
            }
            if((present.at(0).count)>=10 && (present.at(0).count)< 15){
                const assignGrade = await Student.findOneAndUpdate({email:email},{$set:{grade:"D"}})
                return res.status(200).json({message:"Grade Assigned"})
            }
            if((present.at(0).count)<10){
                const assignGrade = await Student.findOneAndUpdate({email:email},{$set:{grade:"F"}})
                return res.status(200).json({message:"Grade Assigned"})
            }
        }
        else{
            return res.status(422).json({message:"No Present till Now"})
        }
        
    },

    viewGrades: async (req,res)=>{
        const grades = await Student.find({},{name:1,_id:0,grade:1,email:1})
        if(grades){

            return res.status(200).send(grades);
        }
        else{
            return res.status(200).json({message:"No grades to view"})
        }
    }
}