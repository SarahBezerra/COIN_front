import {
  FormControl,
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import useAuth from "../hooks/useAuth";
import api from "../services/api";
import Navbar from "../components/Navbar";

const styles = {
  title: { paddingBottom: "20px", color: "#110F16" },
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

function SpendMoney() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    date: "",
    category: "",
  });

  useEffect(() => {
    async function loadPage() {
      if (!token) return;

      const { data: categoriesData } = await api.getCategories(token);
      setCategories(categoriesData);
    }
    loadPage();
  }, [token]);

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.price || !formData.date || !formData.category) {
      alert("Valor, Data e Categoria são campos obrigatórios!");
      return;
    }

    try {
      if (!token) return;
      await api.createPayment(formData, token);
      alert(`Pagamento de ${formData.price} salvo com sucesso`);
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
    <>
      <Form onSubmit={handleSubmit}>
        <Typography sx={styles.title} variant="h4" component="h1">
          Cadastrar
        </Typography>
        <Box sx={styles.tabs}>
          <Box
            sx={styles.tab}
            onClick={() => navigate("/register/deposit-money")}
          >
            ENTRADA
          </Box>
          <Box sx={styles.selectTab}>SAÍDA</Box>
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
            label="Valor *"
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

          <FormControl required fullWidth>
            <InputLabel id="category">Categoria</InputLabel>
            <Select
              labelId="category"
              id="category"
              value={formData.category}
              label="Categoria"
              name="category"
              onChange={handleInputChange}
            >
              {categories.length === 0 ? (
                <MenuItem value="">
                  <em>Não há categorias criadas</em>
                </MenuItem>
              ) : (
                categories.map((category) => {
                  return (
                    <MenuItem key={category.id} value={category.name}>
                      {category.name}
                    </MenuItem>
                  );
                })
              )}
            </Select>
          </FormControl>
          <Button variant="contained" type="submit" sx={styles.button}>
            CADASTRAR
          </Button>
        </Box>
      </Form>
      <Navbar />
    </>
  );
}

export default SpendMoney;
