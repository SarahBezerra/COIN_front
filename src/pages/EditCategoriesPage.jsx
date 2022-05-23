import { Box, Typography, Button, TextField } from "@mui/material/";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import api from "../services/api";
import icons from "../utils/icons";
import colors from "../utils/colors";
import { string } from "joi";

const styles = {
  box: {
    height: "100%",
    width: "100%",
    backgroundColor: "#121530",
    textAlign: "center",
    padding: "25px 20px",
    flexDirection: "column",
  },
  top: {
    height: "40px",
    width: "100%",
    position: "fixed",
    top: "0",
    right: "0",
    left: "0",
    backgroundColor: "#121530",
    display: "flex",
    alignItems: "center",
    paddingLeft: "15px",
    zIndex: "2",
  },
  return: {
    color: "#fff",
    fontSize: "25px",
  },
  title: {
    fontWeight: "400",
    margin: "20px  0 10px",
    color: "#fff",
  },
  caption: {
    fontWeight: "300",
    color: "#fff",
    marginBottom: "5px",
  },
  div: {
    padding: "10px",
    backgroundColor: "#e0d7eb",
    marginBottom: "5px",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoryItem: {
    fontSize: "15px",
    color: "#110F16",
    padding: "8px",
    borderRadius: "50px",
    marginRight: "12px",
  },
  actionIcons: {
    textAlign: "right",
  },
  pencilIcon: {
    marginRight: "6px",
  },
  button: {
    width: "100%",
    marginTop: "15px",
  },
};

function EditCategories() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [inputData, setInputData] = useState({
    name: "",
    icon: "airplane-outline",
    color: "ffcdd2",
  });

  function handleInputChange(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    async function loadPage() {
      if (!token) return;

      const { data: paymentsData } = await api.getPayments(token);
      setCategories(paymentsData);
    }
    loadPage();
  }, [token]);

  async function handleSubmit() {
    if (!token) return;

    if (!inputData.name || !inputData.icon || !inputData.color) {
      alert(
        "Para criar uma categoria é preciso escolher um Nome, um Ícone e uma Cor"
      );
    }

    try {
      await api.createCategory(token, inputData);
      navigate("/home");
    } catch (error) {
      if (error) {
        alert(`Erro: ${error.response.data}`);
        return;
      }
      alert("Erro, tente novamente em alguns segundos!");
    }
  }

  return (
    <>
      <Box style={styles.box}>
        <Box style={styles.top}>
          <ion-icon
            style={styles.return}
            name="return-up-back-outline"
            onClick={() => {
              navigate("/home");
            }}
          ></ion-icon>
        </Box>
        <Typography sx={styles.title} variant="h6" component="h1">
          Editar Categorias
        </Typography>

        <Box>
          <Typography sx={styles.caption} variant="h6" component="h2">
            Suas Categorias
          </Typography>

          {categories.length === 0 ? (
            <Box style={{ ...styles.div, justifyContent: "center" }}>
              <div>Sem categorias criadas</div>
            </Box>
          ) : (
            <Box>
              {categories.map((category) => {
                return (
                  <Box style={styles.div} key={category.id}>
                    <Box
                      sx={{ display: "flex", alignItems: "center" }}
                      key={category.id}
                    >
                      <ion-icon
                        name={category.icon}
                        style={{
                          ...styles.categoryItem,
                          backgroundColor: `#${category.color}`,
                        }}
                      ></ion-icon>
                      {category.name}
                    </Box>
                    <div style={styles.actionIcons}>
                      <ion-icon
                        style={styles.pencilIcon}
                        name="pencil"
                      ></ion-icon>
                      <ion-icon
                        name="trash-outline"
                        onClick={async () => {
                          const result = window.confirm(
                            `Realmente deseja excluir essa categoria?`
                          );
                          if (result) {
                            try {
                              await api.deleteCategory(token, category.id);
                              document.location.reload(true);
                            } catch (error) {
                              if (error.response) {
                                alert(`Erro: ${error.response.data}`);
                                return;
                              }
                              alert(
                                "Erro, tente novamente em alguns segundos!"
                              );
                            }
                          }
                        }}
                      ></ion-icon>
                    </div>
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>

        <Box>
          <Typography
            sx={{ ...styles.caption, marginTop: "15px" }}
            variant="h6"
            component="h2"
          >
            Crie Categorias
          </Typography>

          <Box
            style={{
              ...styles.div,
              justifyContent: "center",
              flexDirection: "column",
              padding: "20px 10px",
            }}
          >
            <Typography
              sx={{ ...styles.caption, color: "#000" }}
              variant="h6"
              component="h2"
            >
              Escolha um nome
            </Typography>

            <TextField
              name="name"
              sx={{ width: "100%", marginBottom: "20px" }}
              label="Nome"
              type="text"
              variant="outlined"
              onChange={handleInputChange}
              value={inputData.name}
            />

            <Typography
              sx={{ ...styles.caption, color: "#000" }}
              variant="h6"
              component="h2"
            >
              Escolha um ícone
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                marginBottom: "15px",
              }}
            >
              {icons.map((icon) => {
                return (
                  <Box
                    key={icon.id}
                    sx={{
                      margin: "10px",
                      fontSize: "22px",
                      height: "30px",
                      width: "30px",
                      borderRadius: "4px",
                      boxShadow: "1px 1px 5px 3px #706f6f6e",
                      backgroundColor:
                        inputData.icon === icon.name ? "#7b70e2" : "#e0d7eb",
                    }}
                    onClick={() => {
                      setInputData({ ...inputData, icon: icon.name });
                    }}
                  >
                    <ion-icon name={icon.name}></ion-icon>
                  </Box>
                );
              })}
            </Box>

            <Typography
              sx={{ ...styles.caption, color: "#000" }}
              variant="h6"
              component="h2"
            >
              Escolha uma cor
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                marginBottom: "15px",
              }}
            >
              {colors.map((color) => {
                return (
                  <Box
                    key={color}
                    sx={{
                      margin: "5px",
                      height: "22px",
                      width: "22px",
                      borderRadius: "4px",
                      backgroundColor: `#${color}`,
                      boxShadow: "1px 1px 5px 3px #706f6f6e",
                      border: `solid ${
                        inputData.color === color ? "3px #000" : "0px #000"
                      }`,
                    }}
                    onClick={() => {
                      setInputData({ ...inputData, color });
                    }}
                  />
                );
              })}
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "25px 0",
                padding: "10px",
                width: "100%",
                border: "solid 1px #1a0247",
              }}
            >
              <ion-icon
                name={inputData.icon}
                style={{
                  fontSize: "20px",
                  color: "#110f16",
                  padding: "10px",
                  borderRadius: "50px",
                  backgroundColor: `#${inputData.color}`,
                }}
              ></ion-icon>
              <p style={{ marginLeft: "16px" }}>{inputData.name}</p>
            </Box>

            <Button
              variant="contained"
              sx={styles.button}
              onClick={handleSubmit}
            >
              Criar
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default EditCategories;
