var createError = require('http-errors');
var cors = require('cors')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')

var studentRouter = require('./app_Endpoints/student');
var adminRouter = require('./app_Endpoints/admin');
require("dotenv").config({path:"./config.env"});
var app = express();
var corsOptions = {
  origin: 'http://localhost:3000',
  credentials:  true
}

app.use(cors(corsOptions))
app.use(cookieParser());
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept,Authorization"
//   );
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
//   next();
// });
app.use(express.json({limit: '50mb'}));//used to get large data in requests
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

// Connection to Local MongoDb
mongoose.connect(process.env.URL).then(() => {
  console.log('connected to Mongo Atlas')
}).catch((err) => console.log(err));


app.use('/', studentRouter);
app.use('/admin', adminRouter);

const port = 4000;
app.listen(port,()=>{
  console.log(`Server running at Port ${port}`);
});

module.exports = app;
