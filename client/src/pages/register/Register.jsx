import React, { useRef } from "react";
import axios from "axios";
import "./register.css";
import { DB_API } from "../../Helper";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const cPasswordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== cPasswordRef.current.value) {
      cPasswordRef.current.setCustomValidity("Passwords don't match!");
    } else {
      const userCredentials = {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      try {
        await axios.post(`${DB_API}/auth/register`, userCredentials);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Metasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              placeholder="Username"
              className="loginInput"
              ref={usernameRef}
              required
            />
            <input
              placeholder="Email"
              required
              className="loginInput"
              ref={emailRef}
            />
            <input
              placeholder="Password"
              className="loginInput"
              ref={passwordRef}
              required
              type="password"
            />
            <input
              placeholder="Confirm Password"
              className="loginInput"
              ref={cPasswordRef}
              required
              type="password"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <NavLink to="/login" className="link linkButton">
              <button className="loginRegisterButton">Log into Account</button>
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
