var express = require('express');
var router = express.Router();
const control = require('../controller/adminController')

router.get('/', function(req, res, next) {
    res.send('Hello from Profile');
});
router.post('/login',control.login)
// Attendence Module
router.post('/add/attendence/',control.addAttendence) 
router.put('/edit/attendence',control.editAttendence)
router.delete('/delete/attendence',control.deleteAttendence)
router.post('/view/attendence',control.viewAttendence)// Attendece of specific user.

//Report Module
router.post('/view/attendence/report/catagoryOnly',control.viewStudentCatagoryOnly)
router.post('/view/attendence/report/all',control.ViewCompleteAttendenceReport)
router.get('/view/attendence/all',control.viewAttencenceAll)


//Leave Module 
router.get('/view/leaveRequests',control.viewLeavesRequests)
router.put('/set/leaveApproval',control.leaveApproval)
router.get('/view/attendence/summary',control.viewAttendenceSummary)

// Grading Module
router.get('/view/grades',control.viewGrades)
router.put('/add/grade',control.addGrades)
module.exports = router;