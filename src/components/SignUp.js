import React, { useEffect, useState } from "react";
import "./Input.css";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nameIsValid = name.trim().length > 0;
  // const emailIsValid = email.trim().includes("@");
  // const passIsValid = password.trim().length > 5;

  console.log(nameIsValid);
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);
  const onSubmitUserDataHandler = (e) => {
    e.preventDefault();

    const sendData = async () => {
      const response = await fetch("http://localhost:2000/signup", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      console.log(result);
      if (result.token) {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", JSON.stringify(result.token));
        navigate("/");
      }
    };
    sendData();
  };
  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={onSubmitUserDataHandler}>
        <input
          type="text"
          placeholder="Enter Your Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          className={nameIsValid ? "" : "invalid"}
        />
        <input
          type="email"
          placeholder="Enter Your Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
