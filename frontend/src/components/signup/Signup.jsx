import './Signup.css';
import { useState } from 'react';
import axios from  '../../axios';
import { useNavigate,Link } from 'react-router-dom';


const SignUp = ()=>{
  const [data,setData] = useState({})
  const [err,setErr] = useState('')
  const navigate = useNavigate()
  const handleChange = (e)=>{
    const {name,value} = e.target;
    setData((prevData)=>({
      ...prevData,
      [name]:value
    }))
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      await axios.post('/', data).then((response)=>{
        console.log(response);
        if(response.data.status){
         navigate('/login')
        }else if(!response.data.status){
           setErr(response.data.err)
           navigate('/sign-up')
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
    return (
        <div className="container">
        <div>
    <div className="signupParentDiv">
        <h5 style={{alignContent:'center'}}>SignUp</h5>
     {   err &&<h5 style={{color:'red'}}>{err}</h5> }
      <form>
        <label htmlFor="fname">Username</label>
        <br />
        <input
          className="input"
          type="text"
          id="fname"
          name="name" value={data.name || ''} onChange={handleChange}
          placeholder="Enter your name"  autoComplete="off"
        />
        <br />
        <label htmlFor="fname">Email</label>
        <br />
        <input
          className="input"
          type="email"
          id="fname"
          name="email" autoComplete="off"
          placeholder="Enter your email"value={data.email || ''} onChange={handleChange}
        />
        <br />
        <label htmlFor="lname">Phone</label>
        <br />
        <input
          className="input"
          type="number"
          id="lname"
          name="phone" autoComplete="off"
          placeholder="Enter your phone number" value={data.phone || ''} onChange={handleChange}
        />
        <br />
        <label htmlFor="lname">Password</label>
        <br />
        <input
          className="input"
          type="password"
          id="lname"
          name="password" autoComplete="off"
          placeholder="Enter your Password" value={data.password || ''} onChange={handleChange}
        />
        <br />
        <br />
        <button onClick={handleSubmit}>Signup</button>
      </form>
      <Link to={'/login'}>Login</Link>
    </div>
  </div>
       </div>
    )
}

export default SignUp