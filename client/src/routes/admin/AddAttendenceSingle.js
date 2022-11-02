import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddAttendenceSingle = (props) => {
  const [status, setStatus] = useState(null);
  let value;
  const handleInput = (e) => {
    value = e.target.value;
    setStatus(value);
  };
  const addClick = async (e) => {
    e.preventDefault()
    const res = await fetch("http://localhost:4000/admin/add/attendence", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: props.email,
        status: status
      }),
    });
    const data = await res.json();
    if (res.status === 200) {
      toast.success(data.message);
    }
    if (res.status === 422) {
      toast.error(data.message);
    }
  };
  return (
    <>
      <div>
        <div>
          <h1 className="text-center">Mark Attendence of {props.email}</h1>
        </div>
        <div className="d-flex justify-content-center mt-5">
          <form method="POST">
            <div className="col-md-6 mb-4" >
              <h6 className="mb-2 pb-1 fs-3">Attendence: </h6>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="status"
                  id="present"
                  value="present"
                  onChange={handleInput}
                />
                <label className="form-check-label" htmlFor="present">
                  Present
                </label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="status"
                  id="absent"
                  value="absent"
                  onChange={handleInput}
                />
                <label className="form-check-label" htmlFor="absent">
                  Absent
                </label>
              </div>
              <div className="mt-4 ">
                <button className="btn btn-primary" onClick={addClick}>Mark</button>
              </div>
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
}

export default AddAttendenceSingle;
