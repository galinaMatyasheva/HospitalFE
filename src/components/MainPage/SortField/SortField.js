import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  IconButton,
  Container,
  Select,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddBoxIcon from "@material-ui/icons/AddBox";

import "./SortField.scss";

const SortField = (props) => {
  const { receptions, setReceptions, addAll } = props;
  const [sortField, setSortField] = useState();
  const [sortOrder, setSortOrder] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [initialReceptions, setInitionalReceptions] = useState();
  const [isVisibleOrder, setIsVisibleOrder] = useState(false);
  const [isVisibleFilter, setIsVisibleFilter] = useState(false);
  const orders = ["По возрастанию", "По убыванию"];
  const sortFields = ["Имя", "Врач", "Дата", "Жалобы", "None"];

  const sortMapFields = {
    Имя: "patient",
    Врач: "doctor",
    Дата: "data",
    Жалобы: "complaints",
  };

  const sortMapOrders = {
    "По возрастанию": 0,
    "По убыванию": 1,
  };

  const onChangeSortField = (e) => {
    if (e.target.value === "None") {
        setIsVisibleOrder(false);
    } else {
      setIsVisibleOrder(true);
    }
    setSortField(e.target.value);
    if (sortOrder) {
      sortReceptions(receptions, e.target.value, sortOrder);
    }
  };

  const onChangeSortOrder = (e) => {
    setSortOrder(e.target.value);
    if (sortField) {
      sortReceptions(receptions, sortField, e.target.value);
    }
  };

  //yyyy-mm-dd
  const parseDate = (strVal) => {
    const arr = strVal.split("-");
    return new Date(arr[0], arr[1] - 1, arr[2]);
  };

  const sortReceptions = (receptionsParam, sortFieldParam, sortOrderParam) => {
    if (sortFieldParam === "None") {
      setReceptions([...initialReceptions]);
      addAll()
    }

    const sortOrderLocal = sortMapOrders[sortOrderParam] ? 1 : -1;
    const sortFieldLocal = sortMapFields[sortFieldParam];

    if (sortFieldLocal === "data") {
      receptionsParam.sort((a, b) => {
        const dateA = parseDate(a[sortFieldLocal]);
        const dateB = parseDate(b[sortFieldLocal]);
        if (dateA < dateB) {
          return sortOrderLocal;
        } else if (dateA > dateB) {
          return -1 * sortOrderLocal;
        } else {
          return 0;
        }
      });
    } else {
      receptionsParam.sort((a, b) => {
        if (a[sortFieldLocal] < b[sortFieldLocal]) {
          return sortOrderLocal;
        } else if (a[sortFieldLocal] > b[sortFieldLocal]) {
          return -1 * sortOrderLocal;
        } else {
          return 0;
        }
      });
    }
    setReceptions([...receptionsParam]);
  };

  const onChangeStartDate = (e) => {
    setStartDate(e.target.value);
  };

  const onChangeEndDate = (e) => {
    setEndDate(e.target.value);
  };

  const onFilterClick = () => {
    const filtered = initialReceptions.filter((value) => {
      const valueDate = parseDate(value.data);
      return (!startDate || valueDate >= parseDate(startDate)) && (!endDate || valueDate <= parseDate(endDate));
    });
    if (sortOrder && sortField) {
      sortReceptions(filtered, sortField, sortOrder);
    }
    setReceptions([...filtered]);
  };

  const onOpenFilterClick = () => {
    setIsVisibleFilter(true);
  };

  const onRemoveFilterClick = () => {
    setIsVisibleFilter(false);
    setReceptions(initialReceptions);
    setStartDate("");
    setEndDate("");
  };

  if (!initialReceptions && receptions && receptions.length) {
    setInitionalReceptions(receptions);
  }
  
  return (
    <div className="sort-main-container">
      <div className="sort">
        <Container className="sort-container">
          <div className="field-sort">
            <label>Сортировать по:</label>
            <Select
              type="text"
              variant="outlined"
              defaultValue=""
              onChange={onChangeSortField}
            >
              {sortFields.map((sortfield, index) => (
                <MenuItem key={`sortfield-${index}`} value={sortfield}>
                  {sortfield}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div
            style={{ display: isVisibleOrder ? "flex" : "none" }}
            className="field-order"
          >
            <label>Направление:</label>
            <Select
              type="text"
              variant="outlined"
              defaultValue=""
              onChange={onChangeSortOrder}
            >
              {orders.map((order, index) => (
                <MenuItem key={`order-${index}`} value={order}>
                  {order}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="field-filter">
            <p>Добавить фильтр по дате:</p>
            <IconButton onClick={onOpenFilterClick}>
              <AddBoxIcon />
            </IconButton>
          </div>
        </Container>
      </div>
      <div>
        <Container
          style={{ display: isVisibleFilter ? "flex" : "none" }}
          className="filter-data"
        >
          <div className="filter-data-data">
            <label>С:</label>
            <TextField
              type="date"
              variant="outlined"
              onChange={onChangeStartDate}
              value={startDate}
            />
          </div>
          <div className="filter-data-data">
            <label>По:</label>
            <TextField
              type="date"
              variant="outlined"
              onChange={onChangeEndDate}
              value={endDate}
            />
          </div>
          <Button onClick={onFilterClick} className="filter-button">
            Фильтровать
          </Button>
          <IconButton onClick={onRemoveFilterClick}>
            <DeleteIcon />
          </IconButton>
        </Container>
      </div>
    </div>
  );
};

export default SortField;
