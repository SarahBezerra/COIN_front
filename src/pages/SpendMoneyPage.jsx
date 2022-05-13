import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import useAuth from "../hooks/useAuth";

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
  },
  tabs: { display: "flex", width: "100%" },
  tab: {
    width: "50%",
    borderRadius: "20px 20px 0 0",
    height: "40px",
    padding: "5px",
    fontSize: "15px",
    backgroundColor: "#c4c4c4",
    color: "#f1f1f1",
  },
  selectTab: {
    width: "50%",
    borderRadius: "20px 20px 0 0",
    height: "40px",
    padding: "5px",
    fontSize: "15px",
    backgroundColor: "#1D204B",
    color: "#fff",
  },
};

function SpendMoney() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    date: "",
    category: "",
  });

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <Form onSubmit={() => {}} style={styles.form}>
      <Typography sx={styles.title} variant="h4" component="h1">
        Cadastrar
      </Typography>
      <Box sx={styles.tabs}>
        <Button sx={styles.tab}>Entrada</Button>
        <Button sx={styles.selectTab}>Saída</Button>
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
          type="price"
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
        <TextField
          name="category"
          sx={styles.input}
          label="Categoria"
          type="category"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.category}
        />
        <Button variant="contained" type="submit" sx={styles.button}>
          CADASTRAR
        </Button>
      </Box>
    </Form>
  );
}

export default SpendMoney;
