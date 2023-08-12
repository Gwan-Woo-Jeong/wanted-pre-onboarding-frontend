import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Todo from "./pages/Todo";
import NotFound from "./pages/NotFound";
import { ModalProvider } from "./contexts/ModalContext";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleSignupSuccess = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const handleSigninSuccess = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const isLoggedIn = () => token !== null;

  return (
    <ModalProvider>
      <Router>
        <Switch>
          <Route
            exact
            path="/signup"
            render={() =>
              isLoggedIn() ? (
                <Redirect to="/todo" />
              ) : (
                <SignUp onSignupSuccess={handleSignupSuccess} />
              )
            }
          />
          <Route
            exact
            path="/signin"
            render={() =>
              isLoggedIn() ? (
                <Redirect to="/todo" />
              ) : (
                <SignIn onSigninSuccess={handleSigninSuccess} token={token} />
              )
            }
          />
          <Route
            exact
            path="/todo"
            render={() =>
              !isLoggedIn() ? (
                <Redirect to="/signin" />
              ) : (
                <Todo token={token} setToken={setToken} />
              )
            }
          />
          <Route path="*" render={() => <NotFound />} />
        </Switch>
      </Router>
    </ModalProvider>
  );
};

export default App;
