import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./pages/SignUp";
import Signin from "./pages/SignIn";
import Todo from "./pages/Todo";
import NotFound from "./pages/NotFound";
import { ModalProvider } from "./contexts/ModalContext";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleSignupSuccess = () => setToken(null);

  return (
    <ModalProvider>
      <Router>
        <Switch>
          <Route
            exact
            path="/signup"
            render={() => <Signup onSignupSuccess={handleSignupSuccess} />}
          />
          <Route exact path="/signin" render={() => <Signin />} />
          <Route exact path="/todo" render={() => <Todo />} />
          <Route path="*" render={() => <NotFound />} />
        </Switch>
      </Router>
    </ModalProvider>
  );
};

export default App;
