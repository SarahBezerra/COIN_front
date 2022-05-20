import { Edit, ExitToApp, Person } from "@mui/icons-material";
import { Box } from "@mui/system";
import { useState } from "react";

const style = {
  top: {
    height: "45px",
    backgroundColor: "#fff",
    padding: "0 10px",
    position: "fixed",
    top: "0",
    right: "0",
    left: "0",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    zIndex: "2",
  },
  icon: {
    fontSize: "100px",
    color: "#000",
  },
  sidebar: {
    height: "100vh",
    width: "100%",
    backgroundColor: "#292929be",
    position: "fixed",
    top: "0",
    right: "0",
    zIndex: "3",
  },
  box: {
    height: "100vh",
    width: "85%",
    backgroundColor: "#c9c9c9",
    padding: "0 10px",
    position: "fixed",
    top: "0",
    right: "0",
    padding: "45px 20px",
  },
  icon: {
    marginRight: "10px",
    fontSize: "20px",
  },
  option: {
    height: "50px",
    display: "flex",
    alignItems: "center",
  },
  exit: {
    color: "#dd2121",
  },
};

export default function MenuIcon() {
  const [hidden, setHidden] = useState("none");

  return hidden === "none" ? (
    <Box sx={style.top} component="div">
      <ion-icon
        name="menu-outline"
        size="large"
        sx={style.icon}
        onClick={() => {
          setHidden("block");
        }}
      ></ion-icon>
    </Box>
  ) : (
    <Box sx={style.sidebar} component="div">
      <Box sx={style.box} component="div">
        <Box sx={{ ...style.top, left: "15%", backgroundColor: "#c9c9c9" }}>
          <ion-icon
            name="menu-outline"
            size="large"
            sx={style.icon}
            onClick={() => {
              setHidden("none");
            }}
          ></ion-icon>
        </Box>
        <div style={style.option}>
          <Person style={style.icon} />
          <p>Editar Perfil</p>
        </div>
        <div style={style.option}>
          <Edit style={style.icon} />
          <p>Editar Categorias</p>
        </div>
        <div style={style.option}>
          <ExitToApp style={style.icon} />
          <p style={style.exit}>Sair</p>
        </div>
      </Box>
    </Box>
  );
}
