import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
const StudentLogout = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        logout()
    },[]);
    const logout = async()=>{
        const res = await fetch("http://localhost:4000/logout", {
            method: "GET",
            headers: {
              Accept:"applicatio/json",
              "Content-Type": "application/json",
            },
            credentials:'include'
          });
          if(res.status===200){
            navigate('/studentLogin')
          }
    }
  return (
    <div>
      
    </div>
  )
}

export default StudentLogout
