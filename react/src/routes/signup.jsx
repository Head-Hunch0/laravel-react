import React, { useRef, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axiosClient from '../axios-client'
import { userStateContext } from '../Context/MainState'

const Signup = () => {
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmationRef = useRef()

  const [errors, setErrors] = useState(null);
  const { setUser, setToken, token } = userStateContext();

  const submit = async (e) => {
    e.preventDefault()
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value
    }

    try {
      const { data } = await axiosClient.post('/signup', payload);
      setToken(data.token);
      setUser(data.user);
    } catch (err) {
      const response = err.response;
      if (response && response.status === 422) {
        console.log(response.data.errors, response);
        setErrors(response.data.errors);
      }
    }
  }

  // Redirect if already authenticated
  if (token) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <div className='login-signup-form animated fadeInDown'>
      <div className="form">
        <h3 className='title'>SignUp Form</h3>
        {errors && <div className='alert'>
          {Object.keys(errors).map(key => (
            <p key={key}>{errors[key][0]}</p>
          ))}
        </div>}
        <form onSubmit={submit}>
          <input ref={nameRef} type="text" placeholder='Full Name' />
          <input ref={emailRef} type="email" placeholder='Email Address' />
          <input ref={passwordRef} type="password" placeholder='Password' />
          <input ref={passwordConfirmationRef} type="password" placeholder='Password Confirmation' />
          <button className='btn btn-block'>Create Account</button>

          <p className='message'>
            Already Have an Account? <Link to='/login'>Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Signup
