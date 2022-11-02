import React,{useEffect,useState} from "react";
import "../../styles/ProfilePageCss.css";
import std from "../../images/student.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Profile = () => {
  const [results, setResults] = useState(null);
  const [picture, SetPicture] = useState(null);
  const [checkExtension, setCheckExtension] = useState(true);
  const [file, setFile] = useState(null);


  useEffect(() => {
    getData();
  },[]);


  useEffect(()=>{
  },[results])



  const getData = async (e) => {
    const res = await fetch("http://localhost:4000/profile", {
      method: "GET",
      headers: {
        Accept:"applicatio/json",
        "Content-Type": "application/json",
      },
      credentials:'include'
    });
    const data = await res.json();
    if (res.status === 422) {
      window.alert(data.message);
    }
    if (res.status === 200) {
      setResults(data);
    }
  };

  const updatePicture = async()=>{
        if(checkExtension){
          const res = await fetch("http://localhost:4000/update/picture", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              picture
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
        }
        else{
          toast.error("Please select Valid Image")
        }
  }

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
      console.log("check Pass ",file);
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        console.log(" b pic results ",result,"  can ",isCancel);
        if (result && !isCancel) {
          console.log("f pic results ",result);
          SetPicture(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
  });


  return (
    <>
    {results!=null?
      <div className="MarkAttendence-container mt-5">
      <div class="card">
        <img src={results.picture==null?std:(picture==null?results.picture:picture)} alt="John" style={{ width: "100%" }} />
        <h1>{results.name}</h1>
        <p class="title">{results.email}</p>
        <p>Grades: {results.grade==null?"Nill":results.grade}</p>
        <p>
          <label>update profile Picture
          </label>
          <div className="d-flex flex-row p-4">

          <input type="file" onChange={upload}/>
          <button onClick={updatePicture}>update</button>
          </div>
          <label style={{ fontSize: 2 }}>
                      {checkExtension
                        ? `${"Allowed png,jpeg,jpg"}`
                        : `${"Extension Not Allowed"}`}
            </label>
        </p>
      </div>
    </div>:<h1></h1>
    }
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

export default Profile;
