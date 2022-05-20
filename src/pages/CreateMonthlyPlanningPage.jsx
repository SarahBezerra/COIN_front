import { Box, Typography, TextField, Button } from "@mui/material/";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import api from "../services/api";

const styles = {
  return: {
    color: "#fff",
    fontSize: "25px",
    marginRight: "10px",
    position: "fixed",
    top: "25px",
    left: "20px",
  },
  box: {
    height: "100vh",
    width: "100%",
    backgroundColor: "#121530",
    textAlign: "center",
    padding: "25px 20px",
    flexDirection: "column",
  },
  planning: {
    padding: "20px 10px",
    backgroundColor: "#e0d7eb",
    borderRadius: "4px",
    marginTop: "40px",
  },
  title: {
    fontWeight: "400",
    marginBottom: "10px",
    color: "#2b2b2b",
  },
  month: {
    fontSize: "18px",
    fontWeight: "500",
    color: "#0e7205",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    margin: "20px 0",
  },
};

function CreateMonthlyPlanning() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const { year, month } = params;
  const [inputDate, setInputDate] = useState("");

  function handleInputChange(e) {
    setInputDate(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!inputDate) {
      alert("Erro: Digite um valor contendo reais e centavos. Ex: 50.00");
      return;
    }

    try {
      await api.createMonthlyPlanning(token, year, month, inputDate);
      navigate(`/planning/month/${year}/${month}`);
    } catch (error) {
      if (error.response) {
        alert(`Erro: ${error.response.data}`);
        return;
      }
      alert("Erro, tente novamente em alguns segundos!");
    }
  }

  return (
    <Box style={styles.box}>
      <ion-icon
        style={styles.return}
        name="return-up-back-outline"
        onClick={() => {
          navigate(`/planning/month/${year}/${month}`);
        }}
      ></ion-icon>
      <Box style={styles.planning}>
        <Typography sx={styles.title} variant="h6" component="h1">
          Criar limite para:
        </Typography>
        <Typography sx={styles.month} variant="h6" component="h2">
          {month}/{year}
        </Typography>
        <form onSubmit={handleSubmit} style={styles.form}>
          <TextField
            name="limit"
            sx={styles.input}
            label="Limite"
            type="number"
            variant="outlined"
            onChange={handleInputChange}
            value={inputDate}
          />
          <Button variant="contained" type="submit" sx={styles.button}>
            Criar
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default CreateMonthlyPlanning;
