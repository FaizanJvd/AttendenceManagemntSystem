var express = require('express');
var router = express.Router();
const control = require('../controller/studentController')
const authenticate = require('../middleware/authenticate')
router.get('/', function(req, res, next) {
    res.send('Hello from Profile');
});
router.post('/Login',control.login)
router.post('/register',control.register);
router.get('/profile',authenticate,control.profileData)
router.post('/markAttendence',authenticate,control.markAttendence)
router.post('/leaveRequest',authenticate,control.leaveRequest)
router.put('/update/picture',authenticate,control.updatePicture)
router.get('/viewAttendence',authenticate,control.viewAttendence)
router.get('/logout',authenticate,control.logout)
module.exports = router;