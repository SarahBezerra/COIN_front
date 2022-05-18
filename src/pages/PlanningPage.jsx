import { Box, Typography, Button } from "@mui/material/";

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
  return (
    <Box style={styles.box}>
      <Typography sx={styles.title} variant="h5" component="h1">
        Planejamento
      </Typography>
      <Button variant="contained" style={styles.buttom}>
        Planejamento por Categoria
      </Button>
      <Button variant="contained" style={styles.buttom}>
        Planejamento Mensal
      </Button>
    </Box>
  );
}

export default Planning;
