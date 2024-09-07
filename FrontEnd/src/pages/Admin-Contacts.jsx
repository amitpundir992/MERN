import { useEffect, useState } from "react"

export const AdminContacts = ()=>{

    const [token, settoken] = useState(localStorage.getItem("token"))
    const [contact, setContact] = useState([])

    const getAllContacts = async ()=>{
        try {
            const response = await fetch("http://localhost:8000/api/v1/admin/contacts",{
                method:'GET',
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            const contact = await response.json();
            console.log(contact.data);
            setContact(contact.data);
            
        } catch (error) {
            console.log("Error while fetching contact",error);
            
        }
    }

 //Delete the Contact
 const deleteContactById = async(id)=>{
    try {
       const response = await fetch(`http://localhost:8000/api/v1/admin/contacts/delete/${id}`,{
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
       }) 
       const data = await response.json();
      console.log(`contact after delete ${data.data}`);
      if(response.ok){
        getAllContacts();
        alert("Deleted Successfully")
      }
    } catch (error) {
       console.log("contact",error);
        
    }
 }

    useEffect(()=>{
      getAllContacts()
    },[])
    return (
        <>
         <div>
            <h1>Admin Contact Data</h1>
         </div>
         <div>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                { contact.map((contacts,index)=>{
                    return(
                        <tr key={index}>
                            <td>{contacts.username}</td>
                            <td>{contacts.email}</td>
                            <td>{contacts.message}</td>
                            <td><button onClick={()=> deleteContactById(contacts._id)}>Delete</button></td>
                        </tr>
                    )
                })}
                    
                </tbody>
            </table>
         </div>
        </>
    )
}