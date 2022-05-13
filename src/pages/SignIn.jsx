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
import useAuth from "../hooks/useAuth";
import api from "../services/api";
import Form from "../components/Form";
import logo from "../assets/coin.png";

const styles = {
  title: { padding: "20px 0 40px 0", color: "#110F16" },
  link: { fontSize: "16px", color: "#222222" },
  input: { width: "100%", marginBottom: "10px" },
  button: {
    width: "70%",
    borderRadius: "50px",
    backgroundColor: "#1D204B",
    fontSize: "15px",
    margin: "30px 0 40px 0",
  },
  logo: { width: "60px" },
};

function SignIn() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (!formData?.email || !formData?.password) {
      alert("Erro: Todos os campos são obrigatórios!");
      return;
    }

    const { email, password } = formData;

    try {
      const {
        data: { token },
      } = await api.signIn({ email, password });
      signIn(token);
      navigate("/home");
    } catch (error) {
      if (error.response) {
        alert(`Erro: ${error.response.data}`);
        return;
      }
      alert("Erro, tente novamente em alguns segundos!");
    }
  }

  return (
    <Form onSubmit={handleSubmit} style={styles.form}>
      <img src={logo} alt="logo Coin" style={styles.logo} />
      <Box>
        <Typography sx={styles.title} variant="h4" component="h1">
          LOGIN
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
        <Box sx={styles.actionsContainer}>
          <Button variant="contained" type="submit" sx={styles.button}>
            Entrar
          </Button>
          <Link to="/sign-up">
            <Typography sx={styles.link}>
              Não possui cadastro? Clique aqui
            </Typography>
          </Link>
        </Box>
      </Box>
    </Form>
  );
}

export default SignIn;
