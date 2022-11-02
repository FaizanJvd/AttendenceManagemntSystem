import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = () => {
  const [picture, SetPicture] = useState(null);
  const [checkExtension, setCheckExtension] = useState(true);
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    //    ... is seperator opreator used to access all variable of user object, [] is used to change value dinamicaly
    setUser({ ...user, [name]: value });
  };
  const postData = async (e) => {
    e.preventDefault();
    if (checkExtension) {
      const { name, email, password } = user;
      const res = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          picture,
        }),
      });
      const data = await res.json();
      if (res.status === 422) {
        toast.error(data.message);
      }
      if (res.status === 200) {
        toast.success(data.message);
      }
    } else {
      toast.error("Upload File With Valid Extention");
    }
  };
  const upload = async (e) => {
    e.preventDefault();
    var fileTypes = ["jpg", "jpeg", "png"];
    var extension = e.target.files[0].name.split(".").pop().toLowerCase();
    var isSuccess = fileTypes.indexOf(extension);
    if (isSuccess !== -1) {
      setCheckExtension(true);
    } else {
      toast("Allowed Extenions are PNG, JPGE, JPG");
      setCheckExtension(false);
    }
    setFile(e.target.files[0]);
    console.log(
      "file",
      e.target.files[0].name.split(".").pop().toLowerCase(),
      "find ",
      isSuccess
    );
  };
  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file && checkExtension) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          SetPicture(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
  });
  return (
    <>
      <div>
        <div className="Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Register</h3>

              <div className="row d-flex flex-roe">
                <div className="col-md-6  ">
                  <div className="form-group mt-3">
                    <label className="form-label" htmlFor="email">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control mt-1"
                      placeholder="Enter email"
                      value={user.email}
                      required="true"
                      onChange={handleInput}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mt-3">
                    <label>Upload Image</label>
                    <input
                      type="file"
                      className="form-control mt-2"
                      onChange={(e) => upload(e)}
                      required="true"
                    />
                    <label style={{ fontSize: 2 }}>
                      {checkExtension
                        ? `${"Allowed png,jpeg,jpg"}`
                        : `${"Extension Not Allowed"}`}
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group mt-3">
                <label className="form-label" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control mt-1"
                  placeholder="Enter Name"
                  value={user.name}
                  required="true"
                  onChange={handleInput}
                />
              </div>
              <div className="form-group mt-3">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  value={user.password}
                  required="true"
                  onChange={handleInput}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={postData}
                >
                  Register
                </button>
              </div>
              <p className="forgot-password text-right mt-2">
                Already have Account <Link to="/studentLogin">Login</Link>
              </p>
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

export default Register;
