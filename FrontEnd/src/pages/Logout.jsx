import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setToken("");
    return localStorage.removeItem("token");
  }, []);
  return (
    <>
      <Navigate to="/login" />
    </>
  );
};

export { Logout };
