import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AttendenceReport = () => {
  const [result, setResult] = useState(null);
  const [reRenderFlag, setrerenderFlag] = useState(true);
  const [fields, setFields] = useState({ from: "",to: "",status:null});
  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setFields({ ...fields, [name]: value });
  };
  useEffect(() => {
    getData();
  }, []);
    useEffect(() => {

    }, [reRenderFlag]);
  const getData = async () => {
    const res = await fetch("http://localhost:4000/admin/view/attendence/all", {
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
  const searchClick =async (e)=>{
    e.preventDefault()
    const { from, to,status} = fields;
    if(status===null || status===""){
        const res = await fetch("http://localhost:4000/admin/view/attendence/report/all", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from,
            to
        }),
        });
        const data = await res.json();
        if (res.status === 200) {
            setResult(data)
            let flag = reRenderFlag ? false : true;
            setrerenderFlag(flag);
        }
    if (res.status === 422) {
      toast.error(data.message)
    }
    }
    else{
        const res = await fetch("http://localhost:4000/admin/view/attendence/report/catagoryOnly", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from,
                to,
                catagory:status
            }),
            });
            const data = await res.json();
            if (res.status === 200) {
                setResult(data)
                let flag = reRenderFlag ? false : true;
                setrerenderFlag(flag);
            }
        if (res.status === 422) {
          toast.error(data.message)
        }
    }
  }
  return (
    <div>
      <div className="  mt-3">
        <form method="POST">
          <div className="d-flex justify-content-between">
          <div class="form-group row">
            <label htmlFor="inputFrom" className="col-sm-2 col-form-label fs-5">
              From:
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                name='from'
                value={fields.from}
                class="form-control"
                id="inputFrom"
                required="true"
                onChange={handleInput}
                placeholder="From dd/mm/yy"
              />
            </div>
          </div>
          <div class="form-group row">
            <label htmlFor="inputFrom" className="col-sm-2 col-form-label fs-5">
              To:
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                name='to'
                value={fields.to}
                class="form-control"
                id="inputFrom"
                required="true"
                onChange={handleInput}
                placeholder="To dd/mm/yy"
              />
            </div>
          </div>
          <div class="form-group row">
            <label htmlFor="inputFrom" className="col-sm-2 col-form-label fs-6">
              Status:
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                name='status'
                value={fields.status}
                class="form-control"
                id="inputFrom"
                onChange={handleInput}
                placeholder="present/absent/leave"
              />
            </div>
            </div>
            <div>
              <button type='submit' className="btn btn-primary" onClick={searchClick}>Search</button>
            </div>
          </div>
        </form>
      </div>
      <div>
        <table className="table table-bordered table-dark table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Status</th>
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
                    <td>{result._id.name}</td>
                    <td>{result._id.date}</td>
                    <td> {result._id.status}</td>
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

export default AttendenceReport;
