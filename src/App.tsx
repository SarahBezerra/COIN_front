import React from "react";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

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
            </Routes>
          </BrowserRouter>
        </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
