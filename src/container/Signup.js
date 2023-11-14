import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
const Signup = () => {
  const [credential,setCredential]=useState({email:"",password:"",name:"",confpassword:"",mobile:""})
    let history=useNavigate();
    const onchange=(e)=>{
        setCredential({...credential,[e.target.name]:e.target.value})
  }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const {name,email,password,mobile}=credential;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
          
            method: "POST",
            headers: {
              "Content-Type": "application/json"
              },
            body: JSON.stringify({name,mobile,email,password})
          });
          const json=await response.json();
          if(json.success){
            //redirect
            localStorage.setItem('token',json.Auth_Token);
            history("/home");
            //showAlert("Account Created Sucessfully","success");
            
          }
          else{
            //showAlert(json.error,"danger")
          }
    }
  return (
    <div className='container mt-3'>
      <h2 className='mb-5'>Sign Up To continue to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <i className="fa-regular fa-envelope" style={{marginLeft:'8px'}}></i>
            <input minLength={5} onChange={onchange} type="email" className="form-control form-control2" value={credential.email} id="email" name="email" aria-describedby="emailHelp" required/>
            <div id="emailHelp" className="form-text d-none">We'll never share your email with anyone else.</div>
        </div>

        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <i className="fa-solid fa-user" style={{marginLeft:'8px'}}></i>
            <input minLength={3}  onChange={onchange} type="text" className="form-control form-control2" value={credential.name} id="name" name="name" aria-describedby="emailHelp" required/>
            <div id="nameHelp" className="form-text d-none">We'll never share your name with anyone else.</div>
        </div>

        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <i className="fa-solid fa-key" style={{marginLeft:'8px'}}></i>
            <input onChange={onchange} type="password" value={credential.password} minLength={8}  className="form-control form-control2" name="password" id="password" required/>
        </div>
        
        <div className="mb-3">

            <label htmlFor="confpassword" className="form-label">Confirm Password</label>
            <i className="fa-solid fa-key" style={{marginLeft:'8px'}}></i>
            <input type="password" onChange={onchange} minLength={8}  className="form-control form-control2" name="confpassword" id="confpassword" required/>
        </div>
        <div className="mb-3">
        <label htmlFor="mobile" className="form-label">Mobile Number</label>
        <i className="fa-solid fa-phone" style={{marginLeft:'8px'}}></i>
            <input type="tel" onChange={onchange} minLength={10}  className="form-control form-control2" name="mobile" id="mobile" required/>
        </div>
        <button disabled={credential.confpassword!==credential.password} type="submit" className="btn btn-primary">Sign Up</button>
        </form>
        <Link className="btn btn-primary mt-2" to='/'>Login</Link>
    </div>
  )
}

export default Signup
