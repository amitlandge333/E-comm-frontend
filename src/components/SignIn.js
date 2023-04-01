import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Input.css";
const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);
  const onSubmitUserDataHandler = (e) => {
    e.preventDefault();
    console.log(email, password);
    const sendData = async () => {
      const response = await fetch("http://localhost:2000/signin", {
        method: "POST",
        body: JSON.stringify({
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
        navigate("/products");
      } else {
        alert("please fill valid info");
      }
    };
    sendData();
  };
  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={onSubmitUserDataHandler}>
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

export default SignIn;
