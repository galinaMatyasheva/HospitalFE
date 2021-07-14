import React from "react";
import {
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

import "./DeleteDialog.scss";

const DeleteDialog = ({
  handleCloseDeleteDialog,
  openDeleteDialog,
  deleteReceptionText,
}) => {
  return (
    <Dialog
      className="delete-dialog-container"
      open={openDeleteDialog}
      onClose={handleCloseDeleteDialog}
      maxWidth="xl"
    >
      <DialogTitle>Удалить прием</DialogTitle>
      <DialogContent className="dialog-content">
        <DialogContentText id="alert-dialog-description">
          Вы действительно хотите удалить прием?
        </DialogContentText>
      </DialogContent>
      <DialogActions className="dialog-actions">
        <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
        <Button onClick={deleteReceptionText}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
