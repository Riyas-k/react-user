import React, { useLayoutEffect, useState } from "react";
import Headers from "../Header";
import Axios from "axios";
import axios from "../../axios";

function Profile() {
  const [data, setData] = useState({});
  const [image, setImage] = useState([]);

  useLayoutEffect(() => {
    async function fetchData() {
      const storedData = localStorage.getItem("userDetails");

      if (storedData) {
        setData(JSON.parse(storedData));
      }
    }

    fetchData();
  }, []);

  useLayoutEffect(() => {
    async function fetchUserData() {
      if (data._id) {
        try {
          console.log(data);
          const response = await axios.get(`/user-data/${data._id}`);
          if (response.data.status) {
            const imageData = response.data.response.photo;
            localStorage.setItem("photo", JSON.stringify(imageData));
            const storedImage = localStorage.getItem("photo");
            if (storedImage) {
              const parsedImage = JSON.parse(storedImage);
              setImage(parsedImage);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    fetchUserData();
  }, [data]);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "cjcj4mix");
    Axios.post(
      "https://api.cloudinary.com/v1_1/dki1memle/image/upload",
      formData
    ).then(async (response) => {
      // console.log(response);
      const userData = localStorage.getItem("userDetails");
      const newData = {
        url: response?.data.secure_url,
        user: userData,
      };
      await axios
        .post(`/add-image/${data._id}`, newData)
        .then(async (response) => {
          if (response.data.status) {
            setImage(response?.data.data.url);
          }
        });
    });
  };
  console.log(image, "newimage");

  return (
    <div>
      <Headers />
      <section
        className="vh-100"
        style={{ backgroundColor: "#ffffff", width: "1200px" }}
      >
        <div className="container py-5">
          <div
            className="row d-flex justify-content-center align-items-center"
            style={{ marginTop: "100px" }}
          >
            <div className="col col-md-9 col-lg-7 col-xl-5">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-4">
                  <div className="d-flex text-black">
                    <div className="flex-shrink-0">
                      {image.length >0 ? (
                        <img
                          src={image}
                          alt="Generic placeholder image"
                          className="img-fluid"
                          style={{ width: "180px", borderRadius: "10px" }}
                        />
                      ) : (
                        <img
                          src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                          alt="Generic placeholder image"
                          className="img-fluid"
                          style={{ width: "180px", borderRadius: "10px" }}
                        />
                      )}
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h5 className="mb-1">User Name</h5>
                      {data && (
                        <p className="mb-2 pb-1" style={{ color: "#2b2a2a" }}>
                          {data.name}
                        </p>
                      )}

                      <div className="d-flex justify-content-start rounded-3 p-2 mb-2">
                        <div>
                          <p className="small text-muted mb-1">Email</p>
                          <p className="mb-0">
                            <span>{data.email}</span>
                          </p>
                        </div>
                      </div>
                      {/* <form action="" method="post" > */}
                      <div className="d-flex pt-1 pb-2">
                        <input
                          type="file"
                          onChange={(e) => {
                            setImage(e.target.files[0]);
                          }}
                        />
                      </div>
                      <button onClick={handleSubmit} type="submit">
                        Add Image
                      </button>
                      {/* </form> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
