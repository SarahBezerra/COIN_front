import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
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
      <BrowserRouter>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
