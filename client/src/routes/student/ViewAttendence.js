import React, { useEffect, useState } from "react";
import "../../styles/MyCss.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ViewAttendence = () => {
  const [result, setResult] = useState(null);
  useEffect(() => {
    getData();
  },[]);
  const getData = async (e) => {
    const res = await fetch("http://localhost:4000/viewAttendence", {
      method: "GET",
      headers: {
        Accept:"applicatio/json",
        "Content-Type": "application/json",
      },
      credentials:'include'
    });
    const data = await res.json();
    if (res.status === 422) {
      toast.error(data.message);
    }
    if (res.status === 200) {
      setResult(data);
    }
  };
  return (
    <>
      <div className="MarkAttendence-container">
        <div>
          <h1>Attendence Record</h1>
        </div>
        <div>
          <table className="table table-bordered table-hover Attendence-table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
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
                      <td>{result.date}</td>
                      <td>{result.status}</td>
                    </tr>
                  </tbody>
                );
              })
            )}
          </table>
        </div>
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
    </>
  );
};

export default ViewAttendence;
