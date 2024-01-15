import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client';
import { userStateContext } from '../Context/MainState';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState(null);
  const { setUser, setToken } = userStateContext();
  const submit = (e) => {
  e.preventDefault()

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    axiosClient.post('/login', payload)
      .then(({ data }) => {
        setToken(data.token);
        setUser(data.user);
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
        console.log(response.data.errors, response);
        setErrors(response.data.errors);
        } else {
          setErrors({
            email:[response.data.message]
          })
      }
      })
  }
  return (
    <div className='login-signup-form animated fadeInDown'>
      <div className="form">
        <h3 className='title'>Login Form</h3>
        {errors && <div className='alert'>
          {Object.keys(errors).map(key => (
            <p key={key}>{errors[key][0]}</p>
          ))}
          </div>}
        <form onSubmit={submit}>
          <input ref={emailRef} type="email" placeholder='email' />
          <input ref={passwordRef} type="password" placeholder='password' />
          <button className='btn btn-block'>Login</button>

          <p className='message'>
            Not Registered? <Link to='/signup'>Create an Account</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login