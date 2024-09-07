import { NavLink } from "react-router-dom";

export const Navbar = () => {
  // Check if the token is present in local storage
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <>
      <header>
        <div>
          <NavLink to="/">Amit Pundir</NavLink>
        </div>

        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            {/* Conditional rendering based on token presence */}
            {isLoggedIn ? (
              <li>
                <NavLink to="/logout">Logout</NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};
