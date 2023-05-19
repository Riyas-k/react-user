import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "../../axios";
import { Alert } from "@mui/material";
// import {Formik,Form,Field,ErrorMessage} from 'formik'

function Login() {
  const [formData, setFormData] = useState({});
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/login", formData).then((response) => {
      if (response.data.status) {
        console.log(response.data);
        localStorage.setItem(
          "userDetails",
          JSON.stringify(response.data.user, response.data.token)
        );
        navigate("/");
      } else {
        setErr(response.data.err);
        navigate("/login");
      }
    });
  };
  return (
    <div>
      <div className="loginParentDiv">
      {err && (
        <Alert severity="error">This is an error alert Invalid Credentials— check it out!</Alert>
          )}
        <h5>Login</h5>
        <form>
          <label htmlFor="fname">Email</label>
      
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            autoComplete="off"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            autoComplete="off"
            placeholder="Enter your Password"
            value={formData.password}
            onChange={handleChange}
          />
          <br />
          <br />
          <button onClick={handleSubmit}>Login</button>
        </form>
        <Link to={"/sign-up"} className="btn btn-success mt-2" style={{textDecoration:'none'}}>Signup</Link>
      </div>
    </div>
  );
}

export default Login;
