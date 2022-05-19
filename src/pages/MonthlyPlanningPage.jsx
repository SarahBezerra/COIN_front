import { Box, Typography } from "@mui/material/";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import api from "../services/api";
import months from "../utils/months";

const styles = {
  return: {
    color: "#fff",
    fontSize: "25px",
    marginRight: "10px",
    position: "fixed",
    top: "25px",
    left: "20px",
  },
  box: {
    height: "100vh",
    width: "100%",
    backgroundColor: "#121530",
    textAlign: "center",
    padding: "25px 20px",
    flexDirection: "column",
  },
  title: {
    fontWeight: "400",
    marginBottom: "25px",
    color: "#fff",
  },
  months: {
    height: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "25px",
    color: "#fff",
    marginBottom: "20px",
  },
  month: {
    fontWeight: "300",
    margin: "0 15px",
    fontSize: "20px",
  },
  planning: {
    padding: "20px 10px",
    backgroundColor: "#b9b1b1",
    borderRadius: "4px",
  },
  bar: {
    width: "100%",
    height: "5px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    marginBottom: "3px",
  },
  innerBar: {
    height: "5px",
    borderRadius: "10px",
  },
  values: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
};

function MonthlyPlanning() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();

  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [planning, setPlanning] = useState([]);
  const [infos, setInfos] = useState({ barColor: "#fff", message: "ok" });

  useEffect(() => {
    async function loadPage() {
      if (!token) return;

      const { data: planningData } = await api.getMonthlyPlanning(
        token,
        month,
        year
      );

      setPlanning(planningData);
      const percent = (planningData.outlay * 100) / planningData.roof;
      if (percent < 90) {
        setInfos({ ...infos, barColor: "#418f2a", message: "ok" });
      } else if (percent >= 90 && percent < 100) {
        setInfos({ ...infos, barColor: "#f0941b", message: "risk" });
      } else if (percent === 100) {
        setInfos({ ...infos, barColor: "#8a227c", message: "limit" });
      } else setInfos({ ...infos, barColor: "#e44c11", message: "danger" });
    }
    loadPage();
  }, [infos, token, month, year]);

  return (
    <Box style={styles.box}>
      <ion-icon
        style={styles.return}
        name="return-up-back-outline"
        onClick={() => {
          navigate("/planning");
        }}
      ></ion-icon>
      <Typography sx={styles.title} variant="h6" component="h1">
        Planejamento
        <br /> Mensal Geral
      </Typography>

      <div style={styles.months}>
        <ion-icon name="chevron-back-outline"></ion-icon>
        <Typography sx={styles.month} variant="h6" component="h2">
          {months[month - 1]}
        </Typography>
        <ion-icon name="chevron-forward-outline"></ion-icon>
      </div>
      <Box>
        <Box style={styles.planning}>
          <Box style={styles.bar}>
            <Box
              style={{
                ...styles.innerBar,
                backgroundColor: infos.barColor,
                width:
                  infos.message === "danger"
                    ? "100%"
                    : `${(planning.outlay * 100) / planning.roof}%`,
              }}
            ></Box>
          </Box>
          <Box style={styles.values}>
            <div>R$ {planning.outlay / 100}</div>
            <div>R$ {planning.roof / 100}</div>
          </Box>
          <div>
            {infos.message === "ok" &&
              `Restam R$${(planning.roof - planning.outlay) / 100} do total`}
            {infos.message === "risk" &&
              `Restam R$${(planning.roof - planning.outlay) / 100} do total`}
            {infos.message === "limit" &&
              `Limite de R$${planning.roof / 100} atingido`}
            {infos.message === "danger" &&
              `Gasto de R$${(planning.outlay - planning.roof) / 100} a mais`}
          </div>
        </Box>
      </Box>
    </Box>
  );
}

export default MonthlyPlanning;
