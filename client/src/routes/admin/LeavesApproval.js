import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LeavesApproval = () => {
  const [result, setResult] = useState(null);
  const [reRenderFlag, setrerenderFlag] = useState(true);
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getData();
  }, [reRenderFlag]);
  const getData = async () => {
    const res = await fetch("http://localhost:4000/admin/view/leaveRequests", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.status === 200) {
      setResult(data);
    }
    if (res.status === 422) {
      toast.error(data.message);
    }
  };
  const approval = async (email, date, status) => {
    const res = await fetch("http://localhost:4000/admin/set/leaveApproval", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        date: date,
        status: status,
      }),
    });
    const data = await res.json();
    if (res.status === 200) {
      toast.success(data.message);
      let flag = reRenderFlag ? false : true;
      setrerenderFlag(flag);
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
              <th>Date</th>
              <th>Approve</th>
              <th>Deny</th>
            </tr>
          </thead>
          {result === null ? (
            <tbody>
              <tr>
                <td>No Record </td>
              </tr>
            </tbody>
          ) : (
            result.map((result) => {
              // const { id, name, email } = user;
              return (
                <tbody>
                  <tr>
                    <td>{result.name}</td>
                    <td>{result.email}</td>
                    <td>{result.date}</td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={()=>{approval(result.email,result.date, "leave")}}
                      >
                        Approve
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={()=>{approval(result.email,result.date, "leave")}}
                      >
                        Deny
                      </button>
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

export default LeavesApproval;
