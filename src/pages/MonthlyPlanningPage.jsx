import { Box, Typography, Button } from "@mui/material/";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    padding: "10px 10px 20px",
    backgroundColor: "#e0d7eb",
    borderRadius: "4px",
  },
  bar: {
    width: "100%",
    height: "5px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    margin: "5px 0 3px",
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
  actionIcons: {
    textAlign: "right",
  },
  pencilIcon: {
    marginRight: "6px",
  },
  button: {
    width: "100%",
  },
};

function MonthlyPlanning() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const { year, month } = params;

  const [monthState, setMonthState] = useState(month);
  const [yearState, setYearState] = useState(year);
  const [planning, setPlanning] = useState([]);
  const [infos, setInfos] = useState({ barColor: "#fff", message: "ok" });

  useEffect(() => {
    async function loadPage() {
      if (!token) return;

      const { data: planningData } = await api.getMonthlyPlanning(
        token,
        monthState,
        yearState
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
  }, [infos, token, monthState, yearState]);

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
        <ion-icon
          name="chevron-back-outline"
          onClick={() => {
            let lastMonth = Number(month) - 1;
            let lastYear = year;
            if (lastMonth < 1) {
              lastMonth = 12;
              lastYear--;
            }
            navigate(`/planning/month/${lastYear}/${lastMonth}`);
            document.location.reload(true);
          }}
        ></ion-icon>
        <Typography sx={styles.month} variant="h6" component="h2">
          {months[monthState - 1]}
        </Typography>
        <ion-icon
          name="chevron-forward-outline"
          onClick={() => {
            let nextMonth = Number(month) + 1;
            let nextYear = year;
            if (nextMonth > months.length) {
              nextMonth = 1;
              nextYear++;
            }
            navigate(`/planning/month/${nextYear}/${nextMonth}`);
            document.location.reload(true);
          }}
        ></ion-icon>
      </div>
      <Box>
        {planning.length === 0 ? (
          <Box style={styles.planning}>
            <p>Ops! {<br />}Parece que você ainda não planejou esse mês</p>
            <Button
              variant="contained"
              style={styles.button}
              onClick={() => {
                navigate(`/planning/month/create/${yearState}/${monthState}`);
              }}
            >
              Planejar
            </Button>
          </Box>
        ) : (
          <Box style={styles.planning}>
            <div style={styles.actionIcons}>
              <ion-icon
                style={styles.pencilIcon}
                name="pencil"
                onClick={() => {
                  navigate(`/planning/month/edit/${yearState}/${monthState}`);
                }}
              ></ion-icon>
              <ion-icon
                name="trash-outline"
                onClick={() => {
                  const result = window.confirm(
                    `Realmente deseja excluir o planejamento de ${monthState}/${year}`
                  );
                  if (result) {
                    api.deleteMonthlyPlanning(token, yearState, monthState);
                    document.location.reload(true);
                  }
                }}
              ></ion-icon>
            </div>
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
        )}
      </Box>
    </Box>
  );
}

export default MonthlyPlanning;
