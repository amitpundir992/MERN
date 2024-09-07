import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export const AdminUsers = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [users, setUsers] = useState([]);

  const getAllUsersData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/admin/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(`users ${data.data}`);
      setUsers(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  //delete the user on delet button
   const deleteUser = async (id)=>{
    try {
      const response = await fetch(`http://localhost:8000/api/v1/admin/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(`users after delete ${data.data}`);
      if(response.ok){
        getAllUsersData();
      }
    } catch (error) {
      console.log(error);
    }   
   }

  useEffect(() => {
    getAllUsersData();
  }, []);
  return (
    <>
      <div>Admin Users Data</div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((curUser, index) => {
              return (
                <tr key={index}>
                  <td>{curUser.username}</td>
                  <td>{curUser.email}</td>
                  <td>{curUser.phone}</td>
                  <td><Link to={`/admin/users/${curUser._id}/edit`}>Edit</Link></td>
                  <td><button onClick={()=> deleteUser(curUser._id)}>Delete</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
