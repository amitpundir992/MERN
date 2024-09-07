import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const AdminUpdate = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const navigate= useNavigate();

  const params = useParams();
//To get the user data
  const getUserData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/admin/users/${params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(`user data:`, data);
      setData(data.data);
    } catch (error) {
      console.log("Error while getting user data", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setData({
        ...data,
        [name]:value,
    })
  };

  //To update the data dynamically
const handleSubmit = async (e) =>{
    e.preventDefault();

    try {
    const response = await fetch(`http://localhost:8000/api/v1/admin/users/update/${params.id}`,{
        method:"PATCH",
        headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type":"application/json",
        },
        body: JSON.stringify(data)
    })
    if(response.ok){
    alert("updated successfully😁");
    navigate("/admin/users");
    }
    else{
        alert("not updated!!🤨")
    }
    } catch (error) {
       console.log("unable to update data", error);
        
    }
}

  return (
    <>
      <div>
        <h1>Update User data</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">username</label>
          <br />
          <input
            type="text"
            name="username"
            required
            autoComplete="off"
            value={data.username}
            onChange={handleInput}
          />
          <br />
          <br />

          <label htmlFor="email">email</label>
          <br />
          <input
            type="text"
            name="email"
            required
            autoComplete="off"
            value={data.email}
            onChange={handleInput}
          />
          <br />
          <br />

          <label htmlFor="phone">Mobile no.</label>
          <br />
          <input
            type="text"
            name="phone"
            required
            autoComplete="off"
            value={data.phone}
            onChange={handleInput}
          />
          <br />
          <br />

          <button type="submit">Update</button>
        </form>
      </div>
    </>
  );
};
