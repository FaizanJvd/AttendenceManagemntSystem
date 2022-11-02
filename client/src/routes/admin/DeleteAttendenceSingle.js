import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteAttendenceSingle = (props) => {
  const [result, setResult] = useState(null);
  const [reRenderFlag,setrerenderFlag] = useState(true)

  useEffect(() => {
    getData();
  }, []);
  useEffect(()=>{
    getData();
  },[reRenderFlag])
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
    if (res.staatus === 422) {
      toast.error(data.message);
    }
  };

  const deleteClick = async(date)=>{
    const res = await fetch("http://localhost:4000/admin/delete/attendence", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: props.email,
        date:date
      }),
    });
    const data = await res.json();
    if (res.status === 200) {
      toast.success(data.message)
      let flag = reRenderFlag?false:true;
      setrerenderFlag(flag)
    }
    if (res.status === 422) {
      toast.error(data.message);
    }
  }

  return (
    <div>
      <div>
        <h1 className="text-center">Attendence of {props.email}</h1>
        <table className="table table-bordered table-dark table-hover">
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
              <th>Delete</th>
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
                    <td>
                      <button className="btn btn-danger" onClick={()=>{deleteClick(result.date)}}>Delete</button>
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

export default DeleteAttendenceSingle;
