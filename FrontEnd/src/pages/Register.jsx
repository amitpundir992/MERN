import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
 
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password:""
    })

    const handleInput = (e) =>{
      console.log(e);
      let name = e.target.name;
      let value = e.target.value;
       
      setUser({
        ...user,
        [name]: value
      })   
    }

     const handleSubmit = async(e) =>{
        e.preventDefault();
       console.log(user);    

      try {
        const response = await fetch("http://localhost:8000/api/v1/users/register",
          {
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify(user)
         });

         const data = await response.json();         
         console.log("registration data",data);
         

         if(response.ok){
          setUser({
            username:"",
            email:"",
            phone:"",
            password:""
          })
          navigate("/login");
         }
         else{
          alert(data.msg)
         }
         
      } catch (error) {
        console.log("register", error);
        
      }
     }

  return (
    <>
      <h1>Registration Form</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">username</label><br></br>
        <input
          type="text"
          name="username"
          placeholder="username"
          required
          autoComplete="off"
          value={user.username}
          onChange={handleInput}
        /><br/><br/>

        <label htmlFor="email">email</label><br></br>
        <input
          type="text"
          name="email"
          placeholder="email"
          required
          autoComplete="off"
          value={user.email}
          onChange={handleInput}
        /><br/><br/>

        <label htmlFor="phone">phone</label><br></br>
        <input
          type="number"
          name="phone"
          placeholder="phone"
          required
          autoComplete="off"
          value={user.phone}
          onChange={handleInput}
        /><br/><br/>

        <label htmlFor="password">password</label><br></br>
        <input
          type="password"
          name="password"
          placeholder="password"
          required
          autoComplete="off"
          value={user.password}
          onChange={handleInput}
        /><br/><br/>

        <button type="submit">Register Now</button>
      </form>
    </>
  );
};
