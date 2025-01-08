import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import '../css/Login.css'
import axios from 'axios'

const Login = ({setRoleProp}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setLocalRole] = useState('admin')
  const navigate = useNavigate()

  axios.defaults.withCredentials = true;

  const handleSubmit = () =>{
    axios.post('http://localhost:3001/auth/login', {username, password, role})
    // .then(res => console.log(res))
    .then(res => {
      if(res.data.login && res.data.role === 'admin'){
        setRoleProp('admin')
        alert("Logged in successfully as Admin")
        navigate('/dashboard')
      }
      else if(res.data.login && res.data.role === 'student') {
        setRoleProp('student')
        alert("Logged in successfully as Student")
        navigate('/books')
      }
      else {
        alert("Ivalid Credentials")
        navigate('/')
      }
      console.log(res)
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2> <br />
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" placeholder='Enter Username' 
          onChange={(e) => setUsername(e.target.value)}/>
        </div>

        <div className="form-group">
          <label htmlFor="Password">Password:</label>
          <input type="password" placeholder='Enter Password'
          onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select name="role" id="role"
          onChange={(e) => setLocalRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="student">Student</option>
          </select>
        </div>

        <button className='btn-login' onClick={handleSubmit}>Login</button>
      </div>
    </div>
  )
}

export default Login
