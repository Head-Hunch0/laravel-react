import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { userStateContext } from '../Context/MainState';

const GuestLayout = () => {
        const { token } = userStateContext();
    if (token) {
        return <Navigate to='/users'/>
    }
  return (
      <div>
          <Outlet/>
    </div>
  )
}

export default GuestLayout