import { Box, Typography, Button } from "@mui/material/";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const styles = {
  box: {
    height: "100vh",
    width: "100%",
    backgroundColor: "#121530",
    textAlign: "center",
    padding: "25px 20px",
    flexDirection: "column",
  },
  title: {
    marginBottom: "25px",
    color: "#fff",
  },
  buttom: {
    height: "60px",
    width: "100%",
    marginBottom: "15px",
    backgroundColor: "#272a5a",
  },
};

function Planning() {
  const navigate = useNavigate();
  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();

  return (
    <Box style={styles.box}>
      <Typography sx={styles.title} variant="h5" component="h1">
        Planejamento
      </Typography>
      <Button
        variant="contained"
        style={styles.buttom}
        onClick={() => {
          navigate("/planning/category");
        }}
      >
        Planejamento por Categoria
      </Button>
      <Button
        variant="contained"
        style={styles.buttom}
        onClick={() => {
          navigate(`/planning/month/${currentYear}/${currentMonth}`);
        }}
      >
        Planejamento Mensal
      </Button>
      <Navbar />
    </Box>
  );
}

export default Planning;
