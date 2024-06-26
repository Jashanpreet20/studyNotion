import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';
export default function DashBoard() {

    const {loading:authLoading}=useSelector((state) => state.auth);
    const {loading:profileLoading}=useSelector((state) => state.profile);

    if(authLoading || profileLoading){
      return <div className='mt-10'>loading</div>
    }

  return (
    <div className=' flex relative gap-4 min-h-[calc(100vh-3.5rem)] bg-richblack-900'>
        <Sidebar/>
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />  
        </div>
      </div>
    </div>
  )
}
