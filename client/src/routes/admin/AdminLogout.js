import React,{useEffect} from 'react'
import {useNavigate } from "react-router-dom";
const AdminLogout = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        navigate('/adminLogin')
    })
  return (
    <div>
      
    </div>
  )
}

export default AdminLogout
