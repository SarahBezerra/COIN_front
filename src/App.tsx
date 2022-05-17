import React from "react";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SpendMoney from "./pages/SpendMoneyPage";
import DepositMoney from "./pages/DepositMoneyPage";
import Home from "./pages/HomePage";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1D204B",
      },
      secondary: {
        main: "#F5C116",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/" element={<SignIn />} />
              <Route path="/register/spend-money" element={<SpendMoney />} />
              <Route path="/register/deposit-money" element={<DepositMoney />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
