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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Navbar from "../components/Navbar";

const styles = {
  box: {
    padding: " 20px 20px 50px",
    height: "100vh",
    width: "100%",
  },
};

function Calculator() {
  const [formData, setFormData] = useState("");

  return (
    <>
      <Box sx={styles.box}>
        <div>Calculadora</div>
      </Box>
      <Navbar></Navbar>
    </>
  );
}

export default Calculator;
