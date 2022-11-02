import MainPage from './routes/MainPage'
import React,{useState} from 'react';
import { Route, Routes} from "react-router-dom";
import StudentLogin from './routes/student/StudentLogin';
import AdminLogin from './routes/admin/AdminLogin';
import Register from './routes/student/Register';
import AdminRoutes from './routes/admin/AdminRoutes';
import ViewAttendence from "./routes/student/ViewAttendence";
import Grades from "./routes/admin/ViewGrades";
import StudentRoutes from './routes/student/StudentRoutes';
import Profile from './routes/student/Profile';
import MarkAttendence from './routes/student/MarkAttendence'
import LeaveRequest from './routes/student/LeaveRequest'
import Dashboard from './routes/admin/Dashboard';
import AddAttendenceSingle from './routes/admin/AddAttendenceSingle';
import EditAttendenceSingle from './routes/admin/EditAttendenceSingle';
import DeleteAttendenceSingle from './routes/admin/DeleteAttendenceSingle';
import ViewAttendenceSingle from './routes/admin/ViewAttendenceSingle';
import LeavesApproval from './routes/admin/LeavesApproval';
import AttendenceReport from './routes/admin/AttendenceReport';
import AdminLogout from './routes/admin/AdminLogout';
import StudentLogout from './routes/student/StudentLogout';
function App() {
  var [email,setEmail] = useState("")
  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<MainPage/>} />
          <Route path='/adminLogin' element={<AdminLogin/>} />
          <Route path='/studentLogin' element={<StudentLogin/>} />
          <Route path='/adminLogout' element={<AdminLogout/>} />
          <Route path='/studentLogout' element={<StudentLogout/>} />

          <Route path='/adminRoutes'  element={<AdminRoutes/>} >
            <Route exact path="/adminRoutes/" element={<Dashboard onChange={(value)=>setEmail(value)}/>} />
            <Route exact path="/adminRoutes/addStudent/attendence" element={<AddAttendenceSingle email={email}/>}/>
            <Route exact path="/adminRoutes/editStudent/attendence" element={<EditAttendenceSingle email={email}/>}/>
            <Route exact path="/adminRoutes/deleteStudent/attendence" element={<DeleteAttendenceSingle email={email}/>}/>
            <Route exact path="/adminRoutes/viewStudent/attendence" element={<ViewAttendenceSingle email={email}/>}/>
            <Route exact path="/adminRoutes/grades" element={<Grades/>} />
            <Route exact path="/adminRoutes/leaveApproval" element={<LeavesApproval/>} />
            <Route exact path="/adminRoutes/reportAll" element={<AttendenceReport/>} />
          </Route>

          <Route path='/studentRoutes' element={<StudentRoutes/>}>
            <Route excat path="/studentRoutes/" element={<Profile/>}/>
            <Route excat path="/studentRoutes/markAttendence" element={<MarkAttendence/>}/>
            <Route excat path="/studentRoutes/leaveRequest" element={<LeaveRequest/>}/>
            <Route excat path="/studentRoutes/viewAttendence" element={<ViewAttendence/>}/>
          </Route>

          <Route path='/register' element={<Register/>} />
        </Routes>

      </div>
    </>
  );
}

export default App;
