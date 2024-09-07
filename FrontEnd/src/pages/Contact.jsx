import { useEffect, useState } from "react";

export const Contact = () => {
//To get the currently logged in user data
const [token, setToken] = useState(localStorage.getItem("token"));
const [user, setUser]= useState();


 const userAuthentication = async()=>{
  try {
    const response = await fetch("http://localhost:8000/api/v1/users/user",{
      method:"GET",
      headers:{
        Authorization: `Bearer ${token}`,
      }
    });
    if(response.ok){
      const data = await response.json();
      console.log("user data",data);
      setUser(data.data);
      
    }
  } catch (error) {
    console.log("Error fetching user data");
    
  }
 }

   useEffect(()=>{
    userAuthentication();
   },[])

  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });

  const [userData, setUserData] = useState(true)

  if(userData && user){
    setContact({
      username: user.username,
      email: user.email,
      message: "",
    })
    setUserData(false);
  }

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log(contact);
    
    try {
      const response = await fetch("http://localhost:8000/api/v1/users/contact",{
        method: 'POST',
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(contact)
      })
      if(response.ok){
        alert("message send successfully");
        setContact({
          "username":"",
          "email":"",
          "message":""
        })
        const data = await response.json();
        console.log(data);
        
      }
    } catch (error) {
      console.log("contact",error);
      
    }
  };

  return (
    <>
      <div>
        <h1>Contact page</h1>
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
            value={contact.username}
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
            value={contact.email}
            onChange={handleInput}
          />
          <br />
          <br />

          <label htmlFor="message">message</label>
          <br />
          <textarea
            name="message"
            required
            autoComplete="off"
            cols="30"
            rows="10"
            value={contact.message}
            onChange={handleInput}
          ></textarea>
          <br />
          <br />

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};
