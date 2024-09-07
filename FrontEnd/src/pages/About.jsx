import { useEffect, useState } from "react";

export const About = () =>{
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
            console.log("user data  from about",data);
            setUser(data.data);
            
          }
        } catch (error) {
          console.log("Error fetching user data");
          
        }
       }
      
         useEffect(()=>{
          userAuthentication();
         },[])
         
    return (
        <>
           <h1>{user ? user.username : "Loading..."}</h1>
        </>
    )
}