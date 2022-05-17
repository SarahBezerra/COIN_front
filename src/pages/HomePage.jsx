import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material/";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import api from "../services/api";
import MenuIcon from "../components/MenuIcon";

const styles = {
  box: { backgroundColor: "#110F16", height: "100vh" },
  title: { padding: "60px 0 40px 0", color: "#fff", textAlign: "center" },
  payments: { padding: "30px 20px", color: "#fff" },
  payment: {
    display: "flex",
    justfyContents: "space-between",
    AlignItems: "center",
    alignItems: "center",
    flexDirection: "row",
    borderBottom: "solid 1px #554e6e",
    padding: "10px 0",
  },
  category: { fontSize: "16px", marginTop: "1px" },
  transactions: { fontSize: "14px", fontWeight: "300", color: "#d8d8d8" },
  categoryItem: {
    fontSize: "22px",
    color: "#110F16",
    padding: "8px",
    borderRadius: "50px",
    marginRight: "12px",
  },
  ellipsisIcon: { marginLeft: "auto" },
};

function Home() {
  const { token } = useAuth();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadPage() {
      if (!token) return;

      const { data } = await api.getPayments(token);
      setCategories(data);
    }
    loadPage();
  }, [token]);

  return (
    <>
      <Box sx={styles.box}>
        <MenuIcon></MenuIcon>
        <Typography sx={styles.title} variant="h5" component="h1">
          Balanço Mensal
        </Typography>

        {categories.length === 0 ? (
          <Box sx={styles.payments}>
            <div>Sem categorias criadas</div>
          </Box>
        ) : (
          <Box sx={styles.payments}>
            {categories.map((category) => {
              return (
                <Box sx={styles.payment} key={category.id}>
                  <ion-icon
                    name={category.icon}
                    style={{
                      ...styles.categoryItem,
                      backgroundColor: `#${category.color}`,
                    }}
                  ></ion-icon>
                  <Box>
                    <div style={styles.category}>{category.name}</div>
                    <div style={styles.transactions}>
                      {category.Payment.length} transações
                    </div>
                  </Box>
                  <ion-icon
                    name="ellipsis-horizontal"
                    style={styles.ellipsisIcon}
                  ></ion-icon>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
    </>
  );
}

export default Home;
