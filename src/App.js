import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./pages/SignUp";
import Signin from "./pages/SignIn";
import Todo from "./pages/Todo";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/signup" render={() => <Signup />} />
        <Route exact path="/signin" render={() => <Signin />} />
        <Route exact path="/todo" render={() => <Todo />} />
        <Route path="*" render={() => <NotFound />} />
      </Switch>
    </Router>
  );
};

export default App;
