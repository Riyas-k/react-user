import React, { useState } from "react";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [formData, setFormData] = useState({});
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/admin/login", formData).then((response) => {
      console.log(response, "helooo");
      if (response.data.status) {
        localStorage.setItem("admin", JSON.stringify(response.data.status));
        navigate("/admin");
      } else {
        setErr(response.data.err);
      }
    });
  };
  return (
    <div>
      <div className="loginParentDiv">
        <h5>Admin Login</h5>
        <form>
          {err && <h5 style={{ color: "red" }}>{err}</h5>}
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
      </div>
    </div>
  );
}

export default AdminLogin;
