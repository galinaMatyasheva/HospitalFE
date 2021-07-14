import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { Button, TextField, Link, Container } from "@material-ui/core";

import bigLogo from "../../assets/bigLogo.png";
import "./LogIn.scss";

const LogIn = () => {
  const [backendError, setBackendError] = useState("");
  let history = useHistory();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post("http://localhost:8080/logInPatient", data)
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("token", JSON.stringify(res.data.token));
          history.push("/main");
        }
      })
      .catch((e) => {
        console.log("errr", e, setBackendError(e.response.data.message));
      });
  };
  return (
    <div className="login-container">
      <Container className="login-body">
        <img src={bigLogo} alt="big-logo"></img>
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <h2>Войти в систему</h2>
          <div className="login-form-content">
            <div className="login-form-fields">
              <label>Login</label>
              <Controller
                name="login"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 6,
                  pattern: /^\w+$/,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    {...field}
                    placeholder="login"
                    type="text"
                  />
                )}
              />
              {errors.login && (
                <p className="error">длина строки не меньше 6 символов</p>
              )}
            </div>
            <div className="login-form-fields">
              <label>Password</label>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 6,
                  pattern: /^[A-Za-z ]+\d{1}/,
                }}
                render={({ field }) => (
                  <TextField
                    type="password"
                    variant="outlined"
                    placeholder="password"
                    {...field}
                  />
                )}
              />
              {errors.password && (
                <p className="error">
                  длина строки не меньше 6 символов, использовать только
                  латинские буквы и обязательно 1 число
                </p>
              )}
            </div>
          </div>

          <div className="login-buttons">
            <p className="error">{backendError}</p>
            <Button variant="outlined" type="submit">
              Войти
            </Button>
            <Link href="/register">Зарегистрироваться</Link>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default LogIn;
