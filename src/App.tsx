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
import Planning from "./pages/PlanningPage";
import PlanningByCategory from "./pages/PlanningByCategoryPage";
import MonthlyPlanning from "./pages/MonthlyPlanningPage";
import EditMonthlyPlanning from "./pages/EditMonthlyPlanningPage";
import CreateMonthlyPlanning from "./pages/CreateMonthlyPlanningPage";
import EditCategories from "./pages/EditCategoriesPage";
import Calculator from "./pages/calculatorPage";

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
              <Route path="/planning" element={<Planning />} />
              <Route path="/planning/category" element={<PlanningByCategory />} />
              <Route path="/planning/month/:year/:month" element={<MonthlyPlanning />} />
              <Route path="/planning/month/edit/:year/:month" element={<EditMonthlyPlanning />} />
              <Route path="/planning/month/create/:year/:month" element={<CreateMonthlyPlanning />} />
              <Route path="/categories/create" element={<EditCategories />} />
              <Route path="/calculator" element={<Calculator />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
