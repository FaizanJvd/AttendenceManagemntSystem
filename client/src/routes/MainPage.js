import React from "react";
import pp from "./../images/pngegg.png";
import std from "./../images/student.png";
import adm from "./../images/admin.png";
import {Link} from 'react-router-dom'
import "../styles/Login.css";
const MainPage = () => {
  return (
    <div className="Auth-form-container flex-column">
        <h1 className="text-center fs-1 fw-bold text-primary mb-5"> Attendance Management System</h1>
      <div className="d-flex justify-content-center">
        <img className="h-100" src={pp} alt="bak" />
        <div className="d-flex flex-column ms-5">
          <div>
            <Link to='/studentLogin'>
            
            <button className="border-0 ">
              <img src={std} alt="std" />
            </button>
            <br></br>
            <h3 className="text-primary text-center">Student Panel</h3>
            </Link>
          </div>

          <div className="mt-5">
            <Link to='/adminLogin'><button className="border-0">
              <img src={adm} alt="adm" />
            </button>
            <br></br>
            <h3 className="text-primary text-center">Admin Panel</h3></Link>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
