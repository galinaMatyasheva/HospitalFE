import React from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

import "./EditDialog.scss";

const EditDialog = (props) => {
  const {
    handleCloseEditDialog,
    openEditDialog,
    setBackendError,
    setReceptions,
    doctors,
    editIndex,
    receptions,
  } = props;

  const { handleSubmit, control, reset } = useForm();
  const onSubmit = (data) => {
    data._id = receptions[editIndex]._id;
    axios
      .put("http://localhost:8080/receptions", data)
      .then((res) => {
        reset();
        setBackendError("");
        setReceptions(res.data.data);
        handleCloseEditDialog(true);
      })
      .catch((e) => {
        console.log("errr", e, setBackendError(e.response.data.message));
      });
  };

  return (
    <Dialog
      className="edit-dialog-container"
      open={openEditDialog}
      onClose={handleCloseEditDialog}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="edit-form">
        <DialogTitle>Изменить прием</DialogTitle>
        <DialogContent className="dialog-content">
          <DialogContentText id="alert-dialog-descript">
            <div className="edit-form-fields">
              <label>Имя:</label>
              <Controller
                name="patient"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="text"
                    {...field}
                    variant="outlined"
                    defaultValue={receptions[editIndex].patient}
                  />
                )}
              />
            </div>
            <div className="edit-form-fields">
              <label>Врач:</label>
              <Controller
                name="doctor"
                control={control}
                render={({ field }) => (
                  <Select
                    type="text"
                    {...field}
                    variant="outlined"
                    defaultValue={receptions[editIndex].doctor}
                  >
                    {doctors.map((doctor, index) => (
                      <MenuItem key={`doc-${index}`} value={doctor}>
                        {doctor}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </div>
            <div className="edit-form-fields">
              <label>Дата:</label>
              <Controller
                name="data"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="date"
                    {...field}
                    variant="outlined"
                    defaultValue={receptions[editIndex].data}
                  />
                )}
              />
            </div>
            <div className="edit-form-fields">
              <label>Жалобы:</label>
              <Controller
                name="complaints"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="text"
                    {...field}
                    variant="outlined"
                    multiline
                    rows={2}
                    defaultValue={receptions[editIndex].complaints}
                  />
                )}
              />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions className="dialog-actions-edit">
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button type="submit">Edit</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditDialog;
