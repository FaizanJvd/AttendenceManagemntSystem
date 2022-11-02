import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Dashboard = (props) => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const res = await fetch(
      "http://localhost:4000/admin/view/attendence/summary",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (res.status === 200) {
      setResult(data);
    }
    if (res.status === 422) {
      toast.error(data.message);
    }
  };
  return (
    <div>
      <div>
        <table className="table table-bordered table-dark table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Presents</th>
              <th>Absents</th>
              <th>Leaves</th>
              <th>View</th>
              <th>Add</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          {result === null ? (
            <tr>
              <td>No Record </td>
            </tr>
          ) : (
            result.map((result) => {
              // const { id, name, email } = user;
              return (
                <tbody>
                  <tr>
                    <td>{result.name}</td>
                    <td>{result.email}</td>
                    <td>{result.present}</td>
                    <td>{result.absent}</td>
                    <td>{result.leave}</td>
                    <td>
                      <Link to="/adminRoutes/viewStudent/attendence">
                        <button className="btn btn-info" onClick={()=>{props.onChange(result.email)}}>View</button>
                      </Link>
                    </td>
                    <td>
                      <Link to="/adminRoutes/addStudent/attendence">
                        <button className="btn btn-primary" onClick={()=>{props.onChange(result.email)}}>Add</button>
                      </Link>
                    </td>
                    <td>
                      <Link to="/adminRoutes/editStudent/attendence">
                        <button className="btn btn-success" onClick={()=>{props.onChange(result.email)}}>Edit</button>
                      </Link>
                    </td>
                    <td>
                      <Link to="/adminRoutes/deleteStudent/attendence" >
                        <button className="btn btn-danger" onClick={()=>{props.onChange(result.email)}}>Delete</button>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              );
            })
          )}
        </table>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Dashboard;
