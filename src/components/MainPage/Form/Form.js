import React from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import {
  Button,
  TextField,
  Select,
  Container,
  MenuItem,
} from "@material-ui/core";

import "./Form.scss";

const Form = (props) => {
  const { setReceptions, setBackendError, doctors } = props;
  const {
    handleSubmit,
    control,
    reset,
    formState,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:8080/receptions", data)
      .then((res) => {
        if (res.data.success) {
          reset();
          setBackendError("");
          setReceptions(res.data.data);
        }
      })
      .catch((e) => {
        console.log("errr", e, setBackendError(e.response.data.message));
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="main-form">
      <Container>
        <div className="main-form-fields">
          <label>Имя:</label>
          <Controller
            defaultValue=""
            name="patient"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <TextField type="text" {...field} variant="outlined" />
            )}
          />
        </div>
        <div className="main-form-fields">
          <label>Врач:</label>
          <Controller
            defaultValue=""
            name="doctor"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Select
                
                type="text"
                {...field}
                variant="outlined"
                defaultValue={"doctor-0"}
              >
                {doctors.map((doctor, index) => (
                  <MenuItem key={`doctor-${index}`} value={doctor}>
                    {doctor}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </div>
        <div className="main-form-fields">
          <label>Дата:</label>
          <Controller
            defaultValue=""
            name="data"
            rules={{
              required: true,
            }}
            control={control}
            render={({ field }) => (
              <TextField type="date" {...field} variant="outlined" />
            )}
          />
        </div>
        <div className="main-form-fields">
          <label>Жалобы:</label>
          <Controller
            defaultValue=""
            name="complaints"
            rules={{
              required: true,
            }}
            control={control}
            render={({ field }) => (
              <TextField type="text" {...field} variant="outlined" />
            )}
          />
        </div>
        <Button type="submit" disabled={!formState.isValid}>
          Добавить
        </Button>
      </Container>
    </form>
  );
};

export default Form;
