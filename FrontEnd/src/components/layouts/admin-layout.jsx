import { useEffect, useState } from "react";
import { NavLink, Outlet, Navigate } from "react-router-dom"

export const AdminLayout = () =>{
    const [user, setUser]= useState();
    const [token, settoken] = useState(localStorage.getItem("token"))
    const [isLoading, setIsLoading] = useState(true);


 const userAuthentication = async()=>{
  try {
    setIsLoading(true)
    const response = await fetch("http://localhost:8000/api/v1/users/user",{
      method:"GET",
      headers:{
        Authorization: `Bearer ${token}`,
      }
    });
    if(response.ok){
      const data = await response.json();
    //   console.log("user data",data);
      setUser(data.data);
      setIsLoading(false);
    }
    else{
    console.log("Error fetching user data"); 
        setIsLoading(false);
    }
  } catch (error) {
    console.log("Error fetching user data"); 
  }
 }
 useEffect(()=>{
    userAuthentication();
   },[])

 //logic to check if admin is loggin or not if admin login then show page else not
 console.log("Admin layout",user);
 if(isLoading){
    return <h1>Loading....</h1>;
 }
 else{
if(!user.isAdmin){
    return <Navigate to="/" />
}
 }
 

  
    return(
        <>
            <header>
                <div>
                    <nav>
                        <ul>
                            <li><NavLink to="/admin/users">Users</NavLink></li>
                            <li><NavLink to="/admin/contacts">Contacts</NavLink></li>
                            <li><NavLink to="/about">About</NavLink></li>
                            <li><NavLink to="/">Home</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <Outlet />

        </>
    )
}