import React, { useState } from "react";
import "../../styles/MyCss.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LeaveRequest = () => {
  const [name, setName] = useState("");
  const handleInput = (e) => {
    let val = e.target.value;
    setName(val);
  };
  const postData = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/leaveRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
      credentials:'include'
    });
    const data = await res.json();
    if (res.status === 422) {
      toast.error(data.message);
    }
    if (res.status === 200) {
      toast.success(data.message);
    }
  };
  return (
    <>
      <div className="MarkAttendence-container">
        <div>
          <h1 className="text-center">Apply For Leave Request</h1>
        </div>
        <div className="mt-4">
          <form method="POST">
            <div>
              <label>Name:</label>
              <input
                className="mx-2"
                tpye="text"
                name="name"
                onChange={handleInput}
                placeholder="Enter Name"
              />
            </div>
            <div className="mt-4 mx-5">
              <button className="btn btn-primary" onClick={postData}>
                Request
              </button>
            </div>
          </form>
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

export default LeaveRequest;
