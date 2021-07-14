import React, { useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import DeleteDialog from "../../DeleteDialog/DeleteDialog";
import EditDialog from "../../EditDialog/EditDialog";

import "./TablePage.scss";

const TablePage = (props) => {
  const {
    receptions,
    setReceptions,
    doctors,
    setBackendError,
    tableHeader,
  } = props;

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(0);
  const [editIndex, setEditIndex] = useState(0);

  const handleClickOpenDeleteDialog = (index) => {
    setDeleteIndex(index);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleClickOpenEditDialog = (index) => {
    setEditIndex(index);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const convertDate = (strVal) => {
    if (!strVal) {
      return "";
    }
    const arr = strVal.split("-");
    return arr.reverse().join(".");
  };

  const deleteReceptionText = () => {
    axios
      .delete(`http://localhost:8080/receptions/${receptions[deleteIndex]._id}`)
      .then((res) => {
        setReceptions(res.data);
        handleCloseDeleteDialog();
      });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="customized table" className="table-receptions">
          <TableHead>
            <TableRow>
              {tableHeader.map((value, index) => (
                <TableCell key={`tableHeader-${index}`} align="center">
                  {value}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {receptions.map((value, index) => (
              <TableRow key={`reception-${index}`} className="table-row">
                <TableCell
                  component="th"
                  scope="row"
                  className="table-cell first"
                  align="center"
                >
                  {value.patient}
                </TableCell>
                <TableCell className="table-cell second" align="center">
                  {value.doctor}
                </TableCell>
                <TableCell className="table-cell third" align="center">
                  {convertDate(value.data)}
                </TableCell>
                <TableCell className="table-cell fourth" align="center">
                  {value.complaints}
                </TableCell>
                <TableCell className="table-cell fifth" align="center">
                  <IconButton
                    onClick={() => {
                      handleClickOpenDeleteDialog(index);
                    }}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                  <IconButton onClick={() => handleClickOpenEditDialog(index)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteDialog
        openDeleteDialog={openDeleteDialog}
        handleCloseDeleteDialog={handleCloseDeleteDialog}
        deleteReceptionText={deleteReceptionText}
      />
      <EditDialog
        openEditDialog={openEditDialog}
        handleCloseEditDialog={handleCloseEditDialog}
        doctors={doctors}
        setBackendError={setBackendError}
        setReceptions={setReceptions}
        editIndex={editIndex}
        receptions={receptions}
      />
    </>
  );
};

export default TablePage;
