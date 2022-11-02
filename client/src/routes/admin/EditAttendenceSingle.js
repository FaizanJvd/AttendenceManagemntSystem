import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const EditAttendenceSingle = (props) => {
  const [result, setResult] = useState(null);
  const [reRenderFlag, setrerenderFlag] = useState(true);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState(null);
  function editDate(dt) {
    setDate(dt);
  }
  let value;
  const handleInput = (e) => {
    value = e.target.value;
    setStatus(value);
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getData();
  }, [reRenderFlag]);
  const getData = async () => {
    const res = await fetch("http://localhost:4000/admin/view/attendence", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: props.email,
      }),
    });
    const data = await res.json();
    if (res.status === 200) {
      setResult(data);
    }
    if (res.status === 422) {
      toast.error(data.message);
    }
  };

  const editClick = async () => {
    const res = await fetch("http://localhost:4000/admin/edit/attendence", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: props.email,
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
        <h1 className="text-center">Attendence of {props.email}</h1>
        <table className="table table-bordered table-dark table-hover">
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
              <th>Edit</th>
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
                    <td>{result.date}</td>
                    <td>{result.status}</td>
                    {/* ()=>{editClick(result.date,result.status)} */}
                    <td>
                      <button
                        type="button"
                        className="btn btn-success"
                        data-bs-toggle="modal"
                        data-bs-target="#myModal"
                        onClick={() => {
                          editDate(result.date);
                        }}
                      >
                        Edit
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
      <div className="modal" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* <!-- Modal Header --> */}
            <div className="modal-header">
              <h4 className="modal-title">Edit Profile</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            {/* <!-- Modal body --> */}
            {/* <div className="modal-body">{u_id}</div> */}
            <div className="container">
              <form>
                <div className="col-md-6 mb-4">
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
                </div>
              </form>
            </div>
            {/* <!-- Modal footer --> */}
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-success"
                value="submit"
                onClick={editClick}
              >
                Submit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAttendenceSingle;
