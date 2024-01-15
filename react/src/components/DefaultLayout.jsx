import React, { useEffect } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { userStateContext } from '../Context/MainState'
import axiosClient from '../axios-client';

const DefaultLayout = () => {

    const {token , user , notification, setUser, setToken} = userStateContext();
    const onLogout = (e) => {
        e.preventDefault()
        
        axiosClient.post('/logout')
            .then(({ data }) => {
                console.log(data);
                setToken(null),
                setUser({})
            })
        .catch(err => console.log(err))

    };
        useEffect(() => {
            axiosClient.get('/user')
                .then(({ data }) => {
                setUser(data)
                })
            .catch(err => console.log(err))
        },[])

    if (!token) {
        return <Navigate to='/login'/>
    }

  return (
      <div id='defaultLayout'>
          <aside>
              <Link to='/users'>Dashboard</Link>
              <Link to='/users'>Users</Link>
          </aside>
          <div className="content">
              {notification && 
                  <div className='notification'>
                      {notification}
               </div>
              }
              <header>
                  <div className="">
                      Header
                  </div>
                  <div className="">
                      {user.name}
                      <a href="#" onClick={onLogout} className='btn-logout'>LogOut</a>
                  </div>
              </header>
              <main>
                  
          <Outlet/> 
              </main>
          </div>
    </div>
  )
}

export default DefaultLayout