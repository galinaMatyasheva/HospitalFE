import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Container } from "@material-ui/core";

import logo from "../../assets/logo.png";
import "./Header.scss";

const Header = () => {
  let location = useLocation();
  let history = useHistory();
  const [title, setTitle] = useState("");

  useEffect(() => {
    switch (location.pathname) {
      case "/main":
        setTitle("Приемы");
        break;
      case "/login":
        setTitle("Войти в систему");
        break;
      case "/register":
        setTitle("Зарегистрироваться в системе");
        break;
    }
  });

  const logOut = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    <header className="header">
      <Container>
        <div className="header-content">
          <img src={logo} alt="logo"></img>
          <h1>{title}</h1>
        </div>
        {location.pathname === "/main" && (
          <Button onClick={() => logOut()}>Выход</Button>
        )}
      </Container>
    </header>
  );
};

export default Header;
