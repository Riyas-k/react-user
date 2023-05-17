import { useEffect } from "react";
import MainHome from "./components/Home/MainHome";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import AdminHome from "./components/admin/AdminHome";
import AdminLogin from "./components/admin/AdminLogin";
import SignUp from "./components/signup/Signup";
import { Routes, Route } from "react-router-dom";
import Error from "../404";

function App() {
  useEffect(() => {
    const userjwt = localStorage.getItem("userDetails");
    const adminjwt = localStorage.getItem("admin");
    console.log(adminjwt);
    if (userjwt) {
      if (
        window.location.pathname === "/login" ||
        window.location.pathname === "/sign-up"
      ) {
        window.location.replace("/");
      }
    } else if (adminjwt) {
      if (window.location.pathname === "/admin/login") {
        window.location.replace("/admin");
      }
    } else { 
      if (window.location.pathname !== "/admin/login") {
        window.location.replace('/admin/login');
      }
    }
  }, []);



  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/" element={<MainHome />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/admin/login" element={<AdminLogin />}></Route>
        <Route path="/admin" element={<AdminHome />}></Route>
        <Route path="*" element={<Error />}/>
      </Routes>
    </>
  );
}

export default App;
