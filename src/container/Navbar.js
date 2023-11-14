import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Navbar = (props) => {
  //var datasend;
  let x = localStorage.getItem("token");
  let history=useNavigate();
  const handleLogOut=()=>{
    localStorage.removeItem("token");
    history('/');
  }
  const [txt,setTxt]=useState("know");
    const coursesPage = () => {
      localStorage.setItem("searchValue",txt);
      let selectElement = document.querySelector('#select1');
      let output = selectElement.options[selectElement.selectedIndex].value;
      localStorage.setItem("searchType",output);
      history("/home");
    }
    const myWork=(event)=>{
      setTxt(event.target.value);
    }
  return (
    <>
      <nav className={`navbar fixed-top navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/#">
            NewsDehko
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/#">
                  Home
                </Link>
              </li>
            </ul>
          </div>
          
          <form className={`form-inline my-2 my-lg-0 ${x===null?"d-none":""}`}>
          <select id="select1" className="myform-control mr-sm-2">
            <option value="by_city">by_city</option>
            <option value="by_name">by_name</option>
            <option value="by_type">by_type</option>
        </select>
       <input onChange={myWork} className="myform-control mr-sm-2" type="text" placeholder="Search News TopicWise" aria-label="Search"/>
      <button style={{margin:"6px 6px"}} className={`btn btn-outline-dark my-2 my-sm-0`} onClick={coursesPage} type="submit">Search</button>
    </form>
    <button className={`btn btn-primary mx-2 ${x===null?"d-none":""}`} onClick={handleLogOut}>LogOut</button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
