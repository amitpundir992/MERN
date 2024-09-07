import { NavLink } from "react-router-dom"

export const Error= () =>{
    return(
        <>
        <div>
           <h2> OOP's!!! Something went wrong</h2>
            </div>
        <div>
            <NavLink to="/">Return Home</NavLink><br></br>
            <NavLink to="/contact">Report Problem</NavLink>
        </div>
        </>

    )
}