import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../axios-client';
import { userStateContext } from '../Context/MainState';

const UserForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErros] = useState(null);
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        confirm_password: ''
    });
    const { setNotification} = userStateContext();
    const submit = (e) => {
        e.preventDefault();
        if (id) {
            axiosClient.put(`/users/${user.id}`, user)
                .then(() => {
                    //show nofication
                    setNotification(`${user.name} updated successfully.`)
                    navigate('/users')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErros(response.data.errors)
                    }
                });
        } else {
            axiosClient.post('/users', user)
                .then(() => {
                    // :show notification
                    setNotification(`${user.name} created successfully! :)`)
                    navigate('/users')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErros(response.data.errors);
                    }
            })
        }
    }
    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient.get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setUser(data.data);
                })
                .catch(e => {
                    console.log(e)
                    setLoading(false);
                })
        },[])
    }
  return (
      <div  className="card animated fadeInDown">
          {user.id && <h2>Update {user.name}</h2>}
          <br />
          {!user.id && <h2>New User</h2>}

          <div>
              {loading && <div className="text-center">loading...</div>}
          </div>

          {errors && <div className='alert'>
          {Object.keys(errors).map(key => (
            <p key={key}>{errors[key][0]}</p>
          ))}
          </div>}
          
          {!loading
              &&
              <form onSubmit={submit}>
                  <input value={user.name} onChange={ev => setUser({...user,  name: ev.target.value})} type="text"  placeholder='Name'/>
                  <input value={user.email} onChange={ev => setUser({...user,  email: ev.target.value})} type="email"  placeholder='Email'/>
                  <input onChange={ev => setUser({...user,  password: ev.target.value})} type="password"  placeholder='Password'/>
                  <input onChange={ev => setUser({ ...user, confirm_password: ev.target.value })} type="password" placeholder='Confirm Password' />
                  
                  <button className='btn'>Save</button>
              </form>}
    </div>
  )
}

export default UserForm