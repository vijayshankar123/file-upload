import React, { useEffect } from "react";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import { Provider } from "react-redux";
import store from "./store";
import Alert from "./components/Alert";
import { loadUser } from "./actions/authAction";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Alert />
        </div>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/" component={Signup} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
