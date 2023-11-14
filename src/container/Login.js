import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
const Login = () => {
    const [credential,setCredential]=useState({email:"",password:""})
    const history=useNavigate();
    const onchange=(e)=>{
        setCredential({...credential,[e.target.name]:e.target.value})
  }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
              },
            body: JSON.stringify({email:credential.email,password:credential.password})
          });
          const json=await response.json();
          if(json.success){
            //redirect
            localStorage.setItem('token',json.Auth_Token);
            
            history("/home");
            
          }
          else{
            alert("Error Try Again");
          }
    }
  return (
    <div className='mt-3'>
      <h2 className='mb-3'>Log in To continue to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <i className="fa-regular fa-envelope" style={{marginLeft:'8px'}}></i>
            <input onChange={onchange} type="email" className="form-control form-control2" value={credential.email} id="email" name="email" aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text d-none">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <i className="fa-solid fa-key" style={{marginLeft:'8px'}}></i>
            <input onChange={onchange} type="password" value={credential.password} className="form-control form-control2" name="password" id="password"/>
        </div>
        
        <button type="submit" className="btn btn-primary">Log In</button>
        
        </form>
        <Link className="btn btn-primary mt-2" to='/signup'>Signup</Link>
    </div>
  )
}

export default Login
