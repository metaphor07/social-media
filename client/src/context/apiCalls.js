import axios from "axios";
import { DB_API } from "../Helper";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";

export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(`${DB_API}/auth/login`, userCredentials);
    console.log("from api calls: ", res.data);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE" });
  }
};
