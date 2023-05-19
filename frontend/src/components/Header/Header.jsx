/* eslint-disable react/prop-types */

import { Button } from "@mui/material";
import axios from "../../axios";

import "./Header.css";
import { Link } from "react-router-dom";
function Header() {
const  userData = JSON.parse(localStorage.getItem('userDetails'))
const handleLogout =()=>{
  localStorage.removeItem('userDetails')
}
  return ( 
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName"></div>

        <div className="productSearch">
          <div className="searchAction"></div>
        </div>

        <div className="loginPage">
          <span>
          {
            userData ?
            <Link to={"/login"} onclick={handleLogout}><Button variant="contained" color="error"> Logout</Button></Link> :
            <Link to={"/login"}><Button variant="contained" color="primary">LogIn</Button> </Link> 
          }
          </span>

          <hr />
        </div>
        <span>
          <Link to={"/profile"}><Button variant="contained" color="primary">Profile</Button></Link>
        </span>

        <div className="">
        <span>
        {
            userData ?
            <Link to={"/profile"}><Button variant="contained" color="primary">{userData.name}</Button></Link> :null
        
          }
        
        </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
