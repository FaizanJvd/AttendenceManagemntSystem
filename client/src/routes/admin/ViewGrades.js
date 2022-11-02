import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewGrades = () => {
  const [result, setResult] = useState(null);
  const [reRenderFlag, setrerenderFlag] = useState(true);
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getData();
  }, [reRenderFlag]);
  const getData = async () => {
    const res = await fetch("http://localhost:4000/admin/view/grades", {
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
  const assign = async (email) => {
    const res = await fetch("http://localhost:4000/admin/add/grade", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const data = await res.json();
    if (res.status === 200) {
      toast.success(data.message);
      let flag = reRenderFlag ? false : true;
      setrerenderFlag(flag);
    }
    if (res.status === 422) {
      toast.error(data.message)
    }
  };
  return (
    <div>
      <div>
        <table className="table table-bordered table-dark table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Grade</th>
              <th>Assign</th>
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
              return (
                <tbody>
                  <tr>
                    <td>{result.name}</td>
                    <td>{result.grade==null?"--":result.grade}</td>
                    <td>
                      <button className="btn btn-info" onClick={()=>{assign(result.email)}}>
                        Assign Grade
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

export default ViewGrades;
