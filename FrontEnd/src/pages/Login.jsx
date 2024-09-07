import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    // console.log(e);

    let name = e.target.name;
    let value = e.target.value;

    setUserLogin({
      ...userLogin,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userLogin);

    try {
      const response = await fetch("http://localhost:8000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLogin),
      });
      if (response.ok) {
        alert("Login Successfulll !!!");

        const res_data = await response.json();
        console.log("response from server", res_data);
        localStorage.setItem("token", res_data.data.token);

        setUserLogin({
          email: "",
          password: "",
        });
        navigate("/");
      } else {
        alert("Invalid Credentials !");
      }
      console.log(response);
    } catch (err) {
      console.log("login", err);
    }
  };

  return (
    <>
      <div>
        <h1>Login User</h1>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="text"
            name="email"
            required
            autoComplete="off"
            onChange={handleInput}
            value={userLogin.email}
          />
          <br />
          <br />

          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="password"
            name="password"
            required
            autoComplete="off"
            onChange={handleInput}
            value={userLogin.password}
          />
          <br />
          <br />

          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};
