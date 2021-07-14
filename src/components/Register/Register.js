import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { Button, TextField, Link, Container } from "@material-ui/core";

import bigLogo from "../../assets/bigLogo.png";
import "./Register.scss";

const Register = () => {
  const [backendError, setBackendError] = useState("");
  let history = useHistory();
  const {
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    axios
      .post("http://localhost:8080/patients", data)
      .then((res) => {
        if (res.data.success) {
          axios
            .post("http://localhost:8080/logInPatient", data)
            .then((res) => {
              if (res.data.success) {
                localStorage.setItem("token", res.data.token);
                history.push("/main");
              }
            })
            .catch((e) => {
              console.log("errr", e, setBackendError(e.response.data.message));
            });
        }
      })
      .catch((e) =>
        console.log("errr", e, setBackendError(e.response.data.message))
      );
  };

  return (
    <div className="register-container">
      <Container className="register-body">
        <img src={bigLogo} alt="big-logo"></img>
        <form onSubmit={handleSubmit(onSubmit)} className="register-form">
          <h2>Регистрация</h2>
          <div className="register-form-content">
            <div className="register-form-fields">
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

            <div className="register-form-fields">
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
            <div className="register-form-fields">
              <label>Repeate password</label>
              <Controller
                name="repeatPassword"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  validate: (v) => {
                    return getValues("password") === v;
                  },
                }}
                render={({ field }) => (
                  <TextField
                    type="password"
                    variant="outlined"
                    {...field}
                    placeholder="password"
                  />
                )}
              />
              {errors.repeatPassword && (
                <p className="error">пароли должны быть одинаковы</p>
              )}
            </div>
          </div>
          <div className="register-buttons">
            <p className="error">{backendError}</p>
            <Button variant="outlined" type="submit">
              Зарегистрироваться
            </Button>
            <Link href="/login">Авторизоваться</Link>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default Register;
