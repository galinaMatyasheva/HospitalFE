import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "@material-ui/core";

import Form from "./Form/Form";
import TablePage from "./TablePage/TablePage";
import SortField from "./SortField/SortField";
import "./MainPage.scss";

const MainPage = () => {
  const [receptions, setReceptions] = useState([]);
  const [text, setText] = useState("");
  const [textEdit, setTextEdit] = useState("");
  const [backendError, setBackendError] = useState("");

  const doctors = [
    "Иванов Иван Иванович",
    "Малышева Елена Владимировна",
    "Быков Андрей Евгеньевич",
    "Петров Петр Петрович",
    "Сидоров Петр Иванович",
  ];

  const tableHeader = ["Имя", "Врач", "Дата", "Жалобы", ""];

  const addAll = () => {
    axios.get("http://localhost:8080/receptions").then((res) => {
      setReceptions(res.data.data);
    });
  };

  useEffect(() => {
    addAll();
  }, []);

  return (
    <main className="main-container">
      <Form
        doctors={doctors}
        text={text}
        setText={setText}
        setTextEdit={setTextEdit}
        textEdit={textEdit}
        setReceptions={setReceptions}
        setBackendError={setBackendError}
        backendError={backendError}
      />
      <SortField
        tableHeader={tableHeader}
        receptions={receptions}
        setReceptions={setReceptions}
        addAll={addAll}
      />
      <Container className="main-body">
        <TablePage
          tableHeader={tableHeader}
          receptions={receptions}
          setReceptions={setReceptions}
          doctors={doctors}
          backendError={backendError}
          setBackendError={setBackendError}
        />
      </Container>
    </main>
  );
};

export default MainPage;
