import { React, useState } from "react";
import {
  Button,
  Box,
  Typography,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material/";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import api from "../services/api.tsx";

const styles = {
  title: { padding: "80px 0 40px 0", color: "#110F16" },
  link: { fontSize: "16px" },
  input: { width: "100%", marginBottom: "10px" },
  button: {
    width: "70%",
    borderRadius: "50px",
    backgroundColor: "#1D204B",
    fontSize: "15px",
    margin: "30px 0 40px 0",
  },
};

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    passwordConfirmation: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  function handleIconClick() {
    setShowPassword(!showPassword);
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData?.email ||
      !formData?.username ||
      !formData?.password ||
      !formData?.passwordConfirmation
    ) {
      alert("Erro: Todos os campos são obrigatórios!");
      return;
    }

    const { email, username, password, passwordConfirmation } = formData;

    if (password !== passwordConfirmation) {
      alert("Erro: As senhas devem ser iguais!");
      return;
    }

    try {
      await api.signUp({ email, username, password });
      alert("Cadastro efetuado com sucesso!");
      navigate("/");
    } catch (error) {
      if (error.response) {
        alert(`Erro: ${error.response.data}`);
        return;
      }
      alert("Erro, tente novamente em alguns segundos!");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box sx={styles.container}>
          <Typography sx={styles.title} variant="h4" component="h1">
            CADASTRO
          </Typography>

          <TextField
            name="email"
            sx={styles.input}
            label="Email"
            type="email"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.email}
          />
          <TextField
            name="username"
            sx={styles.input}
            label="Username"
            type="username"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.username}
          />
          <FormControl variant="outlined" sx={styles.input}>
            <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              name="password"
              onChange={handleInputChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleIconClick}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Senha"
            />
          </FormControl>
          <FormControl variant="outlined" sx={styles.input}>
            <InputLabel htmlFor="outlined-adornment-password">
              Confirme a senha
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={formData.passwordConfirmation}
              name="passwordConfirmation"
              onChange={handleInputChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleIconClick}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirme a senha"
            />
          </FormControl>
          <Box sx={styles.actionsContainer}>
            <Button variant="contained" type="submit" sx={styles.button}>
              Cadastrar
            </Button>
            <Link to="/">
              <Typography sx={styles.link}>
                Já possuo cadastro! Fazer Login
              </Typography>
            </Link>
          </Box>
        </Box>
      </form>
    </>
  );
}

export default SignUp;
