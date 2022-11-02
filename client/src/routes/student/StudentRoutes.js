import React from 'react'
import { Outlet } from 'react-router-dom'
import StudentSideBar from '../StudentSideBar'

const StudentRoutes = () => {
  return (
    <>
    <div className='d-flex'>
      <div className='vh-100 position-sticky'>
      <StudentSideBar/>

      </div>
      <div >
        <Outlet/>
      </div>
    </div>
    </>
    
  )
}

export default StudentRoutes
