import { Box } from "@mui/system";

const style = {
  display: "flex",
  position: "fixed",
  top: "15px",
  right: "15px",
  fontSize: "100px",
  color: "#000",
};

export default function MenuIcon() {
  return (
    <Box sx={style} component="div">
      <ion-icon name="menu-outline" size="large" sx={style}></ion-icon>
    </Box>
  );
}
