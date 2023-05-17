/* eslint-disable react/prop-types */

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
            <Link to={"/login"} onclick={handleLogout}>Logout</Link> :
            <Link to={"/login"}>LogIn</Link> 
          }
          </span>

          <hr />
        </div>
        <span>
          <Link to={"/profile"}>Profile</Link>
        </span>

        <div className="">
        <span>
        {
            userData ?
            <Link to={"/profile"}>{userData.name}</Link> :null
        
          }
        
        </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
