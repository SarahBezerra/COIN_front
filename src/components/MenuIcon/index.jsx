import { Box } from "@mui/system";

const style = {
  box: {
    height: "35px",
    backgroundColor: "#fff",
    padding: "0 10px",
    position: "fixed",
    top: "0",
    right: "0",
    left: "0",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  icon: {
    fontSize: "100px",
    color: "#000",
  },
};

export default function MenuIcon() {
  return (
    <Box sx={style.box} component="div">
      <ion-icon name="menu-outline" size="large" sx={style.icon}></ion-icon>
    </Box>
  );
}
