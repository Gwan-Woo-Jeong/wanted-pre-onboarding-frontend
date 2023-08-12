import React from "react";
import { Redirect } from "react-router-dom";

function NotFound() {
  const isLoggedIn = () => localStorage.getItem("token") !== null;
  return isLoggedIn() ? <Redirect to="/todo" /> : <Redirect to="/signin" />;
}

export default NotFound;
