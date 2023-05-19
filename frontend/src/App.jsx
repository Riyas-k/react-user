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
        <Route path="/login" element={<Login />} errorElement={<Error />}></Route>
        <Route path="/sign-up" element={<SignUp errorElement={<Error />}/>}></Route>
        <Route path="/" element={<MainHome />} errorElement={<Error />}></Route>
        <Route path="/profile" element={<Profile />} errorElement={<Error />}></Route>
        <Route path="/admin/login" element={<AdminLogin />} errorElement={<Error />}></Route>
        <Route path="/admin" element={<AdminHome />} errorElement={<Error />}></Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
