import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Header from "./components/Header/Header";
import Register from "./components/Register/Register";
import MainPage from "./components/MainPage/MainPage";
import LogIn from "./components/LogIn/LogIn";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import "./App.scss";

const App = () => {
  const isAuth = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  return (
    <div className="app-container">
      <Header />
      <Switch>
        <ProtectedRoute path="/main" component={MainPage} />
        <Route path="/login" component={LogIn} />
        <Route path="/register" component={Register} />
        <Route
          path="/"
          render={(props) =>
            isAuth() ? (
              <Redirect to={{ pathname: "/main" }} />
            ) : (
              <Redirect to={{ pathname: "/login" }} />
            )
          }
        />
      </Switch>
    </div>
  );
};

export default App;
