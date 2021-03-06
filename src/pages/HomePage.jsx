import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material/";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import api from "../services/api";
import MenuIcon from "../components/MenuIcon";
import DescriptionOfPayments from "../components/DescriptionOfPayments";
import Navbar from "../components/Navbar";

const styles = {
  box: { backgroundColor: "#fff", height: "100%", paddingBottom: "55px" },
  title: { padding: "50px 0 10px 0", color: "#110F16", textAlign: "center" },
  payments: { padding: "20px", color: "#110F16" },
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
  transactions: { fontSize: "14px", fontWeight: "300", color: "#2b2b2b" },
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
  const [descriptionOfPaymentsDisplay, setDescriptionOfPaymentsDisplay] =
    useState("none");
  const [descriptionOfPayments, setDescriptionOfPayments] = useState([]);

  useEffect(() => {
    async function loadPage() {
      if (!token) return;

      const { data: paymentsData } = await api.getPayments(token);
      setCategories(paymentsData);
    }
    loadPage();
  }, [token]);

  return (
    <>
      <Box sx={styles.box}>
        <MenuIcon></MenuIcon>
        <Typography sx={styles.title} variant="h5" component="h1">
          Gasto Mensal
        </Typography>

        {categories.length === 0 ? (
          <Box sx={{ ...styles.payments, textAlign: "center" }}>
            <div>Sem categorias criadas</div>
            <ion-icon
              name="sad-outline"
              style={{ fontSize: "25px", marginTop: "10px" }}
            ></ion-icon>
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
                      {category.Payment.length} transa????es
                    </div>
                  </Box>
                  {category.Payment.length === 0 ? (
                    <></>
                  ) : (
                    <ion-icon
                      onClick={() => {
                        setDescriptionOfPaymentsDisplay("block");
                        setDescriptionOfPayments(category.Payment);
                      }}
                      name="ellipsis-horizontal"
                      style={styles.ellipsisIcon}
                    ></ion-icon>
                  )}
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
      <Navbar />
      <DescriptionOfPayments
        display={descriptionOfPaymentsDisplay}
        data={descriptionOfPayments}
      />
    </>
  );
}

export default Home;
