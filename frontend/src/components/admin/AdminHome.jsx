import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios";

function AdminHome() {
  const [data, setData] = useState([]);
  const [inputData, setInputData] = useState("");

  useEffect(() => {
    axios.get("/admin").then((response) => {
      setData(response.data.user);
    });
  }, []);

  const deleteUser = async (id) => {
    await axios.put(`/admin/delete-user/${id}`);
    await axios.get("/admin").then((response) => {
      setData(response.data.user);
    });
  };

  const handleInput = (e) => {
    setInputData(e.target.value);
  };

  const searchData = (searchTxt, data) => {
    const regex = new RegExp(`^${searchTxt}`, "i");
    const result = data.filter((doc) => regex.test(doc.name));
    return result;
    // await axios.get('/search',{params:{inputData:inputData}}).then((response)=>{
    //   if(response.data.status){
    //     console.log(response.data.response,'---');
    //     setData(response.data.response)
    //   }
    // })
  };

  //   const changeBlock = async (id) => {
  //   await axios.post(`/admin/change-block/${id}`);
  //   const response = await axios.get("/admin");
  //   console.log(response);
  //   setData(response.data.user);
  // };

  // const changeUnBlock = async (id) => {
  //   await axios.post(`/admin/change-unblock/${id}`);
  //   const response = await axios.get("/admin");
  //   console.log(response);
  //   setData(response.data.user);
  // };
  const handleLogout = () => {
    localStorage.removeItem("admin");

  };
  return (
    <>
      <button
        className="btn btn-success m-5 text-decoration-none"
        onClick={handleLogout}
      >
        <Link to={"/admin/login"}>Logout</Link>
      </button>

      <div className="container" style={{ marginTop: "60px" }}>
        <input type="text" value={inputData} onChange={handleInput} />
        <button
          style={{ marginLeft: "10px" }}
          onClick={() => {
            const searchres = searchData(inputData, data);
            console.log(searchres, "----");
            setData(searchres);
          }}
        >
          Search
        </button>
        <h2>Users List</h2>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((dat, index) => {
                console.log(dat, "=======>");
                return (
                  <tr key={dat._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{dat.name}</td>
                    <td>{dat.email}</td>
                    <td>{dat.phone}</td>
                    {/* {
                   dat.blocked ?
                  <button className="btn btn-success bg-success" onClick={()=>changeBlock(dat._id)}>Unblock</button> :
                  <button className="btn btn-success bg-danger" onClick={()=>changeUnBlock(dat._id)}>Block</button> 
                 
                  } */}
                    <button
                      className="btn btn-success bg-danger"
                      onClick={() => deleteUser(dat._id)}
                    >
                      Delete
                    </button>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminHome;
