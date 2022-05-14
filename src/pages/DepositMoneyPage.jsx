import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import useAuth from "../hooks/useAuth";
import api from "../services/api";

const styles = {
  title: { padding: "20px 0 20px 0", color: "#110F16" },
  input: { width: "100%", marginBottom: "10px" },
  button: {
    width: "80%",
    borderRadius: "50px",
    backgroundColor: "#1D204B",
    fontSize: "15px",
    marginTop: "30px",
  },
  container: {
    backgroundColor: "#fff",
    padding: "30px 20px",
    boxShadow: "1px 4px 7px 0px #a7a7a79e",
    width: "100%",
    borderRadius: "0 0 20px 20px",
    borderTop: "solid 1px #1D204B",
  },
  tabs: { display: "flex", width: "100%" },
  tab: {
    width: "50%",
    borderRadius: "20px 20px 0 0",
    height: "40px",
    padding: "10px",
    fontSize: "15px",
    backgroundColor: "#dfdfdf",
    color: "#f7f7f7",
  },
  selectTab: {
    width: "50%",
    borderRadius: "20px 20px 0 0",
    height: "40px",
    padding: "10px",
    fontSize: "15px",
    backgroundColor: "#1D204B",
    color: "#fff",
  },
};

function DepositMoney() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    date: "",
  });

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.price || !formData.date) {
      alert("Valor e Data são campos obrigatórios!");
      return;
    }

    try {
      if (!token) return;
      await api.createDeposit(formData, token);
      alert(`Depósito de ${formData.price} salvo com sucesso`);
      navigate("/home");
    } catch (error) {
      if (error.response) {
        alert("Erro: " + error.response.data.error);
        return;
      }
      alert("Erro, tente novamente em alguns segundos!");
    }
  }

  return (
    <Form onSubmit={handleSubmit} style={styles.form}>
      <Typography sx={styles.title} variant="h4" component="h1">
        Cadastrar
      </Typography>
      <Box sx={styles.tabs}>
        <Box sx={styles.selectTab}>ENTRADA</Box>
        <Box sx={styles.tab} onClick={() => navigate("/register/spend-money")}>
          SAÍDA
        </Box>
      </Box>
      <Box sx={styles.container}>
        <TextField
          name="title"
          sx={styles.input}
          label="Título"
          type="title"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.title}
        />
        <TextField
          name="description"
          sx={styles.input}
          label="Descrição"
          type="description"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.description}
        />
        <TextField
          name="price"
          sx={styles.input}
          label="Valor"
          type="number"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.price}
        />
        <TextField
          name="date"
          sx={styles.input}
          type="date"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.date}
        />
        <Button variant="contained" type="submit" sx={styles.button}>
          CADASTRAR
        </Button>
      </Box>
    </Form>
  );
}

export default DepositMoney;
