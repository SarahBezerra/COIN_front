import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const style = {
    box: {
      position: "fixed",
      bottom: "0px",
      left: "0",
      right: "0",
      backgroundColor: "#121530",
      height: "50px",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    },
    button: {
      height: "50px",
      width: "50px",
      backgroundColor: "#fff",
      border: "0",
      borderRadius: "50px",
      color: "#1E234E",
      fontSize: "26px",
    },
    icon: {
      fontSize: "25px",
      color: "#fff",
    },
  };
  return (
    <div style={style.box}>
      <ion-icon name="calculator-outline" style={style.icon}></ion-icon>
      <ion-icon name="chatbubbles-outline" style={style.icon}></ion-icon>
      <button
        style={style.button}
        onClick={() => {
          navigate("/register/spend-money");
        }}
      >
        +
      </button>
      <ion-icon
        name="pie-chart-outline"
        style={style.icon}
        onClick={() => {
          navigate("/home");
        }}
      ></ion-icon>
      <ion-icon
        name="clipboard-outline"
        style={style.icon}
        onClick={() => {
          navigate("/planning");
        }}
      ></ion-icon>
    </div>
  );
}
