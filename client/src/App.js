import React from "react";
import { Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Navbar from "./components/navbar/Navbar";
import Register from "./components/auth/register/Register";
import Logout from "./components/auth/logout/Logout";
import Admin from "./components/admin/Admin";
import Login from "./components/auth/login/Login";
import Home from "./components/home/Home";
import Basket from "./components/basket/Basket";

import "./App.css";

function App(props) {
  let routes;
  // props.isAuth ||
  localStorage.getItem("username") !== null
    ? (routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/admin" component={Admin} />
          <Route path="/" exact component={Home} />
          <Redirect to="/" />
        </Switch>
      ))
    : (routes = (
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/basket" component={Basket} />
          <Route path="/" exact component={Home} />
          <Redirect to="/" />
        </Switch>
      ));

  return (
    <div className="App">
      <Navbar />
      {routes}
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
