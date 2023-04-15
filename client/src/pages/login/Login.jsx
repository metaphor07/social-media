import React, { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../context/apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";
import { NavLink } from "react-router-dom";

const Login = () => {
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log(email, password);
    loginCall({ email, password }, dispatch);
    console.log(user);
  };

  console.log("user is: ", user);
  console.log("is Fedtching", isFetching);

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
              required
              placeholder="Email"
              className="loginInput"
              type="email"
              ref={emailRef}
            />
            <input
              placeholder="Password"
              className="loginInput"
              type="password"
              required
              minLength="3"
              ref={passwordRef}
            />
            <button className="loginButton" type="submit">
              {isFetching ? <CircularProgress color="success" /> : "Log In"}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <NavLink to="/register" className="link linkButton">
              <button className="loginRegisterButton">
                {isFetching ? (
                  <CircularProgress color="success" />
                ) : (
                  "Create New Account"
                )}
              </button>
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
